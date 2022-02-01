import { RelojService } from './../../../services/reloj/reloj.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { valorReloj } from 'src/app/models/reloj/reloj';

@Component({
  selector: 'app-home-pagina',
  templateUrl: './home-pagina.component.html',
  styleUrls: ['./home-pagina.component.css']
})
export class HomePaginaComponent implements OnInit {
  datos$!: Observable<valorReloj>;
  hora!: number;
  minutos!: string;
  dia!: string;
  fecha!: string;
  ampm!: string;
  segundos!: string;

  constructor(private segundo:RelojService) { 

  }

  ngOnInit(): void {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
  }

}
