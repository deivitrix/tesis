import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-recupera-cuenta',
  templateUrl: './formulario-recupera-cuenta.component.html',
  styleUrls: ['./formulario-recupera-cuenta.component.css']
})
export class FormularioRecuperaCuentaComponent implements OnInit {
  correo_usuario="";
  pathrecuperar="";
  constructor(private _path:PathImagenesService) { 
    this.pathrecuperar=this._path.pathrecuperarcorreo;
  }

  ngOnInit(): void {
  }

}
