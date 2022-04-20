import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-solicitudes',
  templateUrl: './logo-solicitudes.component.html',
  styleUrls: ['./logo-solicitudes.component.css']
})
export class LogoSolicitudesComponent implements OnInit {

  id_personal:string;
  
  constructor() {var id;
    id=localStorage.getItem("id_personal") as string;  
    this.id_personal=id; }

  ngOnInit():void {
  }

}
