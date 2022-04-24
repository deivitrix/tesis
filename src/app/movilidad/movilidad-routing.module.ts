import { TablaeditarsolicitudesComponent } from './components/tablaeditarsolicitudes/tablaeditarsolicitudes.component';
import { EditarsolicitudesMovilidadComponent } from './paginas/editarsolicitudes-movilidad/editarsolicitudes-movilidad.component';
import { SubirDocumentoFinalMovilidadComponent } from './paginas/subir-documento-final-movilidad/subir-documento-final-movilidad.component';
import { AprobarMovilidadComponent } from './paginas/aprobar-movilidad/aprobar-movilidad.component';

import { BasemovilidadComponent } from './basemovilidad/basemovilidad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarMovilidadComponent } from './paginas/mostrar-movilidad/mostrar-movilidad.component';
import { EditarsolicitudesMovilidadComponenteComponent } from './components/editarsolicitudes-movilidad-componente/editarsolicitudes-movilidad-componente.component';

const routes: Routes = [
  {
    path: '', component: BasemovilidadComponent,
    children:[
      {
        path:'',
        redirectTo: 'mostrarmovilidad', pathMatch: 'full'
      },
      {
        path: 'mostrarmovilidad',component:MostrarMovilidadComponent
      },
      {
        path:'aprobarmovilidad',component:AprobarMovilidadComponent
      },
      {
        path:'subirdocumentofinalmovilidad',component:SubirDocumentoFinalMovilidadComponent
      },
      {
        path:'editarsolicitudes-movilidad',component:EditarsolicitudesMovilidadComponent

      },
      {
        path:'editarSolicitud-movilidad/:id/:tipo',component:EditarsolicitudesMovilidadComponenteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovilidadRoutingModule { }
