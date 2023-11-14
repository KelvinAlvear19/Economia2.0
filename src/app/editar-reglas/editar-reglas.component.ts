import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Banco } from '../services/banco.service';
import { BancoRegla, BancoReglasService } from '../service/banco-reglas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-reglas',
  templateUrl: './editar-reglas.component.html',
  styleUrls: ['./editar-reglas.component.scss']
})
export class EditarReglasComponent implements OnInit {
  reglaForm: FormGroup; // Inicializa reglaForm como FormGroup
  reglas: BancoRegla[];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { banco: Banco },
    private router: Router,
    public dialogReF: MatDialogRef<EditarReglasComponent>,
    private bancoReglasService: BancoReglasService
  ) { }

  ngOnInit(): void {
    this.bancoReglasService.getPorBanco(this.data.banco.id).subscribe((response: BancoRegla[]) => { 
      console.log(response);
      this.reglas = response;
  
      // Verifica si hay al menos una regla y asigna sus valores al formulario
      if (this.reglas && this.reglas.length > 0) {
        const primeraRegla = this.reglas[0];
        this.reglaForm = this.formBuilder.group({
          nombre: [primeraRegla.nombre, Validators.required],
          interes: [primeraRegla.interes, Validators.required],
          imagen: [primeraRegla.imagen],
          // Otros campos...
        });
      }
    });
  }

  updateRegla(index: number): void {
    const reglaActualizada = {
      ...this.reglas[index],  // Mantén los valores existentes de la regla
      nombre: this.reglaForm.value.nombre,
      interes: this.reglaForm.value.interes,
      // ... Otros campos según sea necesario
    };
  
    const regla = this.reglas[index];
  
    this.bancoReglasService.actualizarRegla(regla.id, reglaActualizada).subscribe(
      (updatedRegla) => {
        console.log('Regla actualizada:', updatedRegla);
        // Puedes actualizar la lista de reglas en tu componente si es necesario
        // y realizar otras acciones después de la actualización
  
        // Mostrar SweetAlert2
        Swal.fire({
          title: 'Actualización exitosa',
          text: 'La regla se ha actualizado correctamente.',
          icon: 'success',
        });
      },
      (error) => {
        console.error('Error al actualizar la regla:', error);
  
        // Mostrar SweetAlert2 en caso de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar la regla.',
          icon: 'error',
        });
      }
    );
  }
  
  
  
}
