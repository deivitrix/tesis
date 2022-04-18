import { RelojService } from './../../../services/reloj/reloj.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { valorReloj } from 'src/app/models/reloj/reloj';


@Component({
  selector: 'app-home-pagina-movilidad',
  templateUrl: './home-pagina-movilidad.component.html',
  styleUrls: ['./home-pagina-movilidad.component.css']
})
export class HomePaginaMovilidadComponent implements OnInit {
  datos$!: Observable<valorReloj>;
  hora!: number;
  minutos!: string;
  dia!: string;
  fecha!: string;
  ampm!: string;
  segundos!: string;

  loading = false;


  constructor(
    private segundo: RelojService
  ) { 
    
  }

  ngOnInit():void {
    this.gethora();
  }

  gethora() {
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe((x) => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
  }


}
