import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConveniosAprobados } from 'src/app/models/convenios/conveniosaprobados';
import { ConveniosaprobadosService } from 'src/app/services/conveniosaprobados/conveniosaprobados.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';

@Component({
  selector: 'app-mostrar-convenio-aprobados',
  templateUrl: './mostrar-convenio-aprobados.component.html',
  styleUrls: ['./mostrar-convenio-aprobados.component.css']
})
export class MostrarConvenioAprobadosComponent implements OnInit {
  pathLogoUTM:string;
  listaconvenios:ConveniosAprobados[]=[];
  
  listaAnioMarco:number[]=[];
  listaAnioMarcoInter:number[]=[];
  listaAnioEspecifico:number[]=[];
  loading=true;
  loadingf=true;

  //lista auxiliares
  listaAnioMarcoaux:number[]=[];
  listaAnioMarcoInteraux:number[]=[];
  listaAnioEspecificoaux:number[]=[];
  
  listaAnioMarcoaux2:number[]=[];
  listaAnioMarcoInteraux2:number[]=[];
  listaAnioEspecificoaux2:number[]=[];

  //interfaces
  listainterfaz:Interfaz_contenido[]=[];
  listaMarco:Interfaz_contenido[]=[];
  listaMarcoInter:Interfaz_contenido[]=[];
  listaEspecifico:Interfaz_contenido[]=[];
  listareglamento:Interfaz_contenido[]=[];
  
  constructor(private _pathimagenes:PathImagenesService, private _conveniosAprobados:ConveniosaprobadosService,private router:Router,private _general:GeneralService ) { 
    this.pathLogoUTM=this._pathimagenes.pathlogoutm;
  }

  ngOnInit(): void {
    this.getconveniosAprobados();
    this.getPaginas();
  }
  getPaginas(){
    this._general.getTipoPagina("Convenios")
    .subscribe((res:any) => {
      this.listainterfaz=res;
      this.loadingf=false;
      // console.log(this.listainterfaz);
      this.separarConvenios(this.listainterfaz);
     
    })
  }

  separarConvenios(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Etiqueta-Convenios"){
         if(item.nombre=="Etiqueta Marco")
         {
           if(item.estado=="A"){
            this.listaMarco.push(item);
           }
          
         }

         if(item.nombre=="Etiqueta Marco Internacional")
         {
          if(item.estado=="A"){ 
            this.listaMarcoInter.push(item);
          }
         }

         if(item.nombre=="Etiqueta Especificos")
         {
          if(item.estado=="A"){ 
            this.listaEspecifico.push(item);
          }
         }
         
         if(item.nombre=="Etiqueta Reglamento")
         {
          if(item.estado=="A"){ 
            this.listareglamento.push(item);
          }
         }

      }
    });

    
  }


  getconveniosAprobados(){
    this._conveniosAprobados.getConveniosAprobados()
    .subscribe((res:any) => {
     this.listaconvenios = res;
    //  console.log(res);
     this.loading=false;
     this.separarFecha(this.listaconvenios);
    })
  }
  
  separarFecha(original:ConveniosAprobados[])
  {
    
    original.forEach((item:ConveniosAprobados)=>{
      var fecha;
      if(item.nombre_tipo=="Marco")
      {
        fecha=new Date(item.f_creaciondoc);
        this.listaAnioMarcoaux.push(fecha.getFullYear());
      }
      if(item.nombre_tipo=="Marco Internacional")
      {
        fecha=new Date(item.f_creaciondoc);
        this.listaAnioMarcoInteraux.push(fecha.getFullYear());
      }
      if(item.nombre_tipo=="Especifico")
      {
        fecha=new Date(item.f_creaciondoc);
        this.listaAnioEspecificoaux.push(fecha.getFullYear());
      }

    });
     //ordenar
    this.listaAnioMarcoaux2=this.listaAnioMarcoaux.sort();
    this.listaAnioMarcoInteraux2=this.listaAnioMarcoInteraux.sort();
    this.listaAnioEspecificoaux2=this.listaAnioEspecificoaux.sort();
   

     //quitar los años repetidos
    this.listaAnioMarco=this.listaAnioMarcoaux2.filter((item,index)=>{
      return this.listaAnioMarcoaux2.indexOf(item) === index;
    });

    this.listaAnioMarcoInter=this.listaAnioMarcoInteraux2.filter((item,index)=>{
      return this.listaAnioMarcoInteraux2.indexOf(item) === index;
    });

    this.listaAnioEspecifico=this.listaAnioEspecificoaux2.filter((item,index)=>{
      return this.listaAnioEspecificoaux2.indexOf(item) === index;
    });
  }
  
  indicar_anio_marco(anio:number)
  {
    this._conveniosAprobados.anio=anio;
    this._conveniosAprobados.tipo_convenio="Marco";
    this.router.navigate(['/principal/conveniosaprobados']);
  }
  indicar_anio_marco_inter(anio:number)
  {
    this._conveniosAprobados.anio=anio;
    this._conveniosAprobados.tipo_convenio="Marco Internacional";
    this.router.navigate(['/principal/conveniosaprobados']);

  }
  
  indicar_anio_especifico(anio:number)
  {
    this._conveniosAprobados.anio=anio;
    this._conveniosAprobados.tipo_convenio="Especifico";
    this.router.navigate(['/principal/conveniosaprobados']);
  }
  

}
