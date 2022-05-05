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

//actualizar url


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



import { GenerarreporteconvenioComponent } from './components/generarreporteconvenio/generarreporteconvenio.component';
import { IngresarconveniosbodyComponent } from './components/ingresarconveniosbody/ingresarconveniosbody.component';
import { Ingresarconveniosbody2Component } from './components/ingresarconveniosbody2/ingresarconveniosbody2.component';
import { IngresarfirmaComponent } from './components/ingresarfirma/ingresarfirma.component';
import { TablamodificarComponent } from './components/tablamodificar/tablamodificar.component';
import { ModificarConveniosPaginaComponent } from './paginas/modificar-convenios-pagina/modificar-convenios-pagina.component';
import { SubirConveniosPaginaComponent } from './paginas/subir-convenios-pagina/subir-convenios-pagina.component';
import { MostrarConvenioPDFComponent } from './components/mostrar-convenio-pdf/mostrar-convenio-pdf.component';
import { EditarconveniosaprobadosComponent } from './components/editarconveniosaprobados/editarconveniosaprobados.component';
import { TablasubirComponent } from './components/tablasubir/tablasubir.component';
import { SpinnerconveniosComponent } from './components/spinnerconvenios/spinnerconvenios.component';
//import { TablamodificarComponent } from './components/tablamodificar/tablamodificar.component';

//editor de texto
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { GalleriaComponent } from './components/galleria/galleria.component';




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
    GenerarreporteconvenioComponent,
    IngresarconveniosbodyComponent,
    Ingresarconveniosbody2Component,
    IngresarfirmaComponent,
    TablamodificarComponent,
    ModificarConveniosPaginaComponent,
    SubirConveniosPaginaComponent,
    MostrarConvenioPDFComponent,
    EditarconveniosaprobadosComponent,
    TablasubirComponent,
    SpinnerconveniosComponent,
    GalleriaComponent,
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
    PipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    CKEditorModule
  ],
  exports:[
    TablamodificarComponent,
    GalleriaComponent,
    GenerarreporteconvenioComponent
  ],
  entryComponents:[IngresarCategoriaComponent],
})
export class ConveniosModule { }
