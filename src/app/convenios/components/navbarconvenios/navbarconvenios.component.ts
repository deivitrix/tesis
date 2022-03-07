import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';


@Component({
  selector: 'app-navbarconvenios',
  templateUrl: './navbarconvenios.component.html',
  styleUrls: ['./navbarconvenios.component.css'],
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarconveniosComponent implements OnInit {

  id:string;
  loading=true;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];

  constructor(private _funcionalidad:GeneralFuncionalidadService,private route:Router,private cdRef: ChangeDetectorRef) {
    var id_personal;
    id_personal=localStorage.getItem("id_personal") as string;  
    this.id=id_personal;
   }

  ngOnInit(): void {
    this.getfuncionalidad();
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
