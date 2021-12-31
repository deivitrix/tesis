import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-becas-pagina',
  templateUrl: './becas-pagina.component.html',
  styleUrls: ['./becas-pagina.component.css']
})
export class BecasPaginaComponent implements OnInit {
 piepagina="Flotante";
  constructor() {
    sessionStorage.setItem('isRedirected','true');
   }

  ngOnInit(): void {
  }

}
