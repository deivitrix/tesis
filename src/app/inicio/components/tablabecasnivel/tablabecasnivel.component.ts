import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BecasNivel } from 'src/app/models/becasnivel';
import { BecasNivelBody } from 'src/app/models/becasnivelbody';
import { CadenaSplit } from 'src/app/models/cadenas/fechapostulacion';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-tablabecasnivel',
  templateUrl: './tablabecasnivel.component.html',
  styleUrls: ['./tablabecasnivel.component.css']
})
export class TablabecasnivelComponent implements OnInit {

  @Input() opcion:string;

  ///lista
  lista_becas:BecasNivel[]=[];
  lista_nombre:any[]=[];
  lista_pais:any[]=[];
  lista_idioma:any[]=[];
  lista_areEstudio:any[]=[];
  lista_fecha:any[]=[];
  lista_modalidad:any[]=[];
  lista_requisitos:any[]=[];
  lista_reconocimientos:any[]=[];

  

  // lista:BecasNivel[] = [];
  // listaux:BecasNivel[]=[];
  // listaBecas:BecasNivel[]=[];
  // listaBecasbody:BecasNivelBody[]=[];
  // listaBecasbody2:BecasNivelBody[]=[];
  // listapostulacion:CadenaSplit[]=[];
  // listarequisitos:CadenaSplit[]=[];
  // listaarea:CadenaSplit[]=[];

  pathpaginacapacitaciones:string;
  pathpaginapregrado:string;
  pathpaginainvestigacion:string;
  pathpaginamaestria:string;
  pathpaginadoctorado:string;
  pathimagen="";
  tipo="";
  tipo_c="";

  // lista

  
    
  loading=true;
  verificar=true;
  //
  aux=0;

  constructor(private _pathimagenes:PathImagenesService,
    private _becasnivel:BecasnivelService,private renderer: Renderer2) { 
    this.pathpaginacapacitaciones=this._pathimagenes.pathpaginacapacitaciones;
    this.pathpaginapregrado=this._pathimagenes.pathpaginapregrado;
    this.pathpaginainvestigacion=this._pathimagenes.pathpaginainvestigacion;
    this.pathpaginamaestria=this._pathimagenes.pathpaginamaestrias;
    this.pathpaginadoctorado=this._pathimagenes.pathpaginadoctorados;
    this.opcion="";

    
  }
  
  getopciontabla()
  {
    if(this.opcion=="C")
    { 
      this.pathimagen=this.pathpaginacapacitaciones;
      this.tipo='c';
      this.tipo_c="Capacitacion";
    }
    else if(this.opcion=="P"){
       this.pathimagen=this.pathpaginapregrado;
       this.tipo='p';
       this.tipo_c="Pregrado";
    }
    else if(this.opcion=="I"){
       this.pathimagen=this.pathpaginainvestigacion;
       this.tipo='i'
       this.tipo_c="Investigacion";
    }
    else if(this.opcion=="M"){
      this.pathimagen=this.pathpaginamaestria;
      this.tipo='m'
      this.tipo_c="Maestria";
    }
    else if(this.opcion=="D"){
      this.pathimagen=this.pathpaginadoctorado;
      this.tipo='d'
      this.tipo_c="Doctorado";
    }
  }
  
  

  ngOnInit(): void {
    this.getopciontabla();
    this.getbecasnivel();
  }

  
  getbecasnivel(){

    this._becasnivel.getBecasv2(this.tipo)
    .subscribe((res:any)=>{
      // console.log(res);
      
      if(res.estado)
      {
        this.loading=false;
        this.lista_becas=res.data;
        this.verificar=true;
        console.log(this.lista_becas);
        
      
      }
      else{
        this.verificar=false;
        this.loading=false;
      }
    });


    // this._becasnivel.getBecas()
    // .subscribe((res:any)=>{
    //   this.listaBecas=res;
    //   this._becasnivel.getBecasNivelbody()
    //   .subscribe((res:any)=>{
    //     this.listaBecasbody=res;
    //     this.separarlista(this.listaBecas,this.listaBecasbody);
    //   });
    //   this.loading=false;
    // })
  }







  actualizarlista(original:BecasNivel[])
  {
    
    original.forEach((item:BecasNivel)=>{

     item.becas_nivel_body.forEach((item2:BecasNivelBody)=>{
       if(item2.url!=null)
       {
         const etiqueta=item2.url;
         var verificarStrong=etiqueta.includes("<strong>");
         var verificarI=etiqueta.includes("<i>");
         var verificarP=etiqueta.includes("<p>");
         var etiqueta1="";
         etiqueta1=item2.nombre.replace("<p>"," ");
         var etiqueta2=etiqueta1.replace("</p>","");
         var etiqueta3=etiqueta2.replace("<i>","");
         var etiqueta4=etiqueta3.replace("</i>","");
         var etiqueta5=etiqueta4.replace("<strong>","");
         var etiqueta6=etiqueta5.replace("</strong>","");
         var etiqueta7=etiqueta6.replace("&nbsp;"," ");
         item2.url=etiqueta7;
         
         

       }
     })

    })

  }








  // separarcadenaFecha(lista:BecasNivelBody[])
  // {
   
  //   lista.forEach((item:BecasNivelBody)=>{
  //     if(item.fecha_postulacion!=null)
  //     {
  //       let fecha=item.fecha_postulacion;
  //     const lis=fecha.split('.');
  //     for(var i=0;i<lis.length;i++){
  //       let item2:CadenaSplit={id:0,descripcion:""};
  //       item2.id=item.id;
  //       item2.descripcion=lis[i];
  //       this.listapostulacion.push(item2);
  //     }

  //     }
      
  //   });

  // }
  // separarcadenarequisitos(lista:BecasNivelBody[]){
  //  lista.forEach((item:BecasNivelBody)=>{
  //    if(item.requisitos!=null){
  //     let requisito=item.requisitos;
  //     const lis=requisito.split('.');
  //     for(var i=0;i<lis.length;i++){
  //       let item2:CadenaSplit={id:0,descripcion:""};
  //       item2.id=item.id;
  //       item2.descripcion=lis[i];
  //       this.listarequisitos.push(item2);
  //     }
  //    }
     

  //  });
   
  // }
  // separarcadenasarea(lista:BecasNivelBody[])
  // {
  //   lista.forEach((item:BecasNivelBody)=>{
  //     if(item.area_estudio!=null){
  //       let area=item.area_estudio;
  //       const list=area.split('.');
  //       for(var i=0;i<list.length;i++){
  //         let item2:CadenaSplit={id:0,descripcion:""};
  //         item2.id=item.id;
  //         item2.descripcion=list[i];
  //         this.listaarea.push(item2);
  //       }

  //     }
     
  //   });
  //   console.log(this.listaarea);

  // }





}
