import { Router } from '@angular/router';
import { MensajeconfiguracionComponent } from './../mensajeconfiguracion/mensajeconfiguracion.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReseteoContrasena } from 'src/app/models/usuario/reseteo_contra';
import { Usuario } from 'src/app/models/usuario/usuario_model';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';

@Component({
  selector: 'app-reseteoconfiguracion',
  templateUrl: './reseteoconfiguracion.component.html',
  styleUrls: ['./reseteoconfiguracion.component.css']
})
export class ReseteoconfiguracionComponent implements OnInit {
  foto="";
  cedula:string;
  datosUsuario:Usuario[]=[];
  loading=true;
  myForm:FormGroup;
  reseteo:ReseteoContrasena={id:0,nueva_clave:'',anterior_clave:''};
  ojo1="password";
  ojo1verificacion=true;
  hide1=true;
  hide2=true;
  hide3=true;

  constructor(private editar:FormBuilder,private _login:GeneralLoginService, public snackBar:MatSnackBar,
    private _usuario:UsuarioServicesService,private router:Router ) { 
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
    this.myForm=this.editar.group({
      id:['',Validators.required],
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

      this.myForm.patchValue({
        id:this.datosUsuario[0].id,
      });
    });
  }
  GuardarDatos(){
    
    if(this.myForm.get('actual')?.hasError('required')|| this.myForm.get('nueva')?.hasError('required') ||
    this.myForm.get('confirmacion')?.hasError('required'))
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
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

    if(this.myForm.get('nueva')?.value!=this.myForm.get('confirmacion')?.value)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Contraseña nueva no coinciden',
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
    this.actulizarpasswoord();


  }

  actulizarpasswoord(){

    this.reseteo.id=this.myForm.get('id')?.value;
    this.reseteo.anterior_clave=this.myForm.get('actual')?.value;
    this.reseteo.nueva_clave=this.myForm.get('nueva')?.value;

    let json={usuario:this.reseteo}
    this._usuario.updatepassword(json)
    .subscribe((res:any) => {
      console.log(res);
      if(res.estado==false)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:res.mensaje,
           buttonText:'Contraseña',
           icon:'warning'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'error'     
        });
        return;
      }

      if(res.estado=true)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:res.mensaje,
           buttonText:'Contraseña',
           icon:'warning'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'success'     
        });
       this._login.logout();
       this.router.navigateByUrl('/auth');

      }


     
    });
    
  }

}
