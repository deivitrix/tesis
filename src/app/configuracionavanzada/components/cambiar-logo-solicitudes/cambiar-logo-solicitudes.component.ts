import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-cambiar-logo-solicitudes',
  templateUrl: './cambiar-logo-solicitudes.component.html',
  styleUrls: ['./cambiar-logo-solicitudes.component.css']
})
export class CambiarLogoSolicitudesComponent implements OnInit {
  loading=true;
  verificar=true;
  //usuario
  usuario_id:string="";
  //path imagen
  pathimagendefecto="";

  //boton
  botonguardar=false;

  botonsubir=false;
  botoneliminarcard=false;

  constructor() { 
    
    var id;
    id=localStorage.getItem("id_personal") as string;  
    this.usuario_id=id;
  }

  ngOnInit():void {
  }

}
