import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasemovilidadestudiantesComponent } from './basemovilidadestudiantes/basemovilidadestudiantes.component';
import { ConsultarMovilidadComponent } from './paginas/consultar-movilidad/consultar-movilidad.component';
import { HomePaginaMovilidadComponent } from './paginas/home-pagina-movilidad/home-pagina-movilidad.component';
import { MostrarformularioMovilidadComponent } from './paginas/mostrarformulario-movilidad/mostrarformulario-movilidad.component';

const routes: Routes = [
  {
    path: '', component: BasemovilidadestudiantesComponent,
    children: [
      {
        path:'',
        redirectTo: 'movilidad', pathMatch: 'full'
      },
      {
        path: 'movilidad', component: HomePaginaMovilidadComponent,
      },
      {
        path:'formulariomovilidad',component:MostrarformularioMovilidadComponent,

      },
      {
        path:'consultarmovilidad',component:ConsultarMovilidadComponent,
       
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovilidadestudiantesRoutingModule { }
