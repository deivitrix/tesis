import { EditarconveniosaprobadosComponent } from './components/editarconveniosaprobados/editarconveniosaprobados.component';
import { SubirConveniosPaginaComponent } from './paginas/subir-convenios-pagina/subir-convenios-pagina.component';
import { IngresarConveniosPaginasComponent } from './paginas/ingresar-convenios-paginas/ingresar-convenios-paginas.component';
import { MostrarConveniosPaginasComponent } from './paginas/mostrar-convenios-paginas/mostrar-convenios-paginas.component';
import { BaseconveniosComponent } from './baseconvenios/baseconvenios.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarPlantillaConveniosPaginasComponent } from './paginas/ingresar-plantilla-convenios-paginas/ingresar-plantilla-convenios-paginas.component';
import { Ingresarconveniosbody2Component } from './components/ingresarconveniosbody2/ingresarconveniosbody2.component';
import { ModificarConveniosPaginaComponent } from './paginas/modificar-convenios-pagina/modificar-convenios-pagina.component';
import { MostrarConvenioPDFComponent } from './components/mostrar-convenio-pdf/mostrar-convenio-pdf.component';

const routes: Routes = [
  {
    path: '', component: BaseconveniosComponent,
    children:[
      {
        path:'',
        redirectTo: 'mostrarconvenios', pathMatch: 'full'
      },
      {
        path: 'mostrarconvenios',component:MostrarConveniosPaginasComponent
      },
      {
        path:'ingresarconvenios',component:IngresarConveniosPaginasComponent
      },
      {
        path:'ingresarplantilla',component:IngresarPlantillaConveniosPaginasComponent
      },
      {
        path:'ingresarcon/:id/:tipo',component:Ingresarconveniosbody2Component
      },
      {
         path:'tablamodificar',component:ModificarConveniosPaginaComponent
       },
      {
        path:'editcon/:id/:tipo/:tipocon',component:Ingresarconveniosbody2Component
      },
      {
        path:'tablasubir',component:SubirConveniosPaginaComponent
      },
      {
        path:'mostrarconvenios/:id/:tipocon',component:MostrarConvenioPDFComponent
      },
      {
        path:'editarconveniosaprovados/:id',component:EditarconveniosaprobadosComponent
      },
      {
        path:'subirconvenios/:id/:tipo',component:EditarconveniosaprobadosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ConveniosRoutingModule { }
