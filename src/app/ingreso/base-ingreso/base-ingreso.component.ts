import { FuncionalidadUsuario } from './../../models/funcionalidad/funcionalidad_usuario_model';
import { GeneralFuncionalidadService } from './../../services/funcionalidad/general-funcionalidad.service';
import { CargoModel } from './../../models/cargo-modelo/cargo_model';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


@Component({
  selector: 'app-base-ingreso',
  templateUrl: './base-ingreso.component.html',
  styleUrls: ['./base-ingreso.component.css']
})
export class BaseIngresoComponent implements OnInit {

  pathLogo:string;
  fecha_ac:string;
  fecha_op:string;
  cargo_usuario:string;
  cargos:CargoModel[]=[];
  listafuncionalidadaux:FuncionalidadUsuario[]=[];
  listafuncionalidad:FuncionalidadUsuario[]=[];
  cedula:string;
  configuracionavanzada=false;
  loading=true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    

   
  constructor(private breakpointObserver: BreakpointObserver,private imagen:PathImagenesService,
    private _login:GeneralLoginService,private _funcionalidad:GeneralFuncionalidadService, private route:Router) {  
    this.pathLogo=this.imagen.pathlog;
    this.fecha_ac="";
    this.fecha_op="";
    this.cargo_usuario="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
    this.fecha_actual();
    let isRedirected = sessionStorage.getItem('isRedirected');
    if(isRedirected=='true')
    {
      sessionStorage.setItem('isRedirected','false');
      window.location.reload();
      
    }
  }
  
  getusuariosearch(){
    this._login.getusuariosearch(this.cedula)
   .subscribe((res:any) => {
     //console.log(res.cargos.length);
     this.cargos.push(res.cargos[0]);
     this.cargo_usuario=this.cargos[0].cargo;
   });
  }

  getfuncionalidad(){
    this._funcionalidad.getfuncionalidad(this.cedula)
   .subscribe((res:any) => {
    //  console.log(res.data);
     this.listafuncionalidadaux=res.data;
     this.recorreFuncionalidad(this.listafuncionalidadaux);
   });
  }

  recorreFuncionalidad(original:FuncionalidadUsuario[])
  {
    original.forEach((item:FuncionalidadUsuario)=>{

      if(item.estado=="A")
      {
        if(item.funcionalidad[0].estado=="A"){

          this.listafuncionalidad.push(item);
          if(item.funcionalidad[0].funcionalidad=="configuracionavanzada"){
            this.configuracionavanzada=true;
          }
        }
       
      }
    });

  }

  fecha_actual(){
    var fecha=new Date();
    var day=fecha.getDate();
    var month=fecha.getMonth()+1;
    var year=fecha.getFullYear();
    var month_d;

    this.fecha_op=day+'/'+month+'/'+year;

    if(month==1){month_d="Enero";}
    else if(month==2){month_d="Febrero";}
    else if(month==3){month_d="Marzo";}
    else if(month==4){month_d="April";}
    else if(month==5){month_d="Mayo";}
    else if(month==6){month_d="Junio";}
    else if(month==7){month_d="Julio";}
    else if(month==8){month_d="Agosto";}
    else if(month==9){month_d="Septiembre";}
    else if(month==10){month_d="Octumbre";}
    else if(month==11){month_d="Noviembre";}
    else if(month==12){month_d="Diciembre";}
    
    this.fecha_ac="Hoy: " + day + " de " + month_d + " del " + year;
    // console.log(this.fecha_ac);
  }
  

  ngOnInit(): void {
    this.getusuariosearch();
    this.getfuncionalidad();
  }
  salir(){
    this._login.logout();
    this.route.navigate(['/principal/inicio']);
  }
}
