import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { unescape } from 'querystring';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';

@Component({
  selector: 'app-editarconveniosaprobados',
  templateUrl: './editarconveniosaprobados.component.html',
  styleUrls: ['./editarconveniosaprobados.component.css']
})
export class EditarconveniosaprobadosComponent implements OnInit {
   // id del convenio plantilla traigo por el url
   id="";
   tipo="";

   //id_usuario
   id_personal="";

  loading=true;
  //datos convenio
  datoconvenio:any;

  // formGroup

  myform:FormGroup;

  //archivo
  archivo:File=new File([""],"");

  //verificacion
  verificar=false;

  // archivo
  archivosubir:FormGroup;

  // nombre archivo subido al ftp
  nombreArchivo="";

  nombrefile:string="";



  //boton
  botonguardar=false;

  //titulo
  titulo="";

  public Editor = ClassicEditor;

  //

  constructor(private rutaActiva: ActivatedRoute, private editar:FormBuilder, private convenios:ConveniosServicesService,
               private router:Router,public snackBar:MatSnackBar) {
    this.id=rutaActiva.snapshot.params.id;
    this.tipo=rutaActiva.snapshot.params.tipo;
    this.myform=editar.group({
      id:[''],
      nombre_convenio:['',Validators.required],
      nombre_file:[{value:'',disabled: true},Validators.required],
      PDF:[''],
      fecha_inicio:['',Validators.required],
      fecha_final:[''],
      año:['',Validators.required],
      mes:['',Validators.required],
      dia:['',Validators.required],
    });
    this.archivosubir=editar.group({
     document:['']
    });
  
    //this.id_personal="";
    var id_personal;
    id_personal=localStorage.getItem("id_personal") as string;  
    this.id_personal=id_personal;

   }

  ngOnInit(): void {
  this.getconvenio()
  this.cambiartipo()
  // console.log(this.id_personal)
  }

  cambiartipo(){
    if(this.tipo=="G")
    {
     
      this.titulo="Subir Convenio";
      this.myform.get('nombre_convenio')?.disable();

    }
    else
    {
      this.titulo="Modificar Convenio Aprobado";
    }
  }

