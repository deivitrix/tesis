import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';

@Component({
  selector: 'app-subir-convenios-pagina',
  templateUrl: './subir-convenios-pagina.component.html',
  styleUrls: ['./subir-convenios-pagina.component.css']
})
export class SubirConveniosPaginaComponent implements OnInit {
  cedula:string;
  loading=true;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];

  constructor(private _funcionalidad:GeneralFuncionalidadService,private route:Router) { 
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
    var verificar=false;
    this.listafuncionalidad.forEach((item:FuncionalidadUsuario)=>{

      if(item.funcionalidad[0].funcionalidad=='subirconvenios')
      {
       verificar=true;
        
      }
    });

    if(verificar==false)
    {
      this.route.navigate(['/utmricb/convenios/mostrarconvenios']);

    }
    
    
  }
}
