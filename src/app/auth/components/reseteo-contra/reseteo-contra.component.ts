import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeLoginComponent } from '../mensaje-login/mensaje-login.component';

@Component({
  selector: 'app-reseteo-contra',
  templateUrl: './reseteo-contra.component.html',
  styleUrls: ['./reseteo-contra.component.css']
})
export class ReseteoContraComponent implements OnInit {
  pathavatarperfil="";
  hide1=true;
  hide2=true;
  myform:FormGroup;

  constructor(private _path:PathImagenesService,private recuperar:FormBuilder, public snackBar:MatSnackBar) {
    this.pathavatarperfil=this._path.pathavatarperfil;
    this.myform=recuperar.group({
      nueva:['',Validators.required],
      confir:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  GuardarContrase(){
    var nueva=this.myform.get('nueva')?.value;
    var conf=this.myform.get('confir')?.value;

    if(nueva.length==0){
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
    if(conf.length==0){
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



    if(nueva!=conf)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Contraseña nueva no coninciden',
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

}
