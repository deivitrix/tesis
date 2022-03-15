import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { BaseComponent } from './base/base/base.component';
import { Navb1InicioComponent } from './components/navb1-inicio/navb1-inicio.component';
import { Navb2InicioComponent } from './components/navb2-inicio/navb2-inicio.component';
import { InicioPaginaComponent } from './paginas/inicio-pagina/inicio-pagina.component';
import { NosotrosPaginaComponent } from './paginas/nosotros-pagina/nosotros-pagina.component';
import { ConveniosPaginaComponent } from './paginas/convenios-pagina/convenios-pagina.component';
import { BecasPaginaComponent } from './paginas/becas-pagina/becas-pagina.component';
import { MovilidadPaginaComponent } from './paginas/movilidad-pagina/movilidad-pagina.component';
import { CaroselComponent } from './components/carosel/carosel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BecasnivelComponent } from './components/becasnivel/becasnivel.component';
import { QuienessomosComponent } from './components/quienessomos/quienessomos.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ObjetivomisionComponent } from './components/objetivomision/objetivomision.component';
import { VisioninformacionComponent } from './components/visioninformacion/visioninformacion.component';
import { BibliotecavirtualPaginaComponent } from './paginas/bibliotecavirtual-pagina/bibliotecavirtual-pagina.component';
import { TablabibliotecaComponent } from './components/tablabiblioteca/tablabiblioteca.component';
import { CapacitacionesPaginaComponent } from './paginas/capacitaciones-pagina/capacitaciones-pagina.component';
import { PregradoPaginaComponent } from './paginas/pregrado-pagina/pregrado-pagina.component';
import { InvestigacionPaginaComponent } from './paginas/investigacion-pagina/investigacion-pagina.component';
import { MaestriaPaginaComponent } from './paginas/maestria-pagina/maestria-pagina.component';
import { TablabecasnivelComponent } from './components/tablabecasnivel/tablabecasnivel.component';
import { DoctoradoPaginaComponent } from './paginas/doctorado-pagina/doctorado-pagina.component';
import { ConveniosAprobadosPaginaComponent } from './paginas/convenios-aprobados-pagina/convenios-aprobados-pagina.component';
import { MostrarConvenioAprobadosComponent } from './components/mostrar-convenio-aprobados/mostrar-convenio-aprobados.component';
import { MostrarConvenioAprobadosBodyComponent } from './components/mostrar-convenio-aprobados-body/mostrar-convenio-aprobados-body.component';
import { MovilidadInformacionComponent } from './components/movilidad-informacion/movilidad-informacion.component';
import { FormularioMovilidadComponent } from './components/formulario-movilidad/formulario-movilidad.component';
import { DialogcedulaComponent } from './components/dialogcedula/dialogcedula.component';

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

//editor de texto
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    BaseComponent,
    Navb1InicioComponent,
    Navb2InicioComponent,
    InicioPaginaComponent,
    NosotrosPaginaComponent,
    ConveniosPaginaComponent,
    BecasPaginaComponent,
    MovilidadPaginaComponent,
    CaroselComponent,
    FooterComponent,
    LoadingComponent,
    BecasnivelComponent,
    QuienessomosComponent,
    HistoriaComponent,
    ObjetivomisionComponent,
    VisioninformacionComponent,
    BibliotecavirtualPaginaComponent,
    TablabibliotecaComponent,
    CapacitacionesPaginaComponent,
    PregradoPaginaComponent,
    InvestigacionPaginaComponent,
    MaestriaPaginaComponent,
    TablabecasnivelComponent,
    DoctoradoPaginaComponent,
    ConveniosAprobadosPaginaComponent,
    MostrarConvenioAprobadosComponent,
    MostrarConvenioAprobadosBodyComponent,
    MovilidadInformacionComponent,
    FormularioMovilidadComponent,
    DialogcedulaComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
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
    CKEditorModule

  ],
  exports: [
    Navb1InicioComponent,
    Navb2InicioComponent,
    FooterComponent,
    LoadingComponent,
  ]
})
export class InicioModule { }
