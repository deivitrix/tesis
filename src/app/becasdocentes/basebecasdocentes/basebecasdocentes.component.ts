import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-basebecasdocentes',
  templateUrl: './basebecasdocentes.component.html',
  styleUrls: ['./basebecasdocentes.component.css']
})
export class BasebecasdocentesComponent implements OnInit {

  
  pathLogo:string;
  fecha_ac:string;
  fecha_op:string;
  id_personal:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,private imagen:PathImagenesService,
    private _login:GeneralLoginService, private route:Router) {
      this.pathLogo=this.imagen.pathlog;
      this.fecha_ac="";
      this.fecha_op="";
   
      var id;
      id=localStorage.getItem("id_personal") as string;  
      this.id_personal=id;
      this.fecha_actual();
      let isRedirected = sessionStorage.getItem('isRedirected');
      if(isRedirected=='true')
      {
        sessionStorage.setItem('isRedirected','false');
        window.location.reload();
        
      }
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
    setInterval(()=>{
      this.salir();
    },900000);
  }
  salir(){
    this._login.logout();
    this.route.navigate(['/principal/inicio']);
  }
}
