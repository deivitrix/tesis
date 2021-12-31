import { Component, OnInit } from '@angular/core';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.css']
})
export class CaroselComponent implements OnInit {

  pathCrs:string;
  pathCrs2:string;
  listainterfaz:Interfaz_contenido[]=[];
  listacarrosel:Interfaz_contenido[]=[];

  loading=true;
  verificar=true;
  constructor(private _pathimagenes:PathImagenesService,private _general:GeneralService) { 
    this.pathCrs=this._pathimagenes.pathcrs;
    this.pathCrs2=this._pathimagenes.pathcrs2;
  }

  ngOnInit(): void {
    this.getPaginas();
  }
  getPaginas(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listainterfaz=res;
    
     this.loading=false;
     this.separarcarosel(this.listainterfaz);
    });
  }

  separarcarosel(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Carrusel")
      {
        if(item.estado=="A")
        {
          this.listacarrosel.push(item);
        } 
      }
    });



    if(this.listacarrosel.length==0)
    {
      this.verificar=false;

    }

  }

}
