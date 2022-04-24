import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionalidadUsuario } from 'src/app/models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from 'src/app/services/funcionalidad/general-funcionalidad.service';

@Component({
  selector: 'app-ingresar-convenios-paginas',
  templateUrl: './ingresar-convenios-paginas.component.html',
  styleUrls: ['./ingresar-convenios-paginas.component.css']
})
export class IngresarConveniosPaginasComponent implements OnInit {
  id:string;
  loading=true;
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];

  constructor(private _funcionalidad:GeneralFuncionalidadService,private route:Router) { 
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
    var verificar=false;
    this.listafuncionalidad.forEach((item:FuncionalidadUsuario)=>{

      if(item.funcionalidad[0].funcionalidad=='Ingresar Convenios')
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
