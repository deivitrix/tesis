import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { ImagenSolicitudes } from 'src/app/models/imagensolicitudes';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';


//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';
import { GalleriaComponent } from '../galleria/galleria.component';

@Component({
  selector: 'app-cambiar-logo-solicitudes',
  templateUrl: './cambiar-logo-solicitudes.component.html',
  styleUrls: ['./cambiar-logo-solicitudes.component.css']
})
export class CambiarLogoSolicitudesComponent implements OnInit {
// formGroup
myform:FormGroup;

//listaSolicitudes
lista:any[]=[];
listaaux:any[]=[];


loading=true;
verificar=true;

//id imagen_solicitudes
id=0;

//usuario
usuario_id:string="";


//path imagen
pathimagendefecto="";

//boton
botonguardar=false;

botonsubir=false;
botoneliminarcard=false;

//url_ escoger
url_escoger="";
//data
data:any={id:0,url_escoger:this.url_escoger};

constructor(private ingresar:FormBuilder,private _general:GeneralService,
  private _pathimagenes:PathImagenesService,public snackBar:MatSnackBar,
  private _login:GeneralLoginService, public dialog: MatDialog,
  private _solicitudes:SolicitudesService,
  private convenios:ConveniosServicesService,
  private router:Router,
  ) { 
  this.myform=ingresar.group({
    iimagenescon_id:0,
    imagenes_solicitudes:[""],
  });
  this.pathimagendefecto=_pathimagenes.pathimagendefecto;
  var id;
  id=localStorage.getItem("id_personal") as string;  
  this.usuario_id=id;
}

ngOnInit(): void {
  this.getimagenes()
}


getimagenes(){
  this._solicitudes.getimagensolicitudes()
  .subscribe((res:any)=>{
    this.listaaux=[];
    this.listaaux=res;
    this.loading=false;
    
    if(res.estado==true)
    {
      this.myform.patchValue({
        iimagenescon_id:res.imagen.id,
        imagenes_solicitudes:res.imagen.url_imagen
      })

    }
    else{
      this.myform.patchValue({
        imagenes_solicitudes:this._pathimagenes.pathimagendefecto
      })
    }
    
  })
}


//modelo
get imagen(){
  return this.myform.get('imagenes_solicitudes') as FormArray;
}

getImagen(index:number)
{
  var url=this.imagen.controls[index].value.logo;
  return url;

}



fileEvent(event:any)
{
  const boton=this.myform;
  const i=this.myform.get('imagenes_solicitudes') as FormArray;
  const foto=new Image();
  const archivoCapturado=event.target.files[0]; 
  const general=this._general;
  const solicitudes=this._solicitudes;
  const convenios=this.convenios;
  if(archivoCapturado.type=='image/png'|| archivoCapturado.type=='image/jpeg')
  {
   let base=this.toBase64(archivoCapturado);
   base.then((imagen1:any)=>{
    foto.src=imagen1;
    foto.onload=function(){
      const imgWidth = foto.naturalWidth;
      const imgHeight = foto.naturalHeight;
      
      if(imgWidth==450&&imgHeight==500)
      {
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title: 'Esta seguro que desea subir la imagen...??',
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Subir',
          denyButtonText: `No Subir`,
         
        }).then((result)=>{

          if(result.isConfirmed)
          {
             boton.patchValue({
               botonsubir:true,
               botoneliminar:true,
               escoger:true,
             });
             const formData = new FormData();
             formData.append('img', archivoCapturado);
             solicitudes.subirImagenSolicitudesftp(formData)
             .subscribe((res:any)=>{
             // console.log(res);
               if(res.estado==true)
               { 
                  var url=res.imagen;
                  let json={data:{nombre:archivoCapturado.name,url_imagen:res.imagen}};
                  convenios.addimagenconvenio(json)
                  .subscribe((res:any)=>{
                    if(res.estado==true)
                    {
                      Swal.fire({
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        },
                        title:'Se subio la imagen con exito',
                        icon:'success'
                      });
                      boton.patchValue({
                        botonsubir:false,
                        botoneliminar:false,
                        escoger:false
                      });

                    }
                  })
                  
                 
               }

             });
          }
          else if(result.isDenied)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title:'Se cancelo la operacion',
              icon:'warning'
            })
          }

        })


         
           
      }
      else
      {
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title:'Error.. Solo se puede subir imagenes de dimensiones 450x500 pixeles',
          icon:'warning'
        });
        return;
         
      }
    }
   
   });

  }
  else
  {
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

// escoger la imagenes ya subidas
// escoger(id:number){
// this.data={id:0,url_escoger:this.url_escoger};

// const dialogRef=this.dialog.open(GalleriaComponent,{
//   width:'700px',
//   data:{titulo:'Galeria',url:this.data}
// });

// dialogRef.afterClosed().subscribe(result => {
//   console.log('The dialog was closed');
//   if(result!=null)
//   {
//       if(result.url_escoger.length!=0){

//         this.imagen.controls[id].patchValue({
//           imagenescon_id:result.id,
//           imagenes_solicitudes:result.url_escoger
//         });
//       }
//   }
// });
// }

  // escoger la imagenes ya subidas
  escoger2(id:number){
  
    this.data={id:0,url_escoger:this.url_escoger};
    
    const dialogRef=this.dialog.open(GalleriaComponent,{
      width:'700px',
      data:{titulo:'Galeria Escudos',url:this.data}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
        
          if(result.url_escoger.length!=0){
            this.myform.patchValue({
              iimagenescon_id:result.id,
              imagenes_solicitudes:result.url_escoger
            });
          }
        }
      });
    }

