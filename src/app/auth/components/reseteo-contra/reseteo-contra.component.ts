import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeLoginComponent } from '../mensaje-login/mensaje-login.component';
import { ActivatedRoute, Params, Router } from '@angular/router'

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
  token:string="";

  constructor(private _path:PathImagenesService,private recuperar:FormBuilder, public snackBar:MatSnackBar,private rutaActiva: ActivatedRoute
              ,private router:Router,private login:GeneralLoginService) {
    this.pathavatarperfil=this._path.pathavatarperfil;
    this.myform=recuperar.group({
      nueva:['',Validators.required],
      confir:['',Validators.required]
    });
    this.token=rutaActiva.snapshot.params.token;
    console.log(this.token);
    
   }

  ngOnInit(): void {
  }

  GuardarContrase(){
    var nueva=this.myform.get('nueva')?.value;
    var conf=this.myform.get('confir')?.value;

    if(nueva.length==0 || conf.length==0){
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
    var contra=nueva as string;
    let json={credenciales:{token:this.token,contrasena:contra}}
    this.login.recuperacionPassword(json).
    subscribe((res:any)=>{
       console.log(res);
      if(res.estado==true)
      {
        this.snackBar.openFromComponent(MensajeLoginComponent,{
          data:{
            titulo:'Success.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'success'
          },
          duration:1500,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'success'     
        });
        this.router.navigate(['/auth/login']);
        return;
      }

      if(res.estado==false)
      {
        this.snackBar.openFromComponent(MensajeLoginComponent,{
          data:{
            titulo:'Error.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'warning'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'error'     
        });
        this.router.navigate(['/auth/login']);
        return;

      }

    });

  }

}
