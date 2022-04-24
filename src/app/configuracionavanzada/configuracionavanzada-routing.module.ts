import { PermisoUsuariosBodyComponent } from './components/permiso-usuarios-body/permiso-usuarios-body.component';
import { TablabecasnivelbodyComponent } from './components/tablabecasnivelbody/tablabecasnivelbody.component';
import { IngresarbecasComponent } from './components/ingresarbecas/ingresarbecas.component';
import { ModificarPaginaPrincipalComponent } from './paginas/modificar-pagina-principal/modificar-pagina-principal.component';
import { RegistroactividadesPaginaComponent } from './paginas/registroactividades-pagina/registroactividades-pagina.component';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosDricbComponent } from './paginas/usuarios-dricb/usuarios-dricb.component';
import { LogoSolicitudesComponent } from './paginas/logo-solicitudes/logo-solicitudes.component';
import { PermisosUsuariosComponent } from './paginas/permisos-usuarios/permisos-usuarios.component';

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
        path:'permisosusuarios',component:PermisosUsuariosComponent
      },
      {
        path:'logosolicitudes',component:LogoSolicitudesComponent
      },
      {
        path:'permisosusuarios-body/:id',component:PermisoUsuariosBodyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionavanzadaRoutingModule { }
