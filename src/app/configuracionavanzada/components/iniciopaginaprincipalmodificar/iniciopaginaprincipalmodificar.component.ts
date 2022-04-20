import { GaleriaInterfazComponent } from './../galeria-interfaz/galeria-interfaz.component';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { image } from 'html2canvas/dist/types/css/types/image';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-iniciopaginaprincipalmodificar',
  templateUrl: './iniciopaginaprincipalmodificar.component.html',
  styleUrls: ['./iniciopaginaprincipalmodificar.component.css']
})
export class IniciopaginaprincipalmodificarComponent implements OnInit {
  // formGroup
  myform:FormGroup;

  //listaInterfaz
  listacarrosel:Interfaz_contenido[]=[];
  listainterfaz:Interfaz_contenido[]=[];

  loading=true;
  verificar=true;

  //id carrosel
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

  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _pathimagenes:PathImagenesService,public snackBar:MatSnackBar,private _login:GeneralLoginService, public dialog: MatDialog) { 
    this.myform=ingresar.group({
      imagen:ingresar.array([]),
      eliminar:ingresar.array([]),
      botonsubir:false,
      botoneliminar:false,
      escoger:false
    });
    this.pathimagendefecto=_pathimagenes.pathimagendefecto;
    var id;
    id=localStorage.getItem("id_personal") as string;  
    this.usuario_id=id;
  }

  ngOnInit(): void {
    this.getPaginas()
  }

 
  getPaginas(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listacarrosel=[];
    this.listainterfaz=[];
    this.listainterfaz=res;
     //console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
     this.loading=false;
     this.separarcarosel(this.listainterfaz);
    });
  }
  separarcarosel(original:Interfaz_contenido[])
  {
   
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Carrusel")
      {
        if(item.estado=="A")
        {
          this.listacarrosel.push(item);
        } 
      }
    });
    
    

    if(this.listacarrosel.length==0)
    {
      this.verificar=false;

    }
    else
    {
      this.listacarrosel.forEach((item:Interfaz_contenido)=>{
          const imagen_publi=this.ingresar.group({
          id:item.id,
          id_interfaz:item.interfaz.id,
          usuario_id:this.usuario_id,
          id_imagen:item.imagen.id,
           nombre:[item.nombre,Validators.required],
           descripcion:[item.descripcion,Validators.required],
           urlimagen:item.imagen.url_imagen,
           file:new File([""],""),
           verificar:false
          });
          this.imagen.push(imagen_publi);
      });
    }

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

  agregarCarrosel(){
    this.verificar=true;
    const imagen_iniciO=this.ingresar.group({
     id:0,
     id_interfaz:this.id,
     usuario_id:this.usuario_id,
     id_imagen:[''],
     nombre:['',Validators.required],
     descripcion:['',Validators.required],
     urlimagen:this.pathimagendefecto,
     file:new File([""],""),
     verificar:false
    });

    this.imagen.push(imagen_iniciO);
  }

  fileEvent(event:any,id:number)
  {
    const boton=this.myform;
    const i=this.myform.get('imagen') as FormArray;
    const foto=new Image();
    const archivoCapturado=event.target.files[0]; 
    const general=this._general;
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
               general.subirImagenCarroselftp(formData)
               .subscribe((res:any)=>{
               // console.log(res);
                 if(res.estado==true)
                 { 
                    var url=res.imagen;
                    let json={data:{nombre:archivoCapturado.name,url_imagen:res.imagen}};
                    general.addimagenesinterfaz(json)
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

  // escoger la imagenes ya subidas
  escoger(id:number){
  this.data={id:0,url_escoger:this.url_escoger};
  
  const dialogRef=this.dialog.open(GaleriaInterfazComponent,{
    width:'700px',
    data:{titulo:'Galeria Interfaz',url:this.data}
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
  
  eliminarCard(id:number)
  {
    
    if(this.imagen.controls[id].value.id!=0)
    {
      const eliminar_card=this.ingresar.group({
       id:this.imagen.controls[id].value.id,
       id_interfaz:this.id,
      });
      this.eliminar.push(eliminar_card);
    }
    this.imagen.removeAt(id);
    if(this.myform.get('imagen')?.value.length==0)
    {
      this.verificar=false;

    }
  }
 //botones

  guardar(){
    
      //console.log(this.imagen.length);
      
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
        this._general.updateCarrosel(json)
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
              this.getPaginas()
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
      title:"Cancelar la operacion del Carrosel",
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
          this.getPaginas()
        Swal.fire({
          title:'Cancelacion',
          text:'Se cancela la operacion',
          icon:'success',
        });
        // console.log(this.imagen.controls.length);

        
         

        


        
        
        // for(var i=0;i<this.imagen.controls.length;i++)
        // {
        //   console.log(i);
        //   this.imagen.removeAt(i);
        // }

        // if(this.imagen.controls.length==0)
        // {
        //   this.getPaginas()
        // }
        // else
        // {
         
        // }
        // for(var i=0;i<this.eliminar.controls.length;i++)
        // {
        //   this.eliminar.removeAt(i);
        // }
        // 
      }

    });


  }
 

  
  
  


}
