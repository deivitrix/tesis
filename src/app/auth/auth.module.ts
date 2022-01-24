import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { BaseAuthComponent } from './base-auth/base-auth.component';
import { InicioModule } from '../inicio/inicio.module';
import { MensajeLoginComponent } from './components/mensaje-login/mensaje-login.component';

//material angular 
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



import { FormularioRecuperaCuentaComponent } from './components/formulario-recupera-cuenta/formulario-recupera-cuenta.component';
import { ReseteoContraComponent } from './components/reseteo-contra/reseteo-contra.component';
import { LoadingloginComponent } from './components/loadinglogin/loadinglogin.component';


@NgModule({
  declarations: [
    LoginComponent,
    BaseAuthComponent,
    MensajeLoginComponent,
    FormularioRecuperaCuentaComponent,
    ReseteoContraComponent,
    LoadingloginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InicioModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports:[
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class AuthModule { }
