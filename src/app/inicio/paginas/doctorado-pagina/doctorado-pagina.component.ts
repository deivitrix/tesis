import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctorado-pagina',
  templateUrl: './doctorado-pagina.component.html',
  styleUrls: ['./doctorado-pagina.component.css']
})
export class DoctoradoPaginaComponent implements OnInit {
  piepagina="Flotante";
  doctorado="D";
  constructor() { 
    sessionStorage.setItem('isRedirected','true');
  }

  ngOnInit(): void {
  }

}
