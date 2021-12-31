import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-navb1-inicio',
  templateUrl: './navb1-inicio.component.html',
  styleUrls: ['./navb1-inicio.component.css']
})
export class Navb1InicioComponent implements OnInit {

  pathfacebook:string;
  pathtwitter:string;
  pathinstragram:string;
  pathHome:string;
  pathEntrar:string;
  constructor(private _pathimagenes:PathImagenesService, private router:Router) { 
    this.pathfacebook=this._pathimagenes.path;
    this.pathtwitter=this._pathimagenes.pathtwiter;
    this.pathinstragram=this._pathimagenes.pathin;
    this.pathHome=this._pathimagenes.pathhome;
    this.pathEntrar=this._pathimagenes.pathentrar;
  }
  ngOnInit(): void {
  }
  opcion_login(){
    this.router.navigate(['/auth/login'])
  }
}
