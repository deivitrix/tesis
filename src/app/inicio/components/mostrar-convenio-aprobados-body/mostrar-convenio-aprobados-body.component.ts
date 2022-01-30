import { ConveniosAprobados } from './../../../models/convenios/conveniosaprobados';
import { Component, Input, OnInit } from '@angular/core';
import { ConveniosaprobadosService } from 'src/app/services/conveniosaprobados/conveniosaprobados.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-mostrar-convenio-aprobados-body',
  templateUrl: './mostrar-convenio-aprobados-body.component.html',
  styleUrls: ['./mostrar-convenio-aprobados-body.component.css']
})
export class MostrarConvenioAprobadosBodyComponent implements OnInit {
@Input() tipo:string;
pathLogoUTM:string;
anio:number;
verificar=true;
listaconvenios:ConveniosAprobados[]=[];
listaconveniosAprobados:ConveniosAprobados[]=[];
loading=true;
  constructor(private _conveniosAprobados:ConveniosaprobadosService,private _pathimagenes:PathImagenesService) {
    this.tipo="";
    this.pathLogoUTM=this._pathimagenes.pathlogoutm;
    this.anio=this._conveniosAprobados.anio;
   }

  ngOnInit(): void {
    this.getconveniosAprobados();
  }

  getconveniosAprobados(){
    this._conveniosAprobados.getConveniosAprobados()
    .subscribe((res:any) => {
      
     this.listaconvenios = res;
    //  console.log(res);
     this.loading=false;
     this.separarconvenio(this.listaconvenios);
    });

  }

  separarconvenio(original:ConveniosAprobados[]){
    if(this.tipo.length!=0)
    {
      original.forEach((item:ConveniosAprobados)=>{
        let opcion:string = item.nombre_tipo.toLowerCase();
        let opcin2=this.tipo.toLowerCase();
        
        
        var fecha=new Date(item.f_creaciondoc);
        var anio_c=fecha.getFullYear();
        if(opcion==opcin2 && this.anio==anio_c)
        {
          this.listaconveniosAprobados.push(item);
        }
      });

      this.listaconveniosAprobados.forEach((item:ConveniosAprobados)=>{
         var etiqueta1=item.titulo_convenio.replace("<p>","");
         var etiqueta2=etiqueta1.replace("</p>","");
         var etiqueta3=etiqueta2.replace("<i>","");
         var etiqueta4=etiqueta3.replace("</i>","");
         var etiqueta5=etiqueta4.replace("<strong>","");
         var etiqueta6=etiqueta5.replace("</strong>","");
         var etiqueta7=etiqueta6.replace("&nbsp;"," ");
         item.titulo_convenio=etiqueta7;
      });
    }


    if(this.tipo.length==0)
    {
      this.verificar=false;
    }
  }  
}