  getconvenio(){
    var separar;
    var dec;
    var nombre="";
    this.convenios.serachconveniotabla(this.id)
    .subscribe((res:any)=>{
     if(res.estado==true)
     {
       this.loading=false;
       this.datoconvenio=res.convenio;
     // separar=utf8Encode(this.datoconvenio.PDF)
      separar=this.datoconvenio.PDF.split('/');
      dec=separar[(separar.length)-1].split('%20');
      for(var i=0;i<dec.length;i++)
      {
        nombre=nombre+" "+dec[i];

      }
    
      if(this.tipo=='G')
      {
        
        this.myform.patchValue({
          id:this.id,
          nombre_convenio:this.datoconvenio.titulo_convenio,
          nombre_file:'',
          PDF:this.datoconvenio.PDF
         });

      }
      else
      {
        this.myform.patchValue({
          id:this.id,
          nombre_convenio:this.datoconvenio.titulo_convenio,
          nombre_file:nombre,
          PDF:this.datoconvenio.PDF
         });

      }
      

     
       //console.log(this.myform.value);
   
      //this.nombrefile=separar[(separar.length)-1];
      
      

     

     }
      
    })

  }
  fileEvent(event:any)
  { 
    const archivoCapturado=event.target.files[0];
    this.archivo=archivoCapturado;
    if(this.archivo.type=="application/pdf"){
      this.verificar=true;
      this.myform.patchValue({
        nombre_file:this.archivo.name
      });
      this.archivosubir.get('document')?.setValue(this.archivo);

    }
    else
    {
      this.archivo=new File([""],"");
      this.verificar=false;
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        title:'Error.. Solo se puede subir archivos PDF',
        icon:'warning'
      });
      return;


    }
   
    
  }

  ///botones
  Guardar(){

    if(this.tipo=="G"){

      if(this.myform.get('fecha_inicio')?.value.length==0){
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"El convenio debe tener una fecha inicio",
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

      if(this.myform.get('año')?.value.length==0 ||this.myform.get('mes')?.value.length==0 || this.myform.get('dia')?.value.length==0 )
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar correctamente la duracion del convenio",
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

      if(parseInt(this.myform.get('año')?.value)< 0 || parseInt(this.myform.get('mes')?.value)<0 || parseInt(this.myform.get('dia')?.value) <0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar numeros positivos",
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
        title: "Esta seguro que desea Guardar!!",
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
       
      }).then((result)=>{
        if(result.isConfirmed)
        {
          if(this.verificar==true)
          { 
            this.botonguardar=true;
            const formData = new FormData();
            formData.append('document', this.archivo);
            this.convenios.ftparchivoPDF(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                var dias_sumado=0;
      if(this.myform.get('año')?.value!=0)
      {
         dias_sumado=dias_sumado+((this.myform.get('año')?.value)*(365/1));

      }
      if(this.myform.get('mes')?.value!=0)
      {
        dias_sumado=dias_sumado+((this.myform.get('mes')?.value*30.4)/(1));
        dias_sumado=Math.round(dias_sumado);
      }

      if(this.myform.get('dia')?.value!=0)
      {
        dias_sumado=dias_sumado+this.myform.get('dia')?.value
      }

      //console.log(dias_sumado);
       


      //console.log(dias_sumado);
      var fecha=new Date(this.myform.get('fecha_inicio')?.value);
      var fecha_final=fecha.setDate(fecha.getDate()+dias_sumado);
      var fecha_final_1=new Date(fecha_final);
      //console.log(fecha_final_1);

        // obtener la fecha en string
        var fechai=this.myform.get('fecha_inicio')?.value;
        var fechaf=fecha_final_1;
        // transformar en Date
        var fechaiaux=new Date(fechai);
        var fechafaux=new Date(fechaf);

        // Fecha inicio string
        var diainicioaux=fechaiaux.getDate();
        var mesinicioaux=(fechaiaux.getMonth()+1);
        var diainicio="";
        var mesinicio="";
        
        if(diainicioaux<=9){
          diainicio="0"+diainicioaux
        }
        else{
          diainicio=""+diainicioaux;
        }

        if(mesinicioaux<=9){

        mesinicio="0"+mesinicioaux;
        }
        else{
        mesinicio=""+mesinicioaux;
        }

        //fecha final string
        var diafinalaux=fechafaux.getDate();
        var mesfinalaux=(fechafaux.getMonth()+1);
        var diafinal="";
        var mesfinal="";
        
        if(diafinalaux<=9){
          diafinal="0"+diafinalaux
        }
        else{
          diafinal=""+diafinalaux;
        }

        if(mesfinalaux<=9){

        mesfinal="0"+mesfinalaux;
        }
        else{
        mesfinal=""+mesfinalaux;
        }
        
        

        var fechainicio=fechaiaux.getFullYear()+"-"+mesinicio+"-"+diainicio;
        var fechafinal=fechafaux.getFullYear()+"-"+mesfinal+"-"+diafinal;
                this.nombreArchivo=res.documento;
                this.myform.get('PDF')?.setValue(this.nombreArchivo);
                let json={data:{
                  id_convenio:this.myform.get('id')?.value,
                  PDF:this.myform.get('PDF')?.value,
                  fecha_inicio:fechainicio,
                  fecha_fin:fechafinal,
                  id_personal:this.id_personal,
                }};
                this.convenios.modificarconveniosguardados(json)
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
                      title:res.mensaje,
                      icon:'success'
                    });
                    this.botonguardar=false;
                    this.router.navigate(['/utmricb/convenios/tablasubir']);
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
                    this.botonguardar=false;


                  }
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
              title:'Se necesita un archivo para subir',
              icon:'warning'
            });
            return;
            

          }

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
        title: "Esta seguro que desea Guardar!!",
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
       
      }).then((result)=>{
        if(result.isConfirmed)
        {
          this.botonguardar=true;
          if(this.verificar==true)
          {
        const formData = new FormData();
        formData.append('document', this.archivo);
        this.convenios.ftparchivoPDF(formData)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {
            this.nombreArchivo=res.documento;
            this.myform.get('PDF')?.setValue(this.nombreArchivo);
            let json={data:{
              id_personal:this.id_personal,
              id_convenio:this.myform.get('id')?.value,
              PDF:this.myform.get('PDF')?.value,
              nombre_convenio:this.myform.get('nombre_convenio')?.value
            }}

            
             this.convenios.modificarconveniosaprobados(json)
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
                  title:res.mensaje,
                  icon:'success'
                });
                this.botonguardar=false;
                this.router.navigate(['/utmricb/convenios/tablamodificar']);
                //
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
                this.botonguardar=false;
  
               }
             })
  
          }
  
        })
      }
      else{
        let json={data:{
          id_personal:this.id_personal,
          id_convenio:this.myform.get('id')?.value,
          PDF:this.myform.get('PDF')?.value,
          nombre_convenio:this.myform.get('nombre_convenio')?.value
        }}
        this.convenios.modificarconveniosaprobados(json)
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
                  title:res.mensaje,
                  icon:'success'
                });
                this.botonguardar=false;
                this.router.navigate(['/utmricb/convenios/tablamodificar']);
                //
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
                  icon:'success'
                });
                this.botonguardar=false;
  
               }
             })
  
  
  
      }
  
  
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

    


  }

  cancelar(){

    if(this.tipo=="G"){ Swal.fire({
      title:'Cancelacion de Subir Convenios',
      text:'Desea salir de la pagina',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo salir'
    }).then((result)=>{
      if (result.value) {
        Swal.fire({
          title:'Redireccionamiento',
          text:'Se redirecciona a la pagina Subir convenios',
          icon:'success',
        });
        this.router.navigate(['/utmricb/convenios/tablasubir']);
        // this.convenios.eliminarpdf()
        // .subscribe((res:any)=>{
        //   if(res.estado==true)
        //   {
           
        //   }
        // })
        
      }

    });

    }
    else{
     
      Swal.fire({
        title:'Cancelacion de Modificar Convenios Aprobados',
        text:'Desea salir de la pagina',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si deseo salir'
      }).then((result)=>{
        if (result.value) {
          Swal.fire({
            title:'Redireccionamiento',
            text:'Se redirecciona a la pagina Modificar',
            icon:'success',
          });
          this.router.navigate(['/utmricb/convenios/tablamodificar']);
          // this.convenios.eliminarpdf()
          // .subscribe((res:any)=>{
          //   if(res.estado==true)
          //   {
             
          //   }
          // })
          
        }
  
      });

    }
   
  }


  

}
