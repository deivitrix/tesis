import { ReseteoConfiguracionPaginaComponent } from './paginas/reseteo-configuracion-pagina/reseteo-configuracion-pagina.component';
import { PerfilConfiguracionPaginaComponent } from './paginas/perfil-configuracion-pagina/perfil-configuracion-pagina.component';
import { BaseconfiguracionComponent } from './baseconfiguracion/baseconfiguracion/baseconfiguracion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: BaseconfiguracionComponent,
    children:[
      {
        path:'',
        redirectTo: 'perfil', pathMatch: 'full'
      },
      {
        path:'perfil',component:PerfilConfiguracionPaginaComponent
      },
      {
        path:'reseteo',component:ReseteoConfiguracionPaginaComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
