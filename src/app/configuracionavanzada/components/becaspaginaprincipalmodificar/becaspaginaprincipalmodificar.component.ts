import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-becaspaginaprincipalmodificar',
  templateUrl: './becaspaginaprincipalmodificar.component.html',
  styleUrls: ['./becaspaginaprincipalmodificar.component.css']
})
export class BecaspaginaprincipalmodificarComponent implements OnInit {
 
  pathcapacitaciones="";
  pathpregrado="";
  pathinvestigacion="";
  pathmaestria="";
  pathdoctorado="";
  constructor(private _imagen:PathImagenesService,private router:Router) { 
    this.pathcapacitaciones=this._imagen.pathimagencapacitaciones;
    this.pathpregrado=this._imagen.pathimagenpregrado;
    this.pathinvestigacion=this._imagen.pathimageninvestigacion;
    this.pathmaestria=this._imagen.pathimagenmaestria;
    this.pathdoctorado=this._imagen.pathimagendoctorado;
  }

  ngOnInit(): void {
  }

  direccionar(letra:string)
  {
    this.router.navigate(['/utmricb/configuracionavanzada/ingresarbecas/'+letra]);

  }

}
