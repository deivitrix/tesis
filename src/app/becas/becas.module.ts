import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecasRoutingModule } from './becas-routing.module';
import { BasebecasComponent } from './basebecas/basebecas.component';
import { MostrarBecasComponent } from './paginas/mostrar-becas/mostrar-becas.component';
import { SpinnerbecasComponent } from './components/spinnerbecas/spinnerbecas.component';
import { NavbarbecasComponent } from './components/navbarbecas/navbarbecas.component';
import { TablamostrarbecasComponent } from './components/tablamostrarbecas/tablamostrarbecas.component';

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
import { LoadingbecasComponent } from './components/loadingbecas/loadingbecas.component';
import { DialoginformacionbecasComponent } from './components/dialoginformacionbecas/dialoginformacionbecas.component';
import { AprobarBecasComponent } from './paginas/aprobar-becas/aprobar-becas.component';
import { TablabecasAprobadoComponent } from './components/tablabecas-aprobado/tablabecas-aprobado.component';
import { SubirDocumentoFinalBecasComponent } from './paginas/subir-documento-final-becas/subir-documento-final-becas.component';
import { TablasubirdocumentobecasComponent } from './components/tablasubirdocumentobecas/tablasubirdocumentobecas.component';
import { DialogsubirdocumentobecasComponent } from './components/dialogsubirdocumentobecas/dialogsubirdocumentobecas.component';
import { EditarsolicitudesBecasComponent } from './paginas/editarsolicitudes-becas/editarsolicitudes-becas.component';
import { TablaeditarsolicitudesbecasComponent } from './components/tablaeditarsolicitudesbecas/tablaeditarsolicitudesbecas.component';
import { EditarsolicitudesBecasComponenteComponent } from './components/editarsolicitudes-becas-componente/editarsolicitudes-becas-componente.component';




@NgModule({
  declarations: [
    BasebecasComponent,
    MostrarBecasComponent,
    SpinnerbecasComponent,
    NavbarbecasComponent,
    TablamostrarbecasComponent,
    LoadingbecasComponent,
    DialoginformacionbecasComponent,
    AprobarBecasComponent,
    TablabecasAprobadoComponent,
    SubirDocumentoFinalBecasComponent,
    TablasubirdocumentobecasComponent,
    DialogsubirdocumentobecasComponent,
    EditarsolicitudesBecasComponent,
    TablaeditarsolicitudesbecasComponent,
    EditarsolicitudesBecasComponenteComponent,
   

  ],
  imports: [
    CommonModule,
    BecasRoutingModule,
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
export class BecasModule { }
