import { Component, OnInit } from '@angular/core';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';

@Component({
  selector: 'app-nabvarmovilidad',
  templateUrl: './nabvarmovilidad.component.html',
  styleUrls: ['./nabvarmovilidad.component.css']
})
export class NabvarmovilidadComponent implements OnInit {

  public id!:string;
  loading=true;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];

  constructor(private _funcionalidad:GeneralFuncionalidadService) 
  {
    this.id= localStorage.getItem("id_personal") as string; 

  }

  ngOnInit(): void {
    this.getfuncionalidad()
  }

  getfuncionalidad(){
    this._funcionalidad.getfuncionalidad(this.id)
   .subscribe((res:any) => {
     //console.log(res.data);
     this.loading=false;
     this.listafuncionalidadaux=res.data;
     this.verificarFuncionalidad(this.listafuncionalidadaux)
   });
  }

  verificarFuncionalidad(original:FuncionalidadUsuario[])
  {
    original.forEach((item:FuncionalidadUsuario)=>{

      if(item.estado=="A")
      {
        if(item.funcionalidad[0].estado=="A")
        {
          this.listafuncionalidad.push(item)
 
        }
      }
    });
    //this.cdRef.markForCheck();
  //console.log(this.listafuncionalidad[0].funcionalidad[0]);
  
  }

}
