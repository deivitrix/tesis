import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionavanzadaRoutingModule } from './configuracionavanzada-routing.module';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NavbarconfiguracionavanzadaComponent } from './components/navbarconfiguracionavanzada/navbarconfiguracionavanzada.component';


@NgModule({
  declarations: [
    BaseconfiguracionavanzadaComponent,
    NavbarconfiguracionavanzadaComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionavanzadaRoutingModule
  ]
})
export class ConfiguracionavanzadaModule { }
