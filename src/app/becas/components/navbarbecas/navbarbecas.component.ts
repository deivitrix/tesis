import { Component, OnInit } from '@angular/core';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';

@Component({
  selector: 'app-navbarbecas',
  templateUrl: './navbarbecas.component.html',
  styleUrls: ['./navbarbecas.component.css']
})
export class NavbarbecasComponent implements OnInit {
  public id!:string;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];
  public loading=true;

  constructor(private _funcionalidad:GeneralFuncionalidadService) { 
    this.id=localStorage.getItem("id_personal") as string;
  }

  ngOnInit(): void {
    this.getfuncionalidad();
  }

  getfuncionalidad(){
    this._funcionalidad.getfuncionalidad(this.id)
   .subscribe((res:any) => {
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
