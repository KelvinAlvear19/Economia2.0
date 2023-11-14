import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AdminComponent } from './components/admin/admin.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MatPaginatorModule } from '@angular/material/paginator';

import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ReglasComponent } from './components/reglas/reglas.component';
import { EditarReglasComponent } from './editar-reglas/editar-reglas.component';
import { TablaAmortizacionComponent } from './components/tabla-amortizacion/tabla-amortizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    AdminComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    FloatingButtonComponent,
    PerfilUsuarioComponent,
    EditarPerfilComponent,
    ReglasComponent,
    EditarReglasComponent,
    TablaAmortizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    NgApexchartsModule
    
    
  ],
  providers: [
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
