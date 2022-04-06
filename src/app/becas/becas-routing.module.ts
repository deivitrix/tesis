import { EditarsolicitudesBecasComponent } from './paginas/editarsolicitudes-becas/editarsolicitudes-becas.component';
import { SubirDocumentoFinalBecasComponent } from './paginas/subir-documento-final-becas/subir-documento-final-becas.component';
import { AprobarBecasComponent } from './paginas/aprobar-becas/aprobar-becas.component';
import { MostrarBecasComponent } from './paginas/mostrar-becas/mostrar-becas.component';
import { BasebecasComponent } from './basebecas/basebecas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarsolicitudesBecasComponenteComponent } from './components/editarsolicitudes-becas-componente/editarsolicitudes-becas-componente.component';

const routes: Routes = [
  {
    path: '', component: BasebecasComponent,
    children:[
      {
        path:'',
        redirectTo: 'mostrarbecas', pathMatch: 'full'
      },
      {
        path: 'mostrarbecas',component:MostrarBecasComponent
      },
      {
        path:'aprobarbecas',component:AprobarBecasComponent
      },
      {
        path:'subirdocumentofinalbecas',component:SubirDocumentoFinalBecasComponent
      },
      {
        path:'editarsolicitudes-becas',component:EditarsolicitudesBecasComponent

      },
      {
        path:'editarSolicitud-becas/:id/:tipo',component:EditarsolicitudesBecasComponenteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecasRoutingModule { }
