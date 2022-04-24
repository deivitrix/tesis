import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';

@Component({
  selector: 'app-editarsolicitudes-becas',
  templateUrl: './editarsolicitudes-becas.component.html',
  styleUrls: ['./editarsolicitudes-becas.component.css']
})
export class EditarsolicitudesBecasComponent implements OnInit {
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
    this.verificar=false;
    this.listafuncionalidad.forEach((item:FuncionalidadUsuario)=>{

      if(item.funcionalidad[0].funcionalidad=='Editar Solicitud Becas')
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
