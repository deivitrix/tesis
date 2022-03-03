import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movilidad-informacion',
  templateUrl: './movilidad-informacion.component.html',
  styleUrls: ['./movilidad-informacion.component.css']
})
export class MovilidadInformacionComponent implements OnInit {
  pathmovilidad:string;

  constructor(private path:PathImagenesService) { 
    this.pathmovilidad=path.pathimagenmovilidad;
    
  }

  ngOnInit(): void {
  }

}
