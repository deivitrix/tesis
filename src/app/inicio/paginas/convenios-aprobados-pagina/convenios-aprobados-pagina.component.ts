import { Component, OnInit } from '@angular/core';
import { ConveniosaprobadosService } from 'src/app/services/conveniosaprobados/conveniosaprobados.service';

@Component({
  selector: 'app-convenios-aprobados-pagina',
  templateUrl: './convenios-aprobados-pagina.component.html',
  styleUrls: ['./convenios-aprobados-pagina.component.css']
})
export class ConveniosAprobadosPaginaComponent implements OnInit {
  tipo_convenio:string;
  constructor(private _conveniosAprobados:ConveniosaprobadosService) {
    this.tipo_convenio=this._conveniosAprobados.tipo_convenio;
    sessionStorage.setItem('isRedirected','true');
   }

  ngOnInit(): void {
  }

}
