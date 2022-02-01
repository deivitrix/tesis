import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { BaseIngresoComponent } from './base-ingreso/base-ingreso.component';
import { HomePaginaComponent } from './paginas/home-pagina/home-pagina.component';
import { NabvarIngresoComponent } from './components/nabvar-ingreso/nabvar-ingreso.component';

import { IngresarConveniosPaginaComponent } from './paginas/ingresar-convenios-pagina/ingresar-convenios-pagina.component';
import { PerfilPaginaComponent } from './paginas/perfil-pagina/perfil-pagina.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ReseteoContraPaginaComponent } from './paginas/reseteo-contra-pagina/reseteo-contra-pagina.component';
import { ReseteocontraComponent } from './components/reseteocontra/reseteocontra.component';

import { LoadingComponent } from './components/loading/loading.component';

import { MensajeLoginComponent } from './components/mensaje-login/mensaje-login.component';
import { IngresarconveniosBodyComponent } from './components/ingresarconvenios-body/ingresarconvenios-body.component';
import { IngresarPlantillaConveniosComponent } from './paginas/ingresar-plantilla-convenios/ingresar-plantilla-convenios.component';
import { ConveniosPaginaComponent } from './paginas/convenios-pagina/convenios-pagina.component';

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
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

//editor de texto
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    FormsModule,
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
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    CKEditorModule
  ]
})
export class IngresoModule { }
