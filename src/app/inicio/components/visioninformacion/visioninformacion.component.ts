import { Component, OnInit } from '@angular/core';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';

@Component({
  selector: 'app-visioninformacion',
  templateUrl: './visioninformacion.component.html',
  styleUrls: ['./visioninformacion.component.css']
})
export class VisioninformacionComponent implements OnInit {
  listainterfaz:Interfaz_contenido[]=[];
  listavision:Interfaz_contenido[]=[];
  listainformacion:Interfaz_contenido[]=[];
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
      this.separarVision(this.listainterfaz);
     
    })
  }

  separarVision(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
        if(item.interfaz.nombre=="Vision-Informacion"){
         if(item.nombre=="Vision")
         {
           if(item.estado=="A"){
            this.listavision.push(item);
           }
          
         }

         if(item.nombre=="Mas Informacion")
         {
          if(item.estado=="A"){ 
            this.listainformacion.push(item);
          }
         }
      }
    });

    
  }
}
