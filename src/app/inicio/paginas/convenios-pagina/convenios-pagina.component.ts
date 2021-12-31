import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convenios-pagina',
  templateUrl: './convenios-pagina.component.html',
  styleUrls: ['./convenios-pagina.component.css']
})
export class ConveniosPaginaComponent implements OnInit {
 piepagina="Flotante";
  constructor() { 
    sessionStorage.setItem('isRedirected','true');
  }

  ngOnInit(): void {
  }

}
