import { TablabecasnivelbodyComponent } from './components/tablabecasnivelbody/tablabecasnivelbody.component';
import { IngresarbecasComponent } from './components/ingresarbecas/ingresarbecas.component';
import { ModificarPaginaPrincipalComponent } from './paginas/modificar-pagina-principal/modificar-pagina-principal.component';
import { RegistroactividadesPaginaComponent } from './paginas/registroactividades-pagina/registroactividades-pagina.component';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosDricbComponent } from './paginas/usuarios-dricb/usuarios-dricb.component';
import { LogoSolicitudesComponent } from './paginas/logo-solicitudes/logo-solicitudes.component';

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
      {
        path:'modificarPaginaPrincipal',component:ModificarPaginaPrincipalComponent
      },
      {
         path:'ingresarbecas/:tipo',component:IngresarbecasComponent
      },
      {
        path:'becasnivelbody/:id/:tipo/:nombre',component:TablabecasnivelbodyComponent
      },
      {
        path:'usuariosDricb',component:UsuariosDricbComponent
      },
      {
        path:'logosolicitudes',component:LogoSolicitudesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionavanzadaRoutingModule { }
