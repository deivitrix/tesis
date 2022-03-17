import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovilidadRoutingModule } from './movilidad-routing.module';
import { BasemovilidadComponent } from './basemovilidad/basemovilidad.component';


@NgModule({
  declarations: [
    BasemovilidadComponent
  ],
  imports: [
    CommonModule,
    MovilidadRoutingModule
  ]
})
export class MovilidadModule { }