//botones

// guardar(){
  
//     //console.log(this.imagen.length);
    
//   for(var i=0;i<this.imagen.length;i++)
//   {
//     if(this.imagen.controls[i].value.id==0)
//     {
//       if(this.imagen.controls[i].value.logo==this.pathimagendefecto)
//       {
//         this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
//           data:{
//             titulo:'Error.....',
//             mensaje:"Ingresar una imagen",
//            buttonText:'',
//            icon:'warning'
//           },
//           duration:1000,
//           horizontalPosition:'end',
//           verticalPosition:'bottom',
//           panelClass:'error'
//         });
//         return;

//       }

      

//     }
    
//   }

//   Swal.fire({
//     showClass: {
//       popup: 'animate__animated animate__fadeInDown'
//     },
//     hideClass: {
//       popup: 'animate__animated animate__fadeOutUp'
//     },
//     title: 'Esta seguro que desea Guardar...??',
//     icon: 'warning',
//     showDenyButton: true,
//     showCancelButton: true,
//     confirmButtonText: 'Guardar',
//     denyButtonText: `No guardar`,
   
//   }).then((result)=>{
//     if(result.isConfirmed)
//     {
//       this.botonguardar=true;
//       this.myform.patchValue({
//         botonsubir:true,
//         botoneliminar:true,
//       });
//       if(this.myform.get('imagenescon_id')?.value.length==0){
//         Swal.fire({
//           showClass: {
//             popup: 'animate__animated animate__fadeInDown'
//           },
//           hideClass: {
//             popup: 'animate__animated animate__fadeOutUp'
//           },
//           title:'Debe existir informacion para guardar',
//           icon:'warning'
//         });
//         this.botonguardar=false;
//         this.myform.patchValue({
//           botonsubir:false,
//           botoneliminar:false,
//         });
//         return;
//       }
//       let json={data:this.myform.value}
//       this._solicitudes.updatelogo(json)
//       .subscribe((res:any)=>{
//         if(res.estado==true)
//         {
//           Swal.fire({
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             },
//             title:'Se modifico el carrosel con exito!!....',
//             icon:'success'
//           });
//           this.botonguardar=false;
//           this.myform.patchValue({
//             botonsubir:false,
           
//           });
          
//             //this.loading=true;
//            this.getimagenes()
//           return;
//         }
//       })
   

      

//     }
//     else if(result.isDenied)
//     {
//       Swal.fire({
//         showClass: {
//           popup: 'animate__animated animate__fadeInDown'
//         },
//         hideClass: {
//           popup: 'animate__animated animate__fadeOutUp'
//         },
//         title:'Se cancelo la operacion',
//         icon:'warning'
//       })
//       return;
//     }
//   })

// }

guardar2(){

  if(this.myform.get('imagenes_solicitudes')?.value.length==0 )
  {
   this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
     data:{
       titulo:'Error.....',
       mensaje:'Datos Faltantes......!!!',
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
 
  Swal.fire({
   showClass: {
     popup: 'animate__animated animate__fadeInDown'
   },
   hideClass: {
     popup: 'animate__animated animate__fadeOutUp'
   },
   title: 'Esta seguro que desea Guardar...??',
   icon: 'warning',
   showDenyButton: true,
   showCancelButton: true,
   confirmButtonText: 'Guardar',
   denyButtonText: `No guardar`,
  
 }).then((result)=>{
   if(result.isConfirmed)
   {
     this.botonguardar=true;
      this.myform.patchValue({
        botonsubir:true,
        botoneliminar:true,
      });
      let json={data:this.myform.value};

     this._solicitudes.updatelogo(json)
     .subscribe((res:any)=>{
       this.botonguardar=false;
  
       if(res.estado==true)
       {
         Swal.fire({
           showClass: {
             popup: 'animate__animated animate__fadeInDown'
           },
           hideClass: {
             popup: 'animate__animated animate__fadeOutUp'
           },
           title:res.mensaje,
           icon:'success'
         });
         this.getimagenes()
         return;


       }
       else
       {
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
       

     })
           

   }
   else if(result.isDenied)
   {
     Swal.fire({
       showClass: {
         popup: 'animate__animated animate__fadeInDown'
       },
       hideClass: {
         popup: 'animate__animated animate__fadeOutUp'
       },
       title:'Se cancelo la operacion',
       icon:'warning'
     })
     return;

   }
 })



 }

cancelar(){
  Swal.fire({
    title:'Cancelacion de logo de los pdf',
    text:'Desea cancelar la operación',
    icon:'warning',
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si deseo salir'
  }).then((result)=>{
    if (result.value) {
      Swal.fire({
        title:'Redireccionamiento',
        text:'Redireccionaniento',
        icon:'success',
      });
      this.router.navigate(['/utmricb/configuracionavanzada/registroActividades']);
 
      
    }

  });


}

}
