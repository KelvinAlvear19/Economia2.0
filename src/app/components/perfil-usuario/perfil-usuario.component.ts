import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private authService:AuthService, public dialog:MatDialog) { }

  userName?:string;
  pass?:string;
  id?:number
  idAux!:number;
  showPassword:boolean=false;
  user!:User;
 


  ngOnInit(): void {
    this.getDatosUsuario();
    this.getUserbyId();
  }

  getDatosUsuario(){
   this.idAux=this.authService.getId();
  }

  getUserbyId(){
    this.authService.getUserbyId(this.idAux).subscribe((res:User)=>{
      if(res){
        //this.id=res.id;
        this.userName=res.userName;
        this.pass=res.pass;
        this.user=res;
        
  }
    })
  }

  openDialogEditarPerfil(){
    const dialogReF=this.dialog.open(EditarPerfilComponent,{
      width:'280px',
      height:'300px',
      data:this.user
    });
    dialogReF.afterClosed().subscribe((res)=>{
      console.log(res);
      this.getUserbyId();

    })
  }

}
