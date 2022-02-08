import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';

@Component({
  selector: 'app-nosotrospaginaprincipalmodificar',
  templateUrl: './nosotrospaginaprincipalmodificar.component.html',
  styleUrls: ['./nosotrospaginaprincipalmodificar.component.css']
})
export class NosotrospaginaprincipalmodificarComponent implements OnInit {
  loading=true;
  
  //listaInterfaz
  listainterfaz:Interfaz_contenido[]=[];
  listainterfazaux:Interfaz_contenido[]=[];

  

  //id
  id=0;

   //usuario
   cedula:string;
   usuario_id:string="";

   // 
   myform:FormGroup;

   //guardar
   botonguardar=false;

    //archivo
  archivo:File=new File([""],"");
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _login:GeneralLoginService,public snackBar:MatSnackBar) { 
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
    this.myform=ingresar.group({
      id_usuario:0,
      id_objetivo:0,
      objetivo:['',Validators.required],
      id_mision:0,
      mision:['',Validators.required],
      id_vision:0,
      vision:['',Validators.required],
      id_masInformacion:0,
      masInformacion:[''],
      pdfmasinformacion:[''],
      id_objetivo_inicio:0,
      id_mision_inicio:0,
      id_vision_inicio:0,
      boton_subir:false

      
     });
  }

  ngOnInit(): void {
    this.getusuario()
    this.getPaginas()
    this.getPaginasInicio()
  }
  getusuario(){
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
      this.usuario_id=res.usuario.id;
      this.myform.patchValue({
       id_usuario:res.usuario.id
      });   
    });
  }
  getPaginas(){
    this._general.getTipoPagina("Nosotros")
    .subscribe((res:any) => {
    this.listainterfaz=[];
    this.listainterfaz=res;
   // console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
     this.loading=false;
     this.separarcarosel(this.listainterfaz);
    });
  }
  separarcarosel(original:Interfaz_contenido[])
  {

    original.forEach((item:Interfaz_contenido)=>{

      if(item.nombre=="Objetivo General")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_objetivo:item.id,
            objetivo:item.descripcion.substring(65),
          })
          
        } 
      }

      if(item.nombre=="Mision")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_mision:item.id,
            mision:item.descripcion.substring(65),
          })
         
        } 
      }
      if(item.nombre=="Vision")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_vision:item.id,
            vision:item.descripcion.substring(65),
          })
          
        } 
      }
      if(item.nombre=="Mas Informacion")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_masInformacion:item.id,
            masInformacion:item.descripcion,
            pdfmasinformacion:item.PDF,
          })
          
        } 
      }
    });
    
    

    // if(this.listacarrosel.length==0)
    // {
    //   this.verificar=false;

    // }
    // else
    // {
    //   this.listacarrosel.forEach((item:Interfaz_contenido)=>{
    //       const imagen_publi=this.ingresar.group({
    //       id:item.id,
    //       id_interfaz:item.interfaz.id,
    //       usuario_id:this.usuario_id,
    //        nombre:[item.nombre,Validators.required],
    //        descripcion:[item.descripcion,Validators.required],
    //        urlimagen:item.urlimagen,
    //        file:new File([""],""),
    //        verificar:false
    //       });
    //       this.imagen.push(imagen_publi);
    //   });
    // }

  }

  getPaginasInicio(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listainterfazaux=res;
      this.loading=false;
      this.separarlista(this.listainterfazaux);
    })
  }
  separarlista(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Quienes-Somos"){
         if(item.nombre=="Mision")
         {
           if(item.estado=="A"){
            this.myform.patchValue({
              id_mision_inicio:item.id,
            })
           }
          
         }

         if(item.nombre=="Objetivo General")
         {
          if(item.estado=="A"){ 
            this.myform.patchValue({
              id_objetivo_inicio:item.id,
            })
            
          }
         }
         if(item.nombre=="Vision")
         {
          if(item.estado=="A"){ 
            this.myform.patchValue({
              id_vision_inicio:item.id,
            })
            
          }
         }

      }
    });
    
    //  console.log(this.listaobjetivoaux);
    // console.log(this.listamisionaux[0].descripcion.length);
    // console.log(this.listavisionaux[0].descripcion.substring(0,65));



   
    



    
  }

  //escoger el archivo
  fileEvent(event:any)
  {
    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: 'Esta seguro que desea Subir el archivo...??',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
     
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this.myform.patchValue({
          boton_subir:true
        })
        const archivoCapturado=event.target.files[0];
        this.archivo=archivoCapturado;
        if(this.archivo.type=="application/pdf"){
          const formData = new FormData();
          formData.append('document', this.archivo);
          this._general.masInformaciondocumento(formData)
          .subscribe((res:any)=>{
            if(res.estado==true)
            {
             
              this.myform.patchValue({
                boton_subir:false,
                pdfmasinformacion:res.documento
              });
              Swal.fire({
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                title:'Se subio correctamente el archivo PDF',
                icon:'success'
              });

            }
    
             
          });
    
        }
        else
        {
          this.archivo=new File([""],"");
          // this.verificar=false;
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
          this.myform.patchValue({
            boton_subir:false
          })
          return;
    
    
        }
      }
      
    })


   
    

  }

  //mas informacion
  PDF(){
    let url1 = this.myform.get('pdfmasinformacion')?.value as string;
    let urlToOpen:string=url1;
   let url: string = '';
   if (!/^http[s]?:\/\//.test(urlToOpen)) {
     url += 'http://';
   }

   url += urlToOpen;
   window.open(url, '_blank');
  }

  guardar(){

   if(this.myform.get('objetivo')?.value.length==0 || this.myform.get('mision')?.value.length==0 || this.myform.get('vision')?.value.length==0)
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
      var utm="El Departamento de Relaciones Internacionales, Convenios y Becas ";
      var descripcion1=this.myform.get('objetivo')?.value
      var separar1=utm+descripcion1.charAt(0).toLowerCase()+descripcion1.slice(1);
      var descripcion2=this.myform.get('mision')?.value
      var separar2=utm+descripcion2.charAt(0).toLowerCase()+descripcion2.slice(1);
      var descripcion3=this.myform.get('vision')?.value
      var separar3=utm+descripcion3.charAt(0).toLowerCase()+descripcion3.slice(1);

      this.myform.patchValue({
        objetivo:separar1,
        mision:separar2,
        vision:separar3
      });
      let json={data:this.myform.value};

      this._general.updatePaginaNosotros(json)
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
          this.getPaginas()
          this.getPaginasInicio()
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
          this.botonguardar=false;
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
      title:'Cancelacion de Ingreso Plantilla',
      text:'Desea salir de la pagina',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cancelar'
    }).then((result)=>{
      if (result.value) {
        Swal.fire({
          title:'La operacion queda cancelada',
          text:'',
          icon:'success',
        });
        this.getPaginas();
        this.getPaginasInicio(); 
       }
    });

  } 
}
