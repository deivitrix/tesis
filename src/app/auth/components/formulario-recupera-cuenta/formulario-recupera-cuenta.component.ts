import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeLoginComponent } from '../mensaje-login/mensaje-login.component';

@Component({
  selector: 'app-formulario-recupera-cuenta',
  templateUrl: './formulario-recupera-cuenta.component.html',
  styleUrls: ['./formulario-recupera-cuenta.component.css']
})
export class FormularioRecuperaCuentaComponent implements OnInit {
  correo_usuario="";
  pathrecuperar="";
  constructor(private _path:PathImagenesService, public snackBar:MatSnackBar) { 
    this.pathrecuperar=this._path.pathrecuperarcorreo;
  }

  ngOnInit(): void {
  }
  Enviarenlace(){

    const reques=this.validateEmail(this.correo_usuario);
    if(this.correo_usuario.length==0)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Datos Faltantes',
         buttonText:'',
         icon:'warning'
        },
        duration:1000,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'     
      });
      return;

    }

    if(reques==false)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Correo electronico invalido',
         buttonText:'',
         icon:'warning'
        },
        duration:1000,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'     
      });
      return;

    }
  }

  validateEmail(email:string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

}
