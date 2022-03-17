import { MostrarBecasComponent } from './paginas/mostrar-becas/mostrar-becas.component';
import { BasebecasComponent } from './basebecas/basebecas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecasRoutingModule { }
