import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maestria-pagina',
  templateUrl: './maestria-pagina.component.html',
  styleUrls: ['./maestria-pagina.component.css']
})
export class MaestriaPaginaComponent implements OnInit {
  piepagina="Flotante";
  maestria="M";
  constructor() {
    sessionStorage.setItem('isRedirected','true');
   }

  ngOnInit(): void {
  }

}
