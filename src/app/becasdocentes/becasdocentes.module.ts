import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BecasdocentesRoutingModule } from './becasdocentes-routing.module';
import { BasebecasdocentesComponent } from './basebecasdocentes/basebecasdocentes.component';
import { SpinneringresobecasComponent } from './components/spinneringresobecas/spinneringresobecas.component';
import { HomePaginaBecasComponent } from './paginas/home-pagina-becas/home-pagina-becas.component';
import { FormularioBecasComponent } from './components/formulario-becas/formulario-becas.component';
import { LoadingIngresobecasComponent } from './components/loading-ingresobecas/loading-ingresobecas.component';
import { DialogborrarfilesbecasComponent } from './components/dialogborrarfilesbecas/dialogborrarfilesbecas.component';


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
import{ReactiveFormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { PipesModule } from '../pipes/pipes.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

//editor de texto
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MostrarformularioBecasComponent } from './paginas/mostrarformulario-becas/mostrarformulario-becas.component';
import { ConsultarBecasComponent } from './paginas/consultar-becas/consultar-becas.component';
import { ConsultarsolicitudesBecasComponent } from './components/consultarsolicitudes-becas/consultarsolicitudes-becas.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    BasebecasdocentesComponent,
    SpinneringresobecasComponent,
    HomePaginaBecasComponent,
    FormularioBecasComponent,
    LoadingIngresobecasComponent,
    DialogborrarfilesbecasComponent,
    MostrarformularioBecasComponent,
    ConsultarBecasComponent,
    ConsultarsolicitudesBecasComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    BecasdocentesRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
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
    PipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    CKEditorModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class BecasdocentesModule { }
