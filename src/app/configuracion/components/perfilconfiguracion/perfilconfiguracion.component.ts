
import { MensajeconfiguracionComponent } from './../mensajeconfiguracion/mensajeconfiguracion.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario/usuario_model';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import { Router } from '@angular/router';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

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
  loading=false;
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
      estado:['',Validators.required],
      foto:[''],
      fotoarchivo:[new File([""],"")],
      botonsubir:[false],
      botonguardar:[false],
      subir:false
    });
   

  }

  ngOnInit(): void {
    this.getusuario();
   
    
  }
  getusuario(){
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
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
        estado:this.datosUsuario[0].estado,
        foto:this.datosUsuario[0].foto
      });
    });
  }
  fileEvent(event:any)
  {
   this.verificar=true;
   const archivoCapturado=event.target.files[0];
  //  this.archivofoto=archivoCapturado;
   const foto=new Image();
   const boton=this.myForm;
   if(archivoCapturado.type=='image/png'|| archivoCapturado.type=='image/jpeg')
    { 
      let base=this.toBase64(archivoCapturado);
      base.then((imagen1:any)=>{
        foto.src=imagen1;
        foto.onload=function(){
          const imgWidth = foto.naturalWidth;
          const imgHeight = foto.naturalHeight;
          if(imgWidth==1200&&imgHeight==1200)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title: 'Esta seguro que desea esta la imagen...??',
              icon: 'warning',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              denyButtonText: `No Aceptar`,
             
            }).then((result)=>{
              if(result.isConfirmed)
              {
                 var toBase64 = (file: File) => new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = error => reject(error);
                });
                const fotobase64=toBase64(archivoCapturado);
                fotobase64.then((imagen2:any)=>{
                  boton.patchValue({
                    fotoarchivo:archivoCapturado,
                    foto:imagen2,
                    subir:true
                  });
                });
              }
            })

          }
         else{
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Error.. Solo se puede subir imagenes de dimensiones 1200x1200 pixeles',
            icon:'warning'
          });
          return;
         }

        }

      })

    }
    else{
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        title:'Error.. Solo se puede subir imagenes',
        icon:'warning'
      });
      return;
    }
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
     
    if(this.myForm.get('nombres')?.hasError('required') || this.myForm.get('apellidos')?.hasError('required') || 
    this.myForm.get('correo')?.hasError('required') || this.myForm.get('genero')?.hasError('required') || this.myForm.get('telefono')?.hasError('required') )
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

    var verificar=this.comprobarTelefono(this.myForm.get('telefono')?.value);
    if(verificar==true)
    {
      if(this.myForm.get('telefono')?.value.length==10 || this.myForm.get('telefono')?.value.length==9)
      {

        if(this.myForm.get('subir')?.value==true)
        {
          const formData = new FormData();
          formData.append('img_user', this.myForm.get('fotoarchivo')?.value);
          this._usuario.updateusuarioimagen(formData)
          .subscribe((res:any)=>{

            if(res.estado==true)
            {
              this.myForm.patchValue({
                foto:res.imagen
              });
            }
            else{
              Swal.fire({
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                title:res.mensaje,
                icon:'warning'
              });
              return;

            }

          });

        


        }
        this.loading=true;
        this.actualizardatos();
      }
      else
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:'Ingresar el numero correcto de digitos',
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
    else
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'En el campo telefono solo van numeros',
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

  comprobarTelefono(telefono:string)
  {
    var datos=telefono;
    var valoresAceptados = /^[0-9]+$/;
    if (datos.match(valoresAceptados)){
      return true;
      } else {
        return false;
      }

  }
  
  actualizardatos(){
    this.datos.id=this.myForm.get('id')?.value;
    this.datos.cedula=this.myForm.get('cedula')?.value;
    this.datos.nombres=this.myForm.get('nombres')?.value;
    this.datos.apellidos=this.myForm.get('apellidos')?.value;
    this.datos.correo=this.myForm.get('correo')?.value;
    this.datos.telefono=this.myForm.get('telefono')?.value;
    this.datos.genero=this.myForm.get('genero')?.value;
    this.datos.foto=this.myForm.get('foto')?.value;


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
