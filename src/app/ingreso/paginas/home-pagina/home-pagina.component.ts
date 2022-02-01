import { RelojService } from './../../../services/reloj/reloj.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { valorReloj } from 'src/app/models/reloj/reloj';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-pagina',
  templateUrl: './home-pagina.component.html',
  styleUrls: ['./home-pagina.component.css']
})
export class HomePaginaComponent implements OnInit {
  datos$!: Observable<valorReloj>;
  hora!: number;
  minutos!: string;
  dia!: string;
  fecha!: string;
  ampm!: string;
  segundos!: string;

  loading=true;

  listaConv: any[] = [];
  listaConvaux:any[]=[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }
  constructor(private segundo:RelojService, private convenios: ConveniosServicesService) { 

  }

  ngOnInit(): void {
   this.gethora()
   this.getconvenio()
   
  }

  gethora(){
    
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
  }

  getconvenio(){
    this.convenios.getconveniostipo('A')
    .subscribe((res:any)=>{
      this.listaConvaux=res;
      this.loading=false;
      if(this.listaConvaux.length!=0)
      {
        for(var i=0;i<this.listaConvaux.length;i++){
          if(this.listaConvaux[i].estado=="A")
          {
            this.listaConv.push(this.listaConvaux[i]);
          }
        }
        this.listaConv.forEach((item:any)=>{
          var etiqueta1="";
          etiqueta1=item.titulo_convenio.replace("<p>","");
          // for(var i=0;i<etiquetas.length;i++)
          // {
          //   etiqueta1=etiqueta1.replace(etiqueta1[i],"");
          // }

           var etiqueta2=etiqueta1.replace("</p>","");
           var etiqueta3=etiqueta2.replace("<i>","");
           var etiqueta4=etiqueta3.replace("</i>","");
           var etiqueta5=etiqueta4.replace("<strong>","");
           var etiqueta6=etiqueta5.replace("</strong>","");
           var etiqueta7=etiqueta6.replace("&nbsp;"," ");
           item.titulo_convenio=etiqueta7;
        })


        this.listaConv.map((element, index) => (element.position = index + 1));
        this.listaConv.map(
          (element) =>(

            
            element.duracion = element.f_creaciondoc.split(' ')[0]
            
          )
        );

      }

    })
  }

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

}
