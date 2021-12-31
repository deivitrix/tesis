import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-quienessomos',
  templateUrl: './quienessomos.component.html',
  styleUrls: ['./quienessomos.component.css']
})
export class QuienessomosComponent implements OnInit {

  pathMision:string;
  pathVision:string;

  listainterfaz:Interfaz_contenido[]=[];
  listainterfaz2:Interfaz_contenido[]=[];
  listaobjetivo:Interfaz_contenido[]=[];
  listamision:Interfaz_contenido[]=[];
  listavision:Interfaz_contenido[]=[];

  listaobjetivoaux:Interfaz_contenido[]=[];
  listamisionaux:Interfaz_contenido[]=[];
  listavisionaux:Interfaz_contenido[]=[];


  loading=true;
  verificar1=true;
  verificar2=true;
  verificar3=true;
  constructor(private _pathimagenes:PathImagenesService,private router:Router,private _general:GeneralService) {
    this.pathMision=this._pathimagenes.pathmision;
    this.pathVision=this._pathimagenes.pathvision;
   }

  ngOnInit(): void {
    this.getPaginas();
  }

  getPaginas(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listainterfaz=res;
      this.loading=false;
      this.separarlista(this.listainterfaz);
    })
  }

  separarlista(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Quienes-Somos"){
         if(item.nombre=="Mision")
         {
           if(item.estado=="A"){
            this.listamisionaux.push(item);
           }
          
         }

         if(item.nombre=="Objetivo General")
         {
          if(item.estado=="A"){ 
            this.listaobjetivoaux.push(item);
          }
         }
         if(item.nombre=="Vision")
         {
          if(item.estado=="A"){ 
            this.listavisionaux.push(item);
          }
         }

      }
    });
    
     console.log(this.listaobjetivoaux);
    // console.log(this.listamisionaux[0].descripcion.length);
    // console.log(this.listavisionaux[0].descripcion.substring(0,65));



   this.separartitulo(this.listaobjetivoaux,this.listamisionaux,this.listavisionaux);
    



    
  }
  
  separartitulo(listaobjetivoaux:Interfaz_contenido[],listamisionaux:Interfaz_contenido[],listavisionaux:Interfaz_contenido[])
  {
    if(listaobjetivoaux.length==0)
    {
       this.verificar1=false;
    }
    if(listamisionaux.length==0)
    {
      this.verificar2=false;
    }
    if(listavisionaux.length==0)
    {
      this.verificar2=false;
    }
    
    listaobjetivoaux.forEach((item:Interfaz_contenido)=>{
      var descrip="";
      var descrip2="";

         if(((item.descripcion.length)-65)>300)
         {
            descrip=item.descripcion.substring(65,300);
         }
         else if(((item.descripcion.length)-65)>250)
         {
           descrip=item.descripcion.substring(65,250);
         }

         else if(((item.descripcion.length)-65)>200)
         {
           descrip=item.descripcion.substring(65,200);
         }
         else if(((item.descripcion.length)-65)>150)
         {
           descrip=item.descripcion.substring(65,150);
         }
         descrip2=descrip.charAt(0).toUpperCase()+descrip.slice(1);
         this.listaobjetivo.push(item);
         this.listaobjetivo[0].descripcion=descrip2;
    });
    
    listamisionaux.forEach((item:Interfaz_contenido)=>{
      var descrip="";
      var descrip2="";

         if(((item.descripcion.length)-65)>300)
         {
            descrip=item.descripcion.substring(65,300);
         }
         else if(((item.descripcion.length)-65)>250)
         {
           descrip=item.descripcion.substring(65,250);
         }

         else if(((item.descripcion.length)-65)>200)
         {
           descrip=item.descripcion.substring(65,200);
         }
         else if(((item.descripcion.length)-65)>150)
         {
           descrip=item.descripcion.substring(65,150);
         }
         descrip2=descrip.charAt(0).toUpperCase()+descrip.slice(1);
         this.listamision.push(item);
         this.listamision[0].descripcion=descrip2;
         
         

    });


    listavisionaux.forEach((item:Interfaz_contenido)=>{
      var descrip="";
      var descrip2="";

         if(((item.descripcion.length)-65)>300)
         {
            descrip=item.descripcion.substring(65,300);
         }
         else if(((item.descripcion.length)-65)>250)
         {
           descrip=item.descripcion.substring(65,250);
         }

         else if(((item.descripcion.length)-65)>200)
         {
           descrip=item.descripcion.substring(65,200);
         }
         else if(((item.descripcion.length)-65)>150)
         {
           descrip=item.descripcion.substring(65,150);
         }
         descrip2=descrip.charAt(0).toUpperCase()+descrip.slice(1);
         this.listavision.push(item);
         this.listavision[0].descripcion=descrip2;
    });

  }


  opcion_seleccionado()
  {

      this.router.navigate(['/principal/nosotros']);

  }
}
