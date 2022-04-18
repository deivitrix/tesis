import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovilidadestudiantesRoutingModule } from './movilidadestudiantes-routing.module';
import { BasemovilidadestudiantesComponent } from './basemovilidadestudiantes/basemovilidadestudiantes.component';
import { ConsultarsolicitudMovilidadComponent } from './components/consultarsolicitud-movilidad/consultarsolicitud-movilidad.component';
import { DialogborrarfilesmovilidadComponent } from './components/dialogborrarfilesmovilidad/dialogborrarfilesmovilidad.component';
import { FormularioMovilidadComponent } from './components/formulario-movilidad/formulario-movilidad.component';
import { LoadingingresomovilidadComponent } from './components/loadingingresomovilidad/loadingingresomovilidad.component';
import { SpinneringresomovilidadComponent } from './components/spinneringresomovilidad/spinneringresomovilidad.component';
import { ConsultarMovilidadComponent } from './paginas/consultar-movilidad/consultar-movilidad.component';
import { HomePaginaMovilidadComponent } from './paginas/home-pagina-movilidad/home-pagina-movilidad.component';
import { MostrarformularioMovilidadComponent } from './paginas/mostrarformulario-movilidad/mostrarformulario-movilidad.component';

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
import { NavbarmovilidadestudianteComponent } from './components/navbarmovilidadestudiante/navbarmovilidadestudiante.component';

@NgModule({
  declarations: [
    BasemovilidadestudiantesComponent,
    ConsultarsolicitudMovilidadComponent,
    DialogborrarfilesmovilidadComponent,
    FormularioMovilidadComponent,
    LoadingingresomovilidadComponent,
    SpinneringresomovilidadComponent,
    ConsultarMovilidadComponent,
    HomePaginaMovilidadComponent,
    MostrarformularioMovilidadComponent,
    NavbarmovilidadestudianteComponent,

  ],
  imports: [
    CommonModule,
    MovilidadestudiantesRoutingModule,
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
export class MovilidadestudiantesModule { }
