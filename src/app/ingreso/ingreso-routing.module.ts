import { ConveniosPaginaComponent } from './paginas/convenios-pagina/convenios-pagina.component';
import { IngresarPlantillaConveniosComponent } from './paginas/ingresar-plantilla-convenios/ingresar-plantilla-convenios.component';
import { ReseteoContraPaginaComponent } from './paginas/reseteo-contra-pagina/reseteo-contra-pagina.component';
import { PerfilPaginaComponent } from './paginas/perfil-pagina/perfil-pagina.component';
import { HomePaginaComponent } from './paginas/home-pagina/home-pagina.component';
import { IngresarConveniosPaginaComponent } from './paginas/ingresar-convenios-pagina/ingresar-convenios-pagina.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseIngresoComponent } from './base-ingreso/base-ingreso.component';

const routes: Routes = [
  {
    path: '', component: BaseIngresoComponent,
    children: [
      {
        path:'',
        redirectTo: 'principal', pathMatch: 'full'
      },
      {
        path: 'principal', component: HomePaginaComponent,
      },
      {
        path:'convenios',
        loadChildren: () => import('src/app/convenios/convenios.module').then(m => m.ConveniosModule),
      },
      {
        path:'configuracion',
        loadChildren: () => import('src/app/configuracion/configuracion.module').then(m => m.ConfiguracionModule),
      },
      {
        path:'configuracionavanzada',
        loadChildren: () => import('src/app/configuracionavanzada/configuracionavanzada.module').then(m => m.ConfiguracionavanzadaModule),
      },
      {
        path:'movilidad',
        loadChildren: () => import('src/app/movilidad/movilidad.module').then(m => m.MovilidadModule),
      },
      {
        path:'becas',
        loadChildren: () => import('src/app/becas/becas.module').then(m => m.BecasModule),
      },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
