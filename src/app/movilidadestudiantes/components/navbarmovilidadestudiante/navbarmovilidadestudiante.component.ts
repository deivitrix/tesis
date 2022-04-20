import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';


@Component({
  selector: 'app-navbarmovilidadestudiante',
  templateUrl: './navbarmovilidadestudiante.component.html',
  styleUrls: ['./navbarmovilidadestudiante.component.css']
})
export class NavbarmovilidadestudianteComponent implements OnInit {
  pathLogo:string;
  constructor(private imagen:PathImagenesService, private route:Router,
    private _login:GeneralLoginService) {
    this.pathLogo=this.imagen.pathlog;
   }

  ngOnInit():void {
  }
  salir(){
    this._login.logout();
    this.route.navigate(['/principal/inicio']);
  }
}
