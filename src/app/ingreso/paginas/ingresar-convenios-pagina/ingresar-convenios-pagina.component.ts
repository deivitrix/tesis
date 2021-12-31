import { Component, OnInit } from '@angular/core';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

@Component({
  selector: 'app-ingresar-convenios-pagina',
  templateUrl: './ingresar-convenios-pagina.component.html',
  styleUrls: ['./ingresar-convenios-pagina.component.css']
})
export class IngresarConveniosPaginaComponent implements OnInit {
  cedula:string;
  constructor(private _login:GeneralLoginService) { 
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
  }

  ngOnInit(): void {
    this.getusuario();
  }
  
  getusuario(){

  }
  

}
