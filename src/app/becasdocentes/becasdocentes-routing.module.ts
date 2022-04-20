import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasebecasdocentesComponent } from './basebecasdocentes/basebecasdocentes.component';
import { FormularioBecasComponent } from './components/formulario-becas/formulario-becas.component';
import { ConsultarBecasComponent } from './paginas/consultar-becas/consultar-becas.component';
import { HomePaginaBecasComponent } from './paginas/home-pagina-becas/home-pagina-becas.component';
import { MostrarformularioBecasComponent } from './paginas/mostrarformulario-becas/mostrarformulario-becas.component';
const routes: Routes = [
  {
    path: '', component: BasebecasdocentesComponent,
    children: [
      {
        path:'',
        redirectTo: 'becas', pathMatch: 'full'
      },
      {
        path: 'becas', component: HomePaginaBecasComponent,
      },
      {
        path:'formulariobecas',component:MostrarformularioBecasComponent,

      },
     
      {
        path:'consultarbecas',component:ConsultarBecasComponent,
       
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecasdocentesRoutingModule { }
