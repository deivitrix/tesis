import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';

@Component({
  selector: 'app-aprobar-becas',
  templateUrl: './aprobar-becas.component.html',
  styleUrls: ['./aprobar-becas.component.css']
})
export class AprobarBecasComponent implements OnInit {
  id!:string;

  loading=true;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];

  verificar=false;


  constructor(private _funcionalidad:GeneralFuncionalidadService,private route:Router) { 
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
    this.verificar=false;
    this.listafuncionalidad.forEach((item:FuncionalidadUsuario)=>{

      if(item.funcionalidad[0].funcionalidad=='Aprobar Becas')
      {
       this.verificar=true;
        
      }
    });

    if(this.verificar==false)
    {
      this.route.navigate(['/utmricb/becas/mostrarbecas']);

    }
    
    
  }
  

}
