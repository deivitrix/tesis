import { Interfaz_contenido } from './../../../models/Interfaz_contenido.model';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/generalget/general.service';

@Component({
  selector: 'app-inicio-pagina',
  templateUrl: './inicio-pagina.component.html',
  styleUrls: ['./inicio-pagina.component.css']
})
export class InicioPaginaComponent implements OnInit {
  piepagina="Normal";
  
  constructor() { 
    sessionStorage.setItem('isRedirected','true');
  }
   
  ngOnInit(): void {
    
    
  }
  
 
}
