import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { unescape } from 'querystring';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-editarconveniosaprobados',
  templateUrl: './editarconveniosaprobados.component.html',
  styleUrls: ['./editarconveniosaprobados.component.css']
})
export class EditarconveniosaprobadosComponent implements OnInit {
   // id del convenio plantilla traigo por el url
   id="";
   tipo="";

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
  constructor(private rutaActiva: ActivatedRoute, private editar:FormBuilder, private convenios:ConveniosServicesService,
               private router:Router) {
    this.id=rutaActiva.snapshot.params.id;
    this.tipo=rutaActiva.snapshot.params.tipo;
    this.myform=editar.group({
      id:[''],
      nombre_convenio:['',Validators.required],
      nombre_file:[{value:'',disabled: true},Validators.required],
      PDF:['']
    });
    this.archivosubir=editar.group({
     document:['']
    });
   }

  ngOnInit(): void {
  this.getconvenio()
  this.cambiartipo()
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
      console.log(this.archivo);
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
                this.nombreArchivo=res.documento;
                this.myform.get('PDF')?.setValue(this.nombreArchivo);
                let json={data:{
                  id_convenio:this.myform.get('id')?.value,
                  PDF:this.myform.get('PDF')?.value,
                }}
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
              id_convenio:this.myform.get('id')?.value,
              PDF:this.myform.get('PDF')?.value,
              nombre_convenio:this.myform.get('nombre_convenio')?.value
            }}
  
            console.log(json);
            
             this.convenios.modificarconveniosaprobados(json)
             .subscribe((res:any)=>{
               console.log(res);
               
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
          id_convenio:this.myform.get('id')?.value,
          PDF:this.myform.get('PDF')?.value,
          nombre_convenio:this.myform.get('nombre_convenio')?.value
        }}
        this.convenios.modificarconveniosaprobados(json)
             .subscribe((res:any)=>{
               console.log(res);
               
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


  

}
