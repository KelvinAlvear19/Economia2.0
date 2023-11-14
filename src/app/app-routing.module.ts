import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from './guards/auth.guard';
import { ReglasComponent } from './components/reglas/reglas.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { TablaAmortizacionComponent } from './components/tabla-amortizacion/tabla-amortizacion.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: 'tabla',
    component: TablaAmortizacionComponent,
    canActivate: [RoleGuard],
  },    
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registrar',
    component: CrearUsuarioComponent,
  },
  {
    path: 'principal',
    component: SidenavComponent,
  },
  {
    path: 'reglas',
    component: ReglasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
