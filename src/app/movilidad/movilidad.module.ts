import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovilidadRoutingModule } from './movilidad-routing.module';
import { BasemovilidadComponent } from './basemovilidad/basemovilidad.component';
import { MostrarMovilidadComponent } from './paginas/mostrar-movilidad/mostrar-movilidad.component';
import { NabvarmovilidadComponent } from './components/nabvarmovilidad/nabvarmovilidad.component';
import { SpinnermovilidadComponent } from './components/spinnermovilidad/spinnermovilidad.component';
import { TablamostrarmovilidadComponent } from './components/tablamostrarmovilidad/tablamostrarmovilidad.component';
import { LoadingmovilidadComponent } from './components/loadingmovilidad/loadingmovilidad.component';

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
import { PipesModule } from '../pipes/pipes.module';
import { DialoginformacionComponent } from './components/dialoginformacion/dialoginformacion.component';
import { SpinnerPDFComponent } from './components/spinner-pdf/spinner-pdf.component';
import { TablamovilidadAprobadoComponent } from './components/tablamovilidad-aprobado/tablamovilidad-aprobado.component';
import { AprobarMovilidadComponent } from './paginas/aprobar-movilidad/aprobar-movilidad.component';
import { SubirDocumentoFinalMovilidadComponent } from './paginas/subir-documento-final-movilidad/subir-documento-final-movilidad.component';
import { TablasubirdocumentomovilidadComponent } from './components/tablasubirdocumentomovilidad/tablasubirdocumentomovilidad.component';
import { DialogsubirdocumentomovilidadComponent } from './components/dialogsubirdocumentomovilidad/dialogsubirdocumentomovilidad.component';
import { TablaeditarsolicitudesComponent } from './components/tablaeditarsolicitudes/tablaeditarsolicitudes.component';
import { EditarsolicitudesMovilidadComponent } from './paginas/editarsolicitudes-movilidad/editarsolicitudes-movilidad.component';
import { EditarsolicitudesMovilidadComponenteComponent } from './components/editarsolicitudes-movilidad-componente/editarsolicitudes-movilidad-componente.component';


@NgModule({
  declarations: [
    BasemovilidadComponent,
    MostrarMovilidadComponent,
    NabvarmovilidadComponent,
    SpinnermovilidadComponent,
    TablamostrarmovilidadComponent,
    LoadingmovilidadComponent,
    DialoginformacionComponent,
    SpinnerPDFComponent,
    TablamovilidadAprobadoComponent,
    AprobarMovilidadComponent,
    SubirDocumentoFinalMovilidadComponent,
    TablasubirdocumentomovilidadComponent,
    DialogsubirdocumentomovilidadComponent,
    TablaeditarsolicitudesComponent,
    EditarsolicitudesMovilidadComponent,
    EditarsolicitudesMovilidadComponenteComponent
  ],
  imports: [
    CommonModule,
    MovilidadRoutingModule,
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
    CKEditorModule
  ]
})
export class MovilidadModule { }
