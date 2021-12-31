import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-navb2-inicio',
  templateUrl: './navb2-inicio.component.html',
  styleUrls: ['./navb2-inicio.component.css']
})
export class Navb2InicioComponent implements OnInit {

  opcion1="";
  opcion2="";
  opcion3="";
  opcion4="";
  opcion5="";
  seleccionado="Inicio";
 
 pathlogo:string;
  constructor(private _pathimagenes:PathImagenesService) {
    this.pathlogo=this._pathimagenes.pathlog;
    
   }
  
  
  ngOnInit(): void {
   
  }

}
