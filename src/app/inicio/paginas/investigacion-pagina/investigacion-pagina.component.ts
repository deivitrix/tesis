import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-investigacion-pagina',
  templateUrl: './investigacion-pagina.component.html',
  styleUrls: ['./investigacion-pagina.component.css']
})
export class InvestigacionPaginaComponent implements OnInit {
  pathpaginainvestigacion:string;
  piepagina="Flotante";
  investigacion="I";
  constructor(private _pathimagenes:PathImagenesService) { 
    this.pathpaginainvestigacion=this._pathimagenes.pathpaginainvestigacion;
    sessionStorage.setItem('isRedirected','true');
  }

  ngOnInit(): void {
  }

}
