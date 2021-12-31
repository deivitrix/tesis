import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConveniosRoutingModule } from './convenios-routing.module';
import { BaseconveniosComponent } from './baseconvenios/baseconvenios.component';
import { MostrarConveniosPaginasComponent } from './paginas/mostrar-convenios-paginas/mostrar-convenios-paginas.component';
import { NavbarconveniosComponent } from './components/navbarconvenios/navbarconvenios.component';
import { LoadingconveniosComponent } from './components/loadingconvenios/loadingconvenios.component';
import { IngresarConveniosPaginasComponent } from './paginas/ingresar-convenios-paginas/ingresar-convenios-paginas.component';
import { IngresarPlantillaConveniosPaginasComponent } from './paginas/ingresar-plantilla-convenios-paginas/ingresar-plantilla-convenios-paginas.component';
import { IngresarplantillabodyComponent } from './components/ingresarplantillabody/ingresarplantillabody.component';


@NgModule({
  declarations: [
    BaseconveniosComponent,
    MostrarConveniosPaginasComponent,
    NavbarconveniosComponent,
    LoadingconveniosComponent,
    IngresarConveniosPaginasComponent,
    IngresarPlantillaConveniosPaginasComponent,
    IngresarplantillabodyComponent
  ],
  imports: [
    CommonModule,
    ConveniosRoutingModule
  ]
})
export class ConveniosModule { }
