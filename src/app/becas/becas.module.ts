import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecasRoutingModule } from './becas-routing.module';
import { BasebecasComponent } from './basebecas/basebecas.component';


@NgModule({
  declarations: [
    BasebecasComponent
  ],
  imports: [
    CommonModule,
    BecasRoutingModule
  ]
})
export class BecasModule { }
