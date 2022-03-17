import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovilidadRoutingModule } from './movilidad-routing.module';
import { BasemovilidadComponent } from './basemovilidad/basemovilidad.component';
import { MostrarMovilidadComponent } from './paginas/mostrar-movilidad/mostrar-movilidad.component';
import { NabvarmovilidadComponent } from './components/nabvarmovilidad/nabvarmovilidad.component';
import { SpinnermovilidadComponent } from './components/spinnermovilidad/spinnermovilidad.component';


@NgModule({
  declarations: [
    BasemovilidadComponent,
    MostrarMovilidadComponent,
    NabvarmovilidadComponent,
    SpinnermovilidadComponent
  ],
  imports: [
    CommonModule,
    MovilidadRoutingModule
  ]
})
export class MovilidadModule { }
