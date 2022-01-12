import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: BaseconfiguracionavanzadaComponent,
    children:[
      {
        path:'',
        redirectTo: 'base', pathMatch: 'full'
      },
      {
        path:'base',component:BaseconfiguracionavanzadaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionavanzadaRoutingModule { }
