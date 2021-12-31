import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bibliotecavirtual-pagina',
  templateUrl: './bibliotecavirtual-pagina.component.html',
  styleUrls: ['./bibliotecavirtual-pagina.component.css']
})
export class BibliotecavirtualPaginaComponent implements OnInit {
  piepagina="Flotante";
  constructor() { 
    sessionStorage.setItem('isRedirected','true');
  }

  ngOnInit(): void {
  }

}
