
import { BasemovilidadComponent } from './basemovilidad/basemovilidad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarMovilidadComponent } from './paginas/mostrar-movilidad/mostrar-movilidad.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovilidadRoutingModule { }