import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from './pagination/pagination.pipe';
import { BuscarConvenioPipe } from './buscarConvenio/buscar-convenio.pipe';
import { BuscarBecasPipe } from './buscarBecas/buscar-becas.pipe';
import { BuscarBecasBodyPipe } from './buscarBecasBody/buscar-becas-body.pipe';
import { BuscarconvenionombrePipe } from './buscarconvenionombre/buscarconvenionombre.pipe';
import { BuscarusuariosPipe } from './buscarusuarios/buscarusuarios.pipe';
import { BuscarsolicitudmovilidadPipe } from './buscarsolicitudmovilidad/buscarsolicitudmovilidad.pipe';
import { BuscarHistorialPipe } from './buscarHistorial/buscarHistorial.pipe';




@NgModule({
  declarations: [	
    PaginationPipe,
    BuscarConvenioPipe,
    BuscarBecasPipe,
    BuscarBecasBodyPipe,
    BuscarconvenionombrePipe,
    BuscarusuariosPipe,
    BuscarsolicitudmovilidadPipe,
    BuscarHistorialPipe
   ],
  imports: [
    CommonModule,

  ],
  exports: [
    PaginationPipe,
    BuscarConvenioPipe,
    BuscarBecasPipe,
    BuscarBecasBodyPipe,
    BuscarconvenionombrePipe,
    BuscarusuariosPipe,
    BuscarsolicitudmovilidadPipe,
    BuscarHistorialPipe
  ]
})
export class PipesModule { }
