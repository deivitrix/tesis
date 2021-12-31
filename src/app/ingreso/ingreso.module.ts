import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ReactiveFormsModule} from '@angular/forms'

import { IngresoRoutingModule } from './ingreso-routing.module';
import { BaseIngresoComponent } from './base-ingreso/base-ingreso.component';
import { HomePaginaComponent } from './paginas/home-pagina/home-pagina.component';
import { NabvarIngresoComponent } from './components/nabvar-ingreso/nabvar-ingreso.component';
import { FormsModule } from '@angular/forms';

//material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { IngresarConveniosPaginaComponent } from './paginas/ingresar-convenios-pagina/ingresar-convenios-pagina.component';
import { PerfilPaginaComponent } from './paginas/perfil-pagina/perfil-pagina.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ReseteoContraPaginaComponent } from './paginas/reseteo-contra-pagina/reseteo-contra-pagina.component';
import { ReseteocontraComponent } from './components/reseteocontra/reseteocontra.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoadingComponent } from './components/loading/loading.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MensajeLoginComponent } from './components/mensaje-login/mensaje-login.component';
import { IngresarconveniosBodyComponent } from './components/ingresarconvenios-body/ingresarconvenios-body.component';
import { IngresarPlantillaConveniosComponent } from './paginas/ingresar-plantilla-convenios/ingresar-plantilla-convenios.component';
import { ConveniosPaginaComponent } from './paginas/convenios-pagina/convenios-pagina.component';

@NgModule({
  declarations: [
    BaseIngresoComponent,
    HomePaginaComponent,
    NabvarIngresoComponent,
    IngresarConveniosPaginaComponent,
    PerfilPaginaComponent,
    PerfilComponent,
    ReseteoContraPaginaComponent,
    ReseteocontraComponent,
    LoadingComponent,
    MensajeLoginComponent,
    IngresarconveniosBodyComponent,
    IngresarPlantillaConveniosComponent,
    ConveniosPaginaComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
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
    FormsModule
  ]
})
export class IngresoModule { }
