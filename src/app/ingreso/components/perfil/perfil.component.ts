import { MensajeLoginComponent } from './../../../auth/components/mensaje-login/mensaje-login.component';
import { Usuario } from './../../../models/usuario/usuario_model';
import { Component, OnInit } from '@angular/core';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  myForm:FormGroup;

  
  public archivofoto:any=[];
  cedula:string;
  foto="";
  modeSelect="";
  datosUsuario:Usuario[]=[];
  loading=true;
  verificar=false;
  
  // datos personales
  usuario:Usuario={id:0,cedula:'',nombres:'',apellidos:'',correo:'',telefono:'',genero:'',estado:'',foto:''};

  
  constructor(private editar:FormBuilder,private _login:GeneralLoginService,public snackBar:MatSnackBar) { 
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
    this.myForm=this.editar.group({
      id:[''],
      cedula:[{value:'',disabled: true},Validators.required],
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      correo:['',Validators.required],
      telefono:['',Validators.required],
      genero:['',Validators.required],
    });
   

  }

  ngOnInit(): void {
    this.getusuario();
  }
  
  getusuario(){
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
      console.log(res);
      this.datosUsuario.push(res.usuario);
      this.loading=false;
      this.foto=this.datosUsuario[0].foto;
      this.modeSelect=this.datosUsuario[0].genero;

      this.myForm.patchValue({
        id:this.datosUsuario[0].id,
        cedula:this.datosUsuario[0].cedula,
        nombres:this.datosUsuario[0].nombres,
        apellidos:this.datosUsuario[0].apellidos,
        correo:this.datosUsuario[0].correo,
        telefono:this.datosUsuario[0].telefono,
        genero:this.datosUsuario[0].genero
      });

     
      
    });
  }
  fileEvent(event:any)
  {
   this.verificar=true;
   const archivoCapturado=event.target.files[0];
   let base=this.toBase64(archivoCapturado);
   base.then((imagen:any)=>{
     this.foto=imagen;
   })
   
  }

   toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  GuardarDatos(){
    const requered=this.validateEmail(this.myForm.get('correo')?.value);
    if(requered==false)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Correo Invalido......',
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
    if(this.verificar==true)
    {
      //subir la foto
      console.log('subir foto');
    }
    else
    {
      //conservar la foto
      console.log('Conservar la foto');
    }

   

    if(this.myForm.get('nombres')?.hasError('required') || this.myForm.get('apellidos')?.hasError('required') || 
    this.myForm.get('correo')?.hasError('required') || this.myForm.get('genero')?.hasError('required') )
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

  validateEmail(email:string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

}
