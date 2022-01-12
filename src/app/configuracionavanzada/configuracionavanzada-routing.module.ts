import { RegistroactividadesPaginaComponent } from './paginas/registroactividades-pagina/registroactividades-pagina.component';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: BaseconfiguracionavanzadaComponent,
    children:[
      {
        path:'',
        redirectTo: 'registroActividades', pathMatch: 'full'
      },
      {
        path:'registroActividades',component:RegistroactividadesPaginaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionavanzadaRoutingModule { }
