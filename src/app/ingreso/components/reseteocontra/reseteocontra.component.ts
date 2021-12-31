import { ReseteoContrasena } from './../../../models/usuario/reseteo_contra';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario/usuario_model';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { MensajeLoginComponent } from '../mensaje-login/mensaje-login.component';

@Component({
  selector: 'app-reseteocontra',
  templateUrl: './reseteocontra.component.html',
  styleUrls: ['./reseteocontra.component.css']
})
export class ReseteocontraComponent implements OnInit {
  
  //Variables
  foto="";
  cedula:string;
  datosUsuario:Usuario[]=[];
  loading=true;
  myForm:FormGroup;
  reseteo:ReseteoContrasena={id:0,nueva_clave:'',anterior_clave:''};

  constructor(private editar:FormBuilder,private _login:GeneralLoginService, public snackBar:MatSnackBar) { 
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
    this.myForm=this.editar.group({
      actual:['',Validators.required],
      nueva:['',Validators.required],
      confirmacion:['',Validators.required]
    });

  }

  ngOnInit(): void {
    this.getusuario();
  }
  getusuario()
  {
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
      console.log(res);
      this.datosUsuario.push(res.usuario);
      this.loading=false;
      this.foto=this.datosUsuario[0].foto;
    });
  }
  GuardarDatos(){
    
    if(this.myForm.get('actual')?.hasError('required')|| this.myForm.get('nueva')?.hasError('required') ||
    this.myForm.get('confirmacion')?.hasError('required'))
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


  }

}
