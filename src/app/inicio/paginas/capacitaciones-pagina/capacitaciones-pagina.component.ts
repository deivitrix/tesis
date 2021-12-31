import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-capacitaciones-pagina',
  templateUrl: './capacitaciones-pagina.component.html',
  styleUrls: ['./capacitaciones-pagina.component.css']
})
export class CapacitacionesPaginaComponent implements OnInit {
  pathpaginacapacitaciones:string;
  piepagina="Flotante";
  capacitacion="C";
  constructor(private _pathimagenes:PathImagenesService) { 
    this.pathpaginacapacitaciones=this._pathimagenes.pathpaginacapacitaciones;
    sessionStorage.setItem('isRedirected','true');
  }
  
  ngOnInit(): void {
  }

}
