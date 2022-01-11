import { element } from 'protractor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConveniosTipoModel } from 'src/app/models/convenios/conveniostipos';
import { ConveniosTiposTableModel } from 'src/app/models/convenios/conveniostipostable';

@Component({
  selector: 'app-tablamostrarconvenios',
  templateUrl: './tablamostrarconvenios.component.html',
  styleUrls: ['./tablamostrarconvenios.component.css'],
})
export class TablamostrarconveniosComponent implements OnInit {
  selector: FormGroup;
  tabla = false;
  conveniotipo: ConveniosTipoModel[] = [];
  conveniotipoaux: ConveniosTipoModel[] = [];
  show = true;

  generarReporte=true;

  listaConv: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  constructor(
    private convenios: ConveniosServicesService,
    private mostrar: FormBuilder
  ) {
    this.selector = mostrar.group({
      conveniostipo: ['', Validators.required],
    });
  }

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  ngOnInit(): void {}

  cambioConveniosTipos(event: any) {
    this.generarReporte=false;
   
    this.convenios.getconveniostipo(event.value).subscribe((res: any) => {
      this.tabla = true;
      this.listaConv = res;
      this.listaConv.map((element, index) => (element.position = index + 1));
      this.listaConv.map(
        (element) =>
          (element.fecha_creacion = element.f_creaciondoc.split(' ')[0])
      );
    });
  }

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }
}
