
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { ImagenSolicitudes } from 'src/app/models/escudo-solicitudes/imagensolicitudes';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

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
  
  loading=true;
  verificar=true;
  //usuario
  usuario_id:string="";
  //path imagen
  pathimagendefecto="";

  //boton
  botonguardar=false;
  botonsubir=false;
  botoneliminarcard=false;

  lista:ImagenSolicitudes[]=[];
  listaaux:ImagenSolicitudes[]=[];

    //url_ escoger
url_escoger="";
//data
data:any={id:0,url_escoger:this.url_escoger};

  constructor(private ingresar:FormBuilder,
    private _general:GeneralService,
    private _solicitudes:SolicitudesService,
     private _pathimagenes:PathImagenesService,
    public snackBar:MatSnackBar,
    private _login:GeneralLoginService, public dialog: MatDialog

    ) { 
    this.myform=ingresar.group({
    imagen:ingresar.array([]),
    eliminar:ingresar.array([]),
    botonsubir:false,
    botoneliminar:false,
    escoger:false
  });

  var id;
  id=localStorage.getItem("id_personal") as string;  
  this.usuario_id=id;
}

  ngOnInit():void {
    this.getimagenes()
  }

  getimagenes(){
    this._solicitudes.getimagenesconvenios()
    .subscribe((res:any)=>{
      this.listaaux=res;
      this.loading=false;
      this.separarlista(this.listaaux);
    })
  }

  separarlista(original:ImagenSolicitudes[])
  {
    original.forEach((item:ImagenSolicitudes)=>{
      if(item.estado=="A")
      {
        this.lista.push(item);

      }
    })

  }




  //modelo
  get imagen(){
    return this.myform.get('imagen') as FormArray;
  }

  get eliminar(){
    return this.myform.get('eliminar') as FormArray;
  }
  getImagen(index:number)
  {
    var url=this.imagen.controls[index].value.urlimagen;
    return url;

  }


  // escoger la imagenes ya subidas
  escoger(id:number){
    this.data={id:0,url_escoger:this.url_escoger};
    
    const dialogRef=this.dialog.open(GalleriaComponent,{
      width:'700px',
      data:{titulo:'Galeria Convenios',url:this.data}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
          if(result.url_escoger.length!=0){
  
            this.imagen.controls[id].patchValue({
              id_imagen:result.id,
              urlimagen:result.url_escoger
            });
          }
      }
     
      
    });
    }


    fileEvent(event:any,id:number)
  {
    const boton=this.myform;
    const i=this.myform.get('imagen') as FormArray;
    const foto=new Image();
    const archivoCapturado=event.target.files[0]; 
    const solicitudes=this._solicitudes;
    if(archivoCapturado.type=='image/png'|| archivoCapturado.type=='image/jpeg')
    {
     let base=this.toBase64(archivoCapturado);
     base.then((imagen1:any)=>{
      foto.src=imagen1;
      foto.onload=function(){
        const imgWidth = foto.naturalWidth;
        const imgHeight = foto.naturalHeight;
        
        if(imgWidth==1200&&imgHeight==500)
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
                    solicitudes.addimageneslogo(json)
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
            title:'Error.. Solo se puede subir imagenes de dimensiones 1200x500 pixeles',
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

  guardar(){
  for(var i=0;i<this.imagen.length;i++)
  {
    if(this.imagen.controls[i].value.id==0)
    {
      if(this.imagen.controls[i].value.urlimagen==this.pathimagendefecto)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar una imagen",
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

      if(this.imagen.controls[i].value.nombre.length==0 || this.imagen.controls[i].value.descripcion.length==0 )
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Faltas datos!!!!",
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
      if(this.imagen.controls[i].value.nombre.length==0 || this.imagen.controls[i].value.descripcion.length==0 )
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Faltas datos!!!!",
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
      if(this.myform.get('imagen')?.value.length==0&&this.myform.get('eliminar')?.value.length==0){
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title:'Debe existir informacion para guardar',
          icon:'warning'
        });
        this.botonguardar=false;
        this.myform.patchValue({
          botonsubir:false,
          botoneliminar:false,
        });
        return;
      }
      let json={data:this.myform.value}
      this._solicitudes.updatelogo(json)
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
            title:'Se modifico el carrosel con exito!!....',
            icon:'success'
          });
          this.botonguardar=false;
          this.myform.patchValue({
            botonsubir:false,
            botoneliminar:false,
          });
          while(this.imagen.controls.length!=0){
            for(var i=0;i<this.imagen.controls.length;i++)
            {
              this.imagen.removeAt(i);
            }
  
            }
            while(this.eliminar.controls.length!=0)
            {
              for(var i=0;i<this.eliminar.controls.length;i++)
              {
                this.eliminar.removeAt(i);
              }
  
            }
            this.loading=true;
        
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
      title:"Cancelar la operacion de la imagen del pdf",
      text:'Desea cancelar la operacion',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cancelar'
    }).then((result)=>{
      if (result.value) {

        while(this.imagen.controls.length!=0){
          for(var i=0;i<this.imagen.controls.length;i++)
          {
            this.imagen.removeAt(i);
          }

          }
          while(this.eliminar.controls.length!=0)
          {
            for(var i=0;i<this.eliminar.controls.length;i++)
            {
              this.eliminar.removeAt(i);
            }

          }
          this.loading=true;
       
        Swal.fire({
          title:'Cancelacion',
          text:'Se cancela la operacion',
          icon:'success',
        });
      }

    });


  }
}
