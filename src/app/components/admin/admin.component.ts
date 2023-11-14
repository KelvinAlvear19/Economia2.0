import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

import Swal from 'sweetalert2';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public columnsToDisplay = ['userName', 'roleId', 'eliminar', 'editar'];
  public dataSource: any = new MatTableDataSource();
  public user: User[] = [];
  public usuarioCon = '';
  public usuarioRole = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUserCon();
    this.columnsDisplayAuth();
    this.getUsers();
  }

  getUserCon() {
    this.usuarioCon = this.authService.getTokenData();
    this.usuarioRole = this.authService.getTokenRole();
  }

  getUsers() {
    this.authService.getUsers().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      this.dataSource.data = this.user;
      this.dataSource.paginator = this.paginator;
    });
  }

  columnsDisplayAuth() {
    if (this.usuarioRole != 'admin') {
      this.columnsToDisplay.splice(-2);
    }
  }

  deleteUser(user: User) {
    if (user.userName == this.usuarioCon) {
      Swal.fire({
        title: 'Error',
        text: 'Usuario Actual',
        icon: 'error',
      });
    } else {
      if (this.usuarioRole != 'admin') {
        Swal.fire({
          title: 'Error',
          text: 'Usuario no Autorizado',
          icon: 'error',
        });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'primary',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Estas Seguro?',
            text: `Seguro que desea eliminar al Usuario ${user.userName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (user.id) {
                this.authService.deleteUser(user.id).subscribe((res) => {
                  this.getUsers();
                  console.log(res);
                  swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    `Usuario ${user.userName} eliminado `,
                    'success'
                  );
                });
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'El Usuario no se borro',
                'error'
              );
            }
          });
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogCrearUsuario() {
    if (this.usuarioRole != 'admin') {
      Swal.fire({
        title: 'Error',
        text: 'Usuario no Autorizado',
        icon: 'error',
      });
    } else {
      const dialogRef = this.dialog.open(CrearUsuarioComponent, {
        width: '280px',
        height: '440px',
      });

      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
        this.getUsers();
      });
    }
  }

  openDialogEditarUsuario(user: User) {
    if (this.usuarioRole != 'admin') {
      Swal.fire({
        title: 'Error',
        text: 'Usuario no Autorizado',
        icon: 'error',
      });
    } else {
      const dialogRef = this.dialog.open(EditarUsuarioComponent, {
        width: '280px',
        height: '440px',
        data: user,
      });
      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
        this.getUsers();
      });
    }
  }
}
