
import { MensajeconfiguracionComponent } from './../mensajeconfiguracion/mensajeconfiguracion.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario/usuario_model';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfilconfiguracion',
  templateUrl: './perfilconfiguracion.component.html',
  styleUrls: ['./perfilconfiguracion.component.css']
})
export class PerfilconfiguracionComponent implements OnInit {
  
  archivofoto:File=new File([""],"");
  myForm:FormGroup;
  cedula:string;
  foto="";
  modeSelect="";
  datosUsuario:Usuario[]=[];
  loading=true;
  verificar=false;
  datos:Usuario={id:0,cedula:"",nombres:"",apellidos:"",genero:"",telefono:"",correo:"",estado:"",foto:""};

  constructor(private editar:FormBuilder,private _login:GeneralLoginService,public snackBar:MatSnackBar,
    private _usuario:UsuarioServicesService,private router:Router) { 
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
      estado:['',Validators.required]
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
        genero:this.datosUsuario[0].genero,
        estado:this.datosUsuario[0].estado
      });

     
      
    });
  }
  fileEvent(event:any)
  {
   this.verificar=true;
   const archivoCapturado=event.target.files[0];
   this.archivofoto=archivoCapturado;
   let base=this.toBase64(archivoCapturado);
   base.then((imagen:any)=>{
     this.foto=imagen;
   });
  console.log(this.archivofoto);
  
   
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
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
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
      // if(this.verificar==true)
      // {
      //   //subir la foto
      //   console.log('subir foto');
      // }
      // else
      // {
      //   //conservar la foto
      //   console.log('Conservar la foto');
      // }

    if(this.myForm.get('nombres')?.hasError('required') || this.myForm.get('apellidos')?.hasError('required') || 
    this.myForm.get('correo')?.hasError('required') || this.myForm.get('genero')?.hasError('required') )
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

    this.actualizardatos();
    

  }
  
  actualizardatos(){
    this.datos.id=this.myForm.get('id')?.value;
    this.datos.cedula=this.myForm.get('cedula')?.value;
    this.datos.nombres=this.myForm.get('nombres')?.value;
    this.datos.apellidos=this.myForm.get('apellidos')?.value;
    this.datos.correo=this.myForm.get('correo')?.value;
    this.datos.telefono=this.myForm.get('telefono')?.value;
    this.datos.genero=this.myForm.get('genero')?.value;
    this.datos.foto=this.foto;


    let json={usuario:this.datos};
    this._usuario.updateusuario(json)
    .subscribe((res:any) => {
      console.log(res);
      if(res.estado==true)
      {
        if(res.email==true)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Datos del usuario actualizado",
             buttonText:'',
             icon:'success'
            },
            duration:1000,
            horizontalPosition:'end',
            verticalPosition:'bottom',
            panelClass:'success'     
          });
          window.location.reload();
        }
        else
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Datos del usuario actualizado",
             buttonText:'',
             icon:'success'
            },
            duration:1000,
            horizontalPosition:'end',
            verticalPosition:'bottom',
            panelClass:'success'     
          });
          this._login.logout();
          this.router.navigateByUrl('/auth');


        }
        
   
      }

      

      
    });

  }
  validateEmail(email:string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }
}
