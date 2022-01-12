import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionavanzadaRoutingModule } from './configuracionavanzada-routing.module';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NavbarconfiguracionavanzadaComponent } from './components/navbarconfiguracionavanzada/navbarconfiguracionavanzada.component';
import { RegistroactividadesPaginaComponent } from './paginas/registroactividades-pagina/registroactividades-pagina.component';


@NgModule({
  declarations: [
    BaseconfiguracionavanzadaComponent,
    NavbarconfiguracionavanzadaComponent,
    RegistroactividadesPaginaComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionavanzadaRoutingModule
  ]
})
export class ConfiguracionavanzadaModule { }
