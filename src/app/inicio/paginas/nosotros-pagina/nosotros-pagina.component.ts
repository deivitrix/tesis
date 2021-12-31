import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros-pagina',
  templateUrl: './nosotros-pagina.component.html',
  styleUrls: ['./nosotros-pagina.component.css']
})
export class NosotrosPaginaComponent implements OnInit {
  piepagina="Normal";
  constructor() {
    sessionStorage.setItem('isRedirected','true');
   }

  ngOnInit(): void {
  }

}
