import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrarformulario-becas',
  templateUrl: './mostrarformulario-becas.component.html',
  styleUrls: ['./mostrarformulario-becas.component.css']
})
export class MostrarformularioBecasComponent implements OnInit {
  id:string;
  constructor() { 
    var id_personal;
    id_personal=localStorage.getItem("id_personal") as string;  
    this.id=id_personal;
  }

  ngOnInit():void {
  }

}
