import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionavanzadaRoutingModule } from './configuracionavanzada-routing.module';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NavbarconfiguracionavanzadaComponent } from './components/navbarconfiguracionavanzada/navbarconfiguracionavanzada.component';
import { RegistroactividadesPaginaComponent } from './paginas/registroactividades-pagina/registroactividades-pagina.component';
import { ModificarPaginaPrincipalComponent } from './paginas/modificar-pagina-principal/modificar-pagina-principal.component';
import { LoadingconfiguracionavanzadaComponent } from './components/loadingconfiguracionavanzada/loadingconfiguracionavanzada.component';
import { SpinnerconfiguracionavanzadaComponent } from './components/spinnerconfiguracionavanzada/spinnerconfiguracionavanzada.component';


@NgModule({
  declarations: [
    BaseconfiguracionavanzadaComponent,
    NavbarconfiguracionavanzadaComponent,
    RegistroactividadesPaginaComponent,
    ModificarPaginaPrincipalComponent,
    LoadingconfiguracionavanzadaComponent,
    SpinnerconfiguracionavanzadaComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionavanzadaRoutingModule
  ]
})
export class ConfiguracionavanzadaModule { }
