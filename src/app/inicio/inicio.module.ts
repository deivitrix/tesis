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
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ],
  exports: [
    Navb1InicioComponent,
    Navb2InicioComponent,
    FooterComponent,
    LoadingComponent,
  ]
})
export class InicioModule { }
