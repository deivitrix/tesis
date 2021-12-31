import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-tablabiblioteca',
  templateUrl: './tablabiblioteca.component.html',
  styleUrls: ['./tablabiblioteca.component.css']
})
export class TablabibliotecaComponent implements OnInit {

  pathbibliotecavirtual:string;
  
  constructor(private _pathimagenes:PathImagenesService,) {
    this.pathbibliotecavirtual=_pathimagenes.pathbibliotecavirtual;
   }
  ngOnInit(): void {
  }

}
