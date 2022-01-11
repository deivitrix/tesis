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
    }
    if(this.tipo.length==0)
    {
      this.verificar=false;
    }
  }  
}
