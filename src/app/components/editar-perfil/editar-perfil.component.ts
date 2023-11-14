import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  perfilForm!:FormGroup
  submitted=false;
  

  constructor(@Inject(MAT_DIALOG_DATA)public data:User,private authService:AuthService,
  public dialogReF:MatDialogRef<EditarPerfilComponent>,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);
    //console.log(this.data);
    this.perfilForm=this.formBuilder.group({
      id:this.data.id,
      userName:[this.data.userName,[Validators.required,Validators.minLength(4)]],
      pass:['',[Validators.required,Validators.minLength(8)]],
      roleId:[this.data.roleId,[Validators.required]]
    });
  }

  get f(){
    return this.perfilForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.perfilForm?.invalid){
      return;
    }
    this.data=this.perfilForm.value;
    console.log(this.data)
    this.authService.updateUser(this.data).subscribe((res:any)=>{
      Swal.fire({
        title: `Actualizacion de Contraseña`,
        text: `Contraseña Actualizada Correctamente`,
        icon: 'success'
      });
      console.log('Contraseña Actualizada');
      this.dialogReF.close();
      },(err:any)=>{
        console.log('error')
    })
  }
  cerrarDialog(){
    this.dialogReF.close();
  }



}
