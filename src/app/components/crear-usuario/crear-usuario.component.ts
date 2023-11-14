import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private authService:AuthService,private router:Router,public dialogReF:MatDialogRef<CrearUsuarioComponent>) { }

  userForm!:FormGroup
  submitted=false;
  user:User=new User();

  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      userName:['',[Validators.required,Validators.minLength(4)]],
      pass:['',[Validators.required,Validators.minLength(8)]],
      roleId:['user',[Validators.required]]
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
   this.user=this.userForm?.value;
    this.authService.addUser(this.user).subscribe((res:any)=>{
      
        Swal.fire({
          title: `Creacion de Usuario`,
          text: `Usuario ${this.user.userName} ingresado Correctamente`,
          icon: 'success'
        });
        console.log('Usuario Ingresado')
        console.log(res);
        this.dialogReF.close();
      },(err:any)=>{
     
        console.log(err);
    })
  }

  cerrarDialog(){
    this.dialogReF.close();
  }

}
