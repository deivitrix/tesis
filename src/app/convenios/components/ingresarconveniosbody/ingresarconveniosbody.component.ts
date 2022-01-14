import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';

@Component({
  selector: 'app-ingresarconveniosbody',
  templateUrl: './ingresarconveniosbody.component.html',
  styleUrls: ['./ingresarconveniosbody.component.css']
})
export class IngresarconveniosbodyComponent implements OnInit {
  listaConv: any[] = [];
  listaConvaux:any[]=[];

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';
  loading=true;


  constructor( private convenios: ConveniosServicesService,
               private router:Router) { }

  ngOnInit(): void {
    this.getconveniosplantilla();
  }
  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  getconveniosplantilla(){
    this.convenios.getconveniostipo('P').subscribe((res: any) => {
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
        

        this.listaConv.map((element, index) => (element.position = index + 1));
        this.listaConv.map(
          (element) =>
            (element.fecha_creacion = element.f_creaciondoc.split(' ')[0])
        );

      }
      
    });

  }
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }
  mostrarconvenio(id:number)
  {

   this.router.navigate(['/utmricb/convenios/ingresarcon/'+id]);
    

  }
}
