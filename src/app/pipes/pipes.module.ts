import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from './pagination/pagination.pipe';
import { BuscarConvenioPipe } from './buscarConvenio/buscar-convenio.pipe';



@NgModule({
  declarations: [
    PaginationPipe,
    BuscarConvenioPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationPipe,
    BuscarConvenioPipe
  ]
})
export class PipesModule { }
