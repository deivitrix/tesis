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

  cedula:string;
  loading=true;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];

  constructor(private _funcionalidad:GeneralFuncionalidadService,private route:Router,private cdRef: ChangeDetectorRef) {
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
   }

  ngOnInit(): void {
    this.getfuncionalidad();
  }
  getfuncionalidad(){
    this._funcionalidad.getfuncionalidad(this.cedula)
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
