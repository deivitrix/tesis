import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from './pagination/pagination.pipe';
import { BuscarConvenioPipe } from './buscarConvenio/buscar-convenio.pipe';
import { BuscarBecasPipe } from './buscarBecas/buscar-becas.pipe';
import { BuscarBecasBodyPipe } from './buscarBecasBody/buscar-becas-body.pipe';



@NgModule({
  declarations: [
    PaginationPipe,
    BuscarConvenioPipe,
    BuscarBecasPipe,
    BuscarBecasBodyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationPipe,
    BuscarConvenioPipe,
    BuscarBecasPipe,
    BuscarBecasBodyPipe
  ]
})
export class PipesModule { }
