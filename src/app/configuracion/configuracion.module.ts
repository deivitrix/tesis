import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms'

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { BaseconfiguracionComponent } from './baseconfiguracion/baseconfiguracion/baseconfiguracion.component';
import { NavbarconfiguracionComponent } from './components/navbarconfiguracion/navbarconfiguracion.component';
import { PerfilconfiguracionComponent } from './components/perfilconfiguracion/perfilconfiguracion.component';
import { ReseteoconfiguracionComponent } from './components/reseteoconfiguracion/reseteoconfiguracion.component';
import { PerfilConfiguracionPaginaComponent } from './paginas/perfil-configuracion-pagina/perfil-configuracion-pagina.component';
import { ReseteoConfiguracionPaginaComponent } from './paginas/reseteo-configuracion-pagina/reseteo-configuracion-pagina.component';
import { LoadingconfiguracionComponent } from './components/loadingconfiguracion/loadingconfiguracion.component';

//material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MensajeconfiguracionComponent } from './components/mensajeconfiguracion/mensajeconfiguracion.component';
import { SpinnerconfiguracionComponent } from './components/spinnerconfiguracion/spinnerconfiguracion.component';                

@NgModule({
  declarations: [
    BaseconfiguracionComponent,
    NavbarconfiguracionComponent,
    PerfilconfiguracionComponent,
    ReseteoconfiguracionComponent,
    PerfilConfiguracionPaginaComponent,
    ReseteoConfiguracionPaginaComponent,
    LoadingconfiguracionComponent,
    MensajeconfiguracionComponent,
    SpinnerconfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule
  ]
})
export class ConfiguracionModule { }
