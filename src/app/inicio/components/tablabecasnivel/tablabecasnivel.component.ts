import { Component, Input, OnInit } from '@angular/core';
import { BecasNivel } from 'src/app/models/becasnivel';
import { BecasNivelBody } from 'src/app/models/becasnivelbody';
import { CadenaSplit } from 'src/app/models/cadenas/fechapostulacion';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-tablabecasnivel',
  templateUrl: './tablabecasnivel.component.html',
  styleUrls: ['./tablabecasnivel.component.css']
})
export class TablabecasnivelComponent implements OnInit {
  @Input() opcion:string;
  lista:BecasNivel[] = [];
  listaux:BecasNivel[]=[];
  listaBecas:BecasNivel[]=[];
  listaBecasbody:BecasNivelBody[]=[];
  listaBecasbody2:BecasNivelBody[]=[];
  listapostulacion:CadenaSplit[]=[];
  listarequisitos:CadenaSplit[]=[];
  listaarea:CadenaSplit[]=[];

  pathpaginacapacitaciones:string;
  pathpaginapregrado:string;
  pathpaginainvestigacion:string;
  pathpaginamaestria:string;
  pathpaginadoctorado:string;
  pathimagen="";
  tipo="";
  tipo_c="";
    
  loading=true;
  verificar=true;
  //
  aux=0;
  constructor(private _pathimagenes:PathImagenesService,private _becasnivel:BecasnivelService,) { 
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
    this._becasnivel.getBecas()
    .subscribe((res:any)=>{
      this.listaBecas=res;
      this._becasnivel.getBecasNivelbody()
      .subscribe((res:any)=>{
          this.listaBecasbody=res;
      this.separarlista(this.listaBecas,this.listaBecasbody);
      });
      this.loading=false;
    })
  }
  separarlista(original:BecasNivel[],body:BecasNivelBody[])
  {
   original.forEach((item:BecasNivel,indice)=>{
    let opcion:string = item.tipo.toLowerCase();
    if(opcion ==this.tipo)
      {
        if(item.estado=="A")
        {
          body.forEach((item2:BecasNivelBody)=>{
            if(item.id==item2.id_becas_nivels){   
             this.aux=1;
            }
          });
          console.log(this.aux);
          if(this.aux==1){
            this.lista.push(item);
            this.aux=0;
          }

        }
        
       
      }
   });
  
   this.lista.forEach((item:BecasNivel,indice)=>{
      let ind:number=item.id;
      body.forEach((item2:BecasNivelBody)=>{

      if(ind==item2.id_becas_nivels)
      {
        this.listaBecasbody2.push(item2);
      }
      });
   });
   console.log(this.listaBecasbody2);
   if(this.listaBecasbody2.length!=0)
   {
    this.separarcadenaFecha(this.listaBecasbody2);
    this.separarcadenarequisitos(this.listaBecasbody2);
    this.separarcadenasarea(this.listaBecasbody2);

   }
   if(this.listaBecasbody2.length==0)
   {
     this.verificar=false;

   }
   
  }

  separarcadenaFecha(lista:BecasNivelBody[])
  {
   
    lista.forEach((item:BecasNivelBody)=>{
      if(item.fecha_postulacion!=null)
      {
        let fecha=item.fecha_postulacion;
      const lis=fecha.split('.');
      for(var i=0;i<lis.length;i++){
        let item2:CadenaSplit={id:0,descripcion:""};
        item2.id=item.id;
        item2.descripcion=lis[i];
        this.listapostulacion.push(item2);
      }

      }
      
    });

  }
  separarcadenarequisitos(lista:BecasNivelBody[]){
   lista.forEach((item:BecasNivelBody)=>{
     if(item.requisitos!=null){
      let requisito=item.requisitos;
      const lis=requisito.split('.');
      for(var i=0;i<lis.length;i++){
        let item2:CadenaSplit={id:0,descripcion:""};
        item2.id=item.id;
        item2.descripcion=lis[i];
        this.listarequisitos.push(item2);
      }
     }
     

   });
   
  }
  separarcadenasarea(lista:BecasNivelBody[])
  {
    lista.forEach((item:BecasNivelBody)=>{
      if(item.area_estudio!=null){
        let area=item.area_estudio;
        const list=area.split('.');
        for(var i=0;i<list.length;i++){
          let item2:CadenaSplit={id:0,descripcion:""};
          item2.id=item.id;
          item2.descripcion=list[i];
          this.listaarea.push(item2);
        }

      }
     
    });
    console.log(this.listaarea);

  }





}
