import { RelojService } from './../../../services/reloj/reloj.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { valorReloj } from 'src/app/models/reloj/reloj';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

        this.listaConv.forEach((item: any) => {
          //fecha actual
          var fechaactual = new Date();
          var diaactual = fechaactual.getDate();
          var mesactual = fechaactual.getMonth() + 1;
          var añoactual = fechaactual.getFullYear();

          //fecha fin
          var fechafin = new Date(item.fecha_fin);
          var dia = fechafin.getDate();
          var mes = fechafin.getMonth() + 1;
          var año = fechafin.getFullYear();

          var anioduracion = año - añoactual;
          if (anioduracion < 0) {
            item.fecha_fin = '0y-' + '0M-0D';
          } else {
            // anio

            if(anioduracion!=0)
            {
              if (mesactual < mes) {
                anioduracion--;
              }
              if (mes == mesactual && diaactual < dia) {
                anioduracion--;
              }
  
              if(anioduracion<0)
              {
                anioduracion=0;
              }


            }
           
            // calculamos los meses
            var meses = 0;
            if (mesactual > mes && dia > diaactual) meses = mesactual - mes - 1;
            else if (mesactual > mes) meses = mesactual - mes;
            if (mesactual < mes && dia < diaactual)
              meses = 12 - (mes - mesactual);
            else if (mesactual < mes) meses = 12 - (mes - mesactual + 1);
            if (mesactual == mes && dia > diaactual) meses = 11;

            // calculamos los dias
            var dias = 0;
            if (diaactual > dia) dias = diaactual - dia;
            if (diaactual < dia) {
               var ultimoDiaMes = new Date(añoactual, mesactual - 1, 0);
              dias = ultimoDiaMes.getDate() - (dia - diaactual);
            }

                 item.fecha_fin = anioduracion+'y-' + meses+'M-'+ dias+'D';

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
