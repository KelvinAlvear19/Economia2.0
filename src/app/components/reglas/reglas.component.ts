import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarReglasComponent } from 'src/app/editar-reglas/editar-reglas.component';
import {  BancoService, Banco } from 'src/app/services/banco.service';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.scss']
})
export class ReglasComponent implements OnInit {

  bancos: Banco[] = []

  constructor(private bancoService: BancoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bancoService.getAll().subscribe(( response: Banco[] ) => { 
      this.bancos = response
    })
  }

  editCard(card: any) {
    // Lógica para editar la tarjeta (puedes implementar esto según tus necesidades)
      const dialogRef=this.dialog.open(EditarReglasComponent,{
        data: {
          banco: card
        }
       });
    console.log('Editar tarjeta:', card);
  }

}
