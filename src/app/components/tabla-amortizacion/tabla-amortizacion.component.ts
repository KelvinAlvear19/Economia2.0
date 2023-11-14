import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { BancoRegla, BancoReglasService } from 'src/app/service/banco-reglas.service';
import { Banco, BancoService } from 'src/app/services/banco.service';
import autoTable from 'jspdf-autotable';

interface Column {
  columnDef: string;
  header: string;
  cell: (row: any) => any;
}


export interface Amortizacion {
  name: string;
  banco: string | number | null;
  credit: any;
  type: any;
  plazo: any;
  cantidad: number | null;
  seguro: number | null;
}

export const AMORTIZACION: Amortizacion = {
  name: '',
  banco: null,
  credit: null,
  type: null,
  plazo: null,
  cantidad: null,
  seguro: null,
};

export const SISTEMA_COLUMNS: Column[] = [
  { columnDef: 'periodo', header: 'Periodo', cell: (row: any) => row.periodo },
  { columnDef: 'cuota', header: 'Cuota', cell: (row: any) => row.cuota },
  { columnDef: 'interes', header: 'Interes', cell: (row: any) => row.interes },
  { columnDef: 'amortizacion', header: 'Amortizacion', cell: (row: any) => row.amortizacion, },
  { columnDef: 'saldo', header: 'Saldo', cell: (row: any) => row.saldo },
];
@Component({
  selector: 'app-tabla-amortizacion',
  templateUrl: './tabla-amortizacion.component.html',
  styleUrls: ['./tabla-amortizacion.component.scss'],
})
export class TablaAmortizacionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any = new MatTableDataSource([]);
  displayedColumns: any[] = ['periodo', 'cuota', 'interes', 'amortizacion', 'saldo'];

  amortizacion: Amortizacion = { ...AMORTIZACION };
  rol = localStorage.getItem('rol');
  bancoName: string | null = 'Banco';

  bancos: Banco[] = [];
  maxValue: number | string | null = 12;

  tipoCreditosBanco: { id: any; name: any; tasa: any; plazo: any }[] = [];

  sistema: {
    periodo: string;
    cuota: string;
    interes: string;
    amortizacion: string;
    saldo: string;
  }[] = [];
  columns = SISTEMA_COLUMNS;

  constructor(
    private bancoServicio: BancoService,
    private snack: MatSnackBar,
    private tipoCreditosService: BancoReglasService
  ) {}

  setCreditOptions(banco: Banco) {
    this.tipoCreditosBanco = []
    this.tipoCreditosService.getPorBanco(banco.id).subscribe((response: BancoRegla[]) => {
      response.forEach(regla => {
        this.tipoCreditosBanco.push(
          { id: 0, name: regla.nombre, tasa: regla.interes, plazo: regla.maxPlazo, },
        )
      })
    })
    // this.tipoCreditosBanco = [
    //   { id: 0, name: 'Educacion', tasa: banco.educacion, plazo: banco.educacionPlazo, },
    //   { id: 1, name: 'Hipotecario', tasa: banco.hipo, plazo: banco.hipoPlazo },
    //   { id: 2, name: 'Microcredito', tasa: banco.micro, plazo: banco.microPlazo },
    //   { id: 3, name: 'Consumo', tasa: banco.consumo, plazo: banco.consumoPlazo },
    // ];
  }

  ngOnInit(): void {
    this.fetchbancos();
    this.amortizacion.name = localStorage.getItem('name')?.toString() ?? 'Usuario';
  }

  fetchbancos() {
    this.bancoServicio.getAll().subscribe((response: Banco[]) => {
      this.bancos = response;
    });
  }

  handlebancoChange(event: any) {
    this.amortizacion.banco = event;
    const banco = this.bancos.find((b) => b.id == this.amortizacion.banco);
    this.amortizacion.credit = null;
    this.setCreditOptions(banco);
  }

  handleCreditChange(event: any) {
    this.amortizacion.credit = event;
    this.setMaxValue();
  }

  credito: string = 'Educacion';

  setMaxValue() {
    const banco = this.bancos.find((b) => b.id == this.amortizacion.banco);
    console.log('Banco: ', banco);
    this.maxValue = this.tipoCreditosBanco.find(
      (c) => c.id == this.amortizacion.credit
    )?.plazo;
  }

  validate() {
    return !(
      this.amortizacion.name == null ||
      this.amortizacion.cantidad == null ||
      this.amortizacion.type == null ||
      this.amortizacion.banco == null ||
      this.amortizacion.credit == null ||
      this.amortizacion.plazo == null
    );
  }

  handleCal() {
    console.log('Simulacion: ', this.amortizacion);
    if (
      !this.validate() ||
      (this.maxValue != null && this.amortizacion.plazo > this.maxValue)
    ) {
      this.snack.open('Plazo no valido', 'Ok');
      return;
    }

    this.sistema = [];
    console.log('Sistema: ', this.amortizacion);

    var seguro = +(this.amortizacion.seguro ?? 0);
    var cp = +(this.amortizacion.cantidad ?? 0);
    var n = parseInt(this.amortizacion.plazo) ?? 0;
    var porcentajeInteres = this.tipoCreditosBanco.find(
      (c) => c.id == this.amortizacion.credit
    )?.tasa;

    var saldo = cp;
    var i = porcentajeInteres / 100;
    var i_mensual = i / 12;
    var saldoAnterior = cp;
    var cuota, interes, capital, pow, frac;
    console.log('Cp: ', cp);
    console.log('n: ', n);
    console.log('i: ', i);

    for (var periodo = 1; periodo <= this.amortizacion.plazo; periodo++) {
      if (this.amortizacion.type == 'frances') {
        pow = 1 + i_mensual;
        frac = i_mensual / (1 - Math.pow(pow, -n));
        cuota = cp * frac + seguro;
        interes = (saldo * i) / 12;
        capital = cuota - interes;
      } else {
        console.log('CP: ', cp);
        console.log('seguro: ', seguro);
        console.log('n: ', n);
        capital = (cp + seguro) / n;
        interes = (saldo * i) / 12;
        cuota = capital + interes;
      }
      saldo = saldoAnterior - capital;
      console.log(cuota, interes, capital, saldo);
      this.sistema.push({
        periodo: periodo.toString(),
        cuota: cuota.toFixed(2),
        interes: interes.toFixed(2),
        amortizacion: capital.toFixed(2),
        saldo: saldo.toFixed(2),
      });
      saldoAnterior = saldo;
    }

    console.log("TABLA: ", this.sistema)

    this.dataSource = new MatTableDataSource(this.sistema);
  }
  imprimir() {
    let doc = new jsPDF();

    let data: any[] = [];
    const headers = this.columns.map((c: any) => c.header);
    const columns = this.columns.map((c: any) => c.columnDef);

    this.sistema.forEach((row: any) => {
      let arr: any[] = [];
      columns.forEach((column: any) => {
        arr.push(row[column]);
      });
      data.push(arr);
    });
    const bank = this.bancos.find((b) => b.id == this.amortizacion.banco);
    let y = 10;
    let i = 10;
    const porcentaje = this.tipoCreditosBanco.find(
      (c) => c.id == this.amortizacion.credit
    )?.tasa;
    doc.text('Nombre: ' + this.amortizacion.name, 10, y);
    doc.text('Banco: ' + bank.nombre, 10, y + i);
    doc.text('Cantidad: ' + this.amortizacion.cantidad, 10, y + i * 2);
    doc.text('Sistema: ' + this.amortizacion.type.toUpperCase(), 10, y + i * 4);
    doc.text(
      'Credito: ' + this.credito + '(' + porcentaje + '%)',
      10,
      y + i * 5
    );

    autoTable(doc, {
      startY: y + i * 6,
      head: [[...columns]],
      body: [...data],
    });

    doc.save('amortizacion.pdf');
  }

}
