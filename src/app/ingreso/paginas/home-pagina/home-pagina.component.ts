import { RelojService } from './../../../services/reloj/reloj.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { valorReloj } from 'src/app/models/reloj/reloj';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

// import * as moment from 'moment';

@Component({
  selector: 'app-home-pagina',
  templateUrl: './home-pagina.component.html',
  styleUrls: ['./home-pagina.component.css'],
})
export class HomePaginaComponent implements OnInit {
  datos$!: Observable<valorReloj>;
  hora!: number;
  minutos!: string;
  dia!: string;
  fecha!: string;
  ampm!: string;
  segundos!: string;

  loading = true;

  listaConv: any[] = [];
  listaConvaux: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }
  constructor(
    private segundo: RelojService,
    private convenios: ConveniosServicesService
  ) {}

  ngOnInit(): void {
    this.gethora();
    this.getconvenio();
  }

  gethora() {
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe((x) => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
  }

  getconvenio() {
    this.convenios.getconveniostipo('A').subscribe((res: any) => {
      this.listaConvaux = res;

      this.loading = false;
      if (this.listaConvaux.length != 0) {
        for (var i = 0; i < this.listaConvaux.length; i++) {
          if (this.listaConvaux[i].estado == 'A') {
            this.listaConv.push(this.listaConvaux[i]);
          }
        }
        this.listaConv.forEach((item: any) => {
          var etiqueta1 = '';
          etiqueta1 = item.titulo_convenio.replace('<p>', '');
          var etiqueta2 = etiqueta1.replace('</p>', '');
          var etiqueta3 = etiqueta2.replace('<i>', '');
          var etiqueta4 = etiqueta3.replace('</i>', '');
          var etiqueta5 = etiqueta4.replace('<strong>', '');
          var etiqueta6 = etiqueta5.replace('</strong>', '');
          var etiqueta7 = etiqueta6.replace('&nbsp;', ' ');
          item.titulo_convenio = etiqueta7;
        });

        this.listaConv.map((element, index) => (element.position = index + 1));
        this.listaConv.map((element, index) => (element.duracion_class = false));

        this.listaConv.forEach((item: any) => {
          //fecha actual
          var fechaactual = new Date();
          var añoactual = fechaactual.getFullYear();
          var mesactual=fechaactual.getMonth()+1;

          //fecha fin
          var fechafin = new Date(item.fecha_fin);
          var año = fechafin.getFullYear();
          var mes=fechafin.getMonth()+1;


          var anioduracion = año - añoactual;
          var mesduracion= mesactual-mes;
          if (anioduracion < 0) {
            item.fecha_fin = '0y-' + '0m-0d';
            item.duracion_class=true;
          } else {
            item.fecha_fin=item.duracion;

          }
        });
      }
    });
  }

 

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }
}
