import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregrado-pagina',
  templateUrl: './pregrado-pagina.component.html',
  styleUrls: ['./pregrado-pagina.component.css']
})
export class PregradoPaginaComponent implements OnInit {
  piepagina="Flotante";
  pregrado="P";
  constructor() { sessionStorage.setItem('isRedirected','true');}

  ngOnInit(): void {
  }

}
