import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConveniosRoutingModule } from './convenios-routing.module';
import { BaseconveniosComponent } from './baseconvenios/baseconvenios.component';
import { MostrarConveniosPaginasComponent } from './paginas/mostrar-convenios-paginas/mostrar-convenios-paginas.component';
import { NavbarconveniosComponent } from './components/navbarconvenios/navbarconvenios.component';
import { LoadingconveniosComponent } from './components/loadingconvenios/loadingconvenios.component';
import { IngresarConveniosPaginasComponent } from './paginas/ingresar-convenios-paginas/ingresar-convenios-paginas.component';
import { IngresarPlantillaConveniosPaginasComponent } from './paginas/ingresar-plantilla-convenios-paginas/ingresar-plantilla-convenios-paginas.component';
import { IngresarplantillabodyComponent } from './components/ingresarplantillabody/ingresarplantillabody.component';
import { IngresarCategoriaComponent } from './components/ingresar-categoria/ingresar-categoria.component';
import { MensajeconveniosComponent } from './components/mensajeconvenios/mensajeconvenios.component';
import { IngresarclausulaComponent } from './components/ingresarclausula/ingresarclausula.component';
import { TablamostrarconveniosComponent } from './components/tablamostrarconvenios/tablamostrarconvenios.component';

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

import {MatDividerModule} from '@angular/material/divider';
import { IngresarfirmaemisorComponent } from './components/ingresarfirmaemisor/ingresarfirmaemisor.component';
import { IngresarfirmareceptorComponent } from './components/ingresarfirmareceptor/ingresarfirmareceptor.component';


@NgModule({
  declarations: [
    BaseconveniosComponent,
    MostrarConveniosPaginasComponent,
    NavbarconveniosComponent,
    LoadingconveniosComponent,
    IngresarConveniosPaginasComponent,
    IngresarPlantillaConveniosPaginasComponent,
    IngresarplantillabodyComponent,
    IngresarCategoriaComponent,
    MensajeconveniosComponent,
    IngresarclausulaComponent,
    TablamostrarconveniosComponent,
    IngresarfirmaemisorComponent,
    IngresarfirmareceptorComponent
  ],
  imports: [
    CommonModule,
    ConveniosRoutingModule,
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
    PipesModule
  ],
  entryComponents:[IngresarCategoriaComponent],
})
export class ConveniosModule { }
