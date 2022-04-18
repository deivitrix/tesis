import { SesionGuardGuard } from './auth/guards/sesion-guard.guard';
import { CheckLoginGuard } from './auth/guards/check-login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistSesionGuardGuard } from './ingreso/guards/sesionGuard/sesion-guard.guard';
import { ExistSesionbecasGuard } from './becasdocentes/sesionGuard/sesionbecas.guard';
import { ExistSesionmovilidadGuard } from './movilidadestudiantes/guards/sesionmovilidad/sesionmovilidad.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'principal',pathMatch:'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path : 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [SesionGuardGuard]
  },
  {
    path : 'utmricb',
    loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule),
    canActivate:[ExistSesionGuardGuard]
  },
  
  {
    path: 'becas',
    loadChildren: () => import('./becasdocentes/becasdocentes.module').then(m => m.BecasdocentesModule),
    canActivate:[ExistSesionbecasGuard]
  },
  {
    path: 'movilidad',
    loadChildren: () => import('./movilidadestudiantes/movilidadestudiantes.module').then(m => m.MovilidadestudiantesModule),
    canActivate:[ExistSesionmovilidadGuard]
  },

  
  {path:'**',redirectTo:'principal',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
