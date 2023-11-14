import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:User,public dialogReF:MatDialogRef<EditarUsuarioComponent>,
  private authService:AuthService,private formBuilder:FormBuilder) { }

  userForm!:FormGroup
  submitted=false;
  user:User={};
  auxUsuario:User=this.data;

  ngOnInit(): void {
    console.log(this.data);
    this.userForm=this.formBuilder.group({
      id:this.data.id,
      userName:[this.data.userName,[Validators.required,Validators.minLength(4)]],
      pass:[this.data.pass,[Validators.required,Validators.minLength(8)]],
      roleId:[this.data.roleId,[Validators.required]]
    });
  }

  get f(){
    return this.userForm.controls;
  }


  onSubmit(){
    this.submitted=true;
    if(this.userForm?.invalid){
      return;
    }
    this.data=this.userForm?.value;
    console.log(this.data);
    this.authService.updateUser(this.data).subscribe((res:any)=>{
      Swal.fire({
        title: `Actualizacion de Usuario`,
        text: `Usuario ${this.auxUsuario.userName} Actualizado Correctamente`,
        icon: 'success'
      });
      console.log('Usuario Actualizado');
      this.dialogReF.close();
      },(err:any)=>{
        console.log('error')
    })
  }

  cerrarDialog(){
    this.dialogReF.close();
  }




}
