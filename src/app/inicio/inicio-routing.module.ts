import { FormularioBecasComponent } from './components/formulario-becas/formulario-becas.component';
import { FormularioMovilidadComponent } from './components/formulario-movilidad/formulario-movilidad.component';
import { ConveniosAprobadosPaginaComponent } from './paginas/convenios-aprobados-pagina/convenios-aprobados-pagina.component';
import { MaestriaPaginaComponent } from './paginas/maestria-pagina/maestria-pagina.component';
import { DoctoradoPaginaComponent } from './paginas/doctorado-pagina/doctorado-pagina.component';
import { InvestigacionPaginaComponent } from './paginas/investigacion-pagina/investigacion-pagina.component';
import { PregradoPaginaComponent } from './paginas/pregrado-pagina/pregrado-pagina.component';
import { CapacitacionesPaginaComponent } from './paginas/capacitaciones-pagina/capacitaciones-pagina.component';
import { BibliotecavirtualPaginaComponent } from './paginas/bibliotecavirtual-pagina/bibliotecavirtual-pagina.component';
import { MovilidadPaginaComponent } from './paginas/movilidad-pagina/movilidad-pagina.component';
import { BecasPaginaComponent } from './paginas/becas-pagina/becas-pagina.component';
import { ConveniosPaginaComponent } from './paginas/convenios-pagina/convenios-pagina.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base/base.component';
import { InicioPaginaComponent } from './paginas/inicio-pagina/inicio-pagina.component';
import { NosotrosPaginaComponent } from './paginas/nosotros-pagina/nosotros-pagina.component';

const routes: Routes = [
  {
    path: '', component: BaseComponent,
    // redirectTo: 'principal/ini', pathMatch: 'full',
    children: [
      {
        path:'',
        redirectTo: 'inicio', pathMatch: 'full'
      },
      {
        path: 'inicio', component: InicioPaginaComponent,
      },
      {
        path: 'nosotros', component: NosotrosPaginaComponent
      },
      {
        path:'convenios',component:ConveniosPaginaComponent
      },
      {
        path:'becas',component:BecasPaginaComponent
      },
      {
        path:'movilidad',component:MovilidadPaginaComponent
      },
      {
        path:'bibliotecavirtual',component:BibliotecavirtualPaginaComponent
      },
      {
        path:'capacitacion',component:CapacitacionesPaginaComponent
      },
      {
        path:'pregrado',component:PregradoPaginaComponent
      },
      {
        path:'investigacion',component:InvestigacionPaginaComponent
      },
      {
        path:'maestria',component:MaestriaPaginaComponent
      },
      {
        path:'doctorado',component:DoctoradoPaginaComponent
      },
      {
        path:'conveniosaprobados',component:ConveniosAprobadosPaginaComponent
      },
      {
        path:'formulario/:cedula',component:FormularioMovilidadComponent
      },
      {
        path:'formulario-becas/:cedula',component:FormularioBecasComponent
      }
      

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
