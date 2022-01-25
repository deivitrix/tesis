import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectormodificarpaginaprincipal',
  templateUrl: './selectormodificarpaginaprincipal.component.html',
  styleUrls: ['./selectormodificarpaginaprincipal.component.css']
})
export class SelectormodificarpaginaprincipalComponent implements OnInit {
  pagina="";

  constructor() { }

  ngOnInit(): void {
  }

  escogerPagina(event:any){
   this.pagina=event.value;
  }

}
