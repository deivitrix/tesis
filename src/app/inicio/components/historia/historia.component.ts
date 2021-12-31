import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {

  pathLogoUTM:string;
  constructor(private _pathimagenes:PathImagenesService) {
    this.pathLogoUTM=this._pathimagenes.pathlogoutm;
   }

  ngOnInit(): void {
  }

}
