import { Interfaz_contenido } from './../../../models/Interfaz_contenido.model';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/generalget/general.service';

@Component({
  selector: 'app-objetivomision',
  templateUrl: './objetivomision.component.html',
  styleUrls: ['./objetivomision.component.css']
})
export class ObjetivomisionComponent implements OnInit {
  listainterfaz:Interfaz_contenido[]=[];
  listaobjetivo:Interfaz_contenido[]=[];
  listamision:Interfaz_contenido[]=[];
  loading=true;
  verificar=true;
  constructor(private _general:GeneralService) { }

  ngOnInit(): void {
    this.getPaginas();
  }

  getPaginas(){
    this._general.getTipoPagina("Nosotros")
    .subscribe((res:any) => {
      this.listainterfaz=res;
      this.loading=false;
      // console.log(this.listainterfaz);
      this.separarObjetivo(this.listainterfaz);
     
    })
  }

  separarObjetivo(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Objetivo-Mision"){
         if(item.nombre=="Mision")
         {
           if(item.estado=="A"){
            this.listamision.push(item);
           }
          
         }

         if(item.nombre=="Objetivo General")
         {
          if(item.estado=="A"){ 
            this.listaobjetivo.push(item);
          }
         }
      }
    });

    
  }
}
