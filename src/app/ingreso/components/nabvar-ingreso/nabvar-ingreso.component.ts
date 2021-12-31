import { Component, OnInit } from '@angular/core';
//import { PathImagenesService } from './../services/path-imagenes.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nabvar-ingreso',
  templateUrl: './nabvar-ingreso.component.html',
  styleUrls: ['./nabvar-ingreso.component.css']
})
export class NabvarIngresoComponent implements OnInit {

  pathLogo:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

   
  constructor(private breakpointObserver: BreakpointObserver,private imagen:PathImagenesService,private _login:GeneralLoginService,private route:Router) {  
    this.pathLogo=this.imagen.pathlog;
    // window.location.reload();
  }

  

  ngOnInit(): void {
  }
  salir(){
    this._login.logout();
    this.route.navigate(['/principal/inicio']);
  }

}
