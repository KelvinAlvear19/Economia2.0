import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Banco } from '../services/banco.service';
import { BancoRegla, BancoReglasService } from '../service/banco-reglas.service';

@Component({
  selector: 'app-editar-reglas',
  templateUrl: './editar-reglas.component.html',
  styleUrls: ['./editar-reglas.component.scss']
})
export class EditarReglasComponent implements OnInit {


  reglas: BancoRegla[]

  constructor(private formBuilder:FormBuilder,private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {banco: Banco},
    private router:Router,public dialogReF:MatDialogRef<EditarReglasComponent>, 
    private bancoReglasService: BancoReglasService
    ) { }

  ngOnInit(): void {
    this.bancoReglasService.getPorBanco(this.data.banco.id).subscribe((response: BancoRegla[])=> { 
      console.log(response)
      this.reglas = response
    })
  }

}
