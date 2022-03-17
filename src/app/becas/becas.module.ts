import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecasRoutingModule } from './becas-routing.module';
import { BasebecasComponent } from './basebecas/basebecas.component';
import { MostrarBecasComponent } from './paginas/mostrar-becas/mostrar-becas.component';
import { SpinnerbecasComponent } from './components/spinnerbecas/spinnerbecas.component';
import { NavbarbecasComponent } from './components/navbarbecas/navbarbecas.component';



@NgModule({
  declarations: [
    BasebecasComponent,
    MostrarBecasComponent,
    SpinnerbecasComponent,
    NavbarbecasComponent,

  ],
  imports: [
    CommonModule,
    BecasRoutingModule
  ]
})
export class BecasModule { }
