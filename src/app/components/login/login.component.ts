import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService, ROLE_KEY, Roles } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.singin(this.user).subscribe((res: User[]) => {
      console.log('usuarios: ', res);
      if (res.length == 0) {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      }
      const user = res[0];
      localStorage.setItem(ROLE_KEY, user.roleId);
      // localStorage.setItem('token',res.token);
      Swal.fire({
        title: `Bienvenido ${this.user.userName}`,
        text: 'Has iniciado sesión correctamente',
        icon: 'success',
      });
      const route = user.roleId == Roles.ADMIN ? 'reglas' : 'tabla';
      this.router.navigate([route])
    });
  }

  openDialogCrearUsuario() {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '280px',
      height: '440px',
    });
  }
}
