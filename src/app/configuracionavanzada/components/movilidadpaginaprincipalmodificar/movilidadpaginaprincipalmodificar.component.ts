import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movilidadpaginaprincipalmodificar',
  templateUrl: './movilidadpaginaprincipalmodificar.component.html',
  styleUrls: ['./movilidadpaginaprincipalmodificar.component.css']
})
export class MovilidadpaginaprincipalmodificarComponent implements OnInit {

  //loading
  loading=true;
  loadingspinner=false;
  //listaInterfaz
  listainterfaz:Interfaz_contenido[]=[];
  listainterfazaux:Interfaz_contenido[]=[];

  //id
  id=0;

   //usuario
  
   usuario_id:string="";

   // 
   myform:FormGroup;

   //guardar
   botonguardar=false;

    //archivo
  archivo:File=new File([""],"");
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _login:GeneralLoginService,public snackBar:MatSnackBar) { 
    var id;
    id=localStorage.getItem("id_personal") as string;  
    this.usuario_id=id;
    this.myform=ingresar.group({
      id_usuario:0,
      id_objetivo:0,
      objetivo:['',Validators.required],
      id_programa:0,
      programa:['',Validators.required],
      id_beneficios:0,
      beneficios:['',Validators.required],
      id_informacion:0,
      informacion:[''],
      pdfreglamento:[''],
      boton_subir:false
     });
  }
  ngOnInit(): void {
    this.getPaginas()
  }

   getPaginas() {
    this._general.getTipoPagina("Movilidad")
    .subscribe((res:any) => {
    this.listainterfaz=[];
    this.listainterfaz=res;
   // console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
     this.loading=false;
     this.separar(this.listainterfaz);
    });
   }

   separar(original:Interfaz_contenido[]){
    original.forEach((item:Interfaz_contenido)=>{

      if(item.nombre=="Objetivo General")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_objetivo:item.id,
            objetivo:item.descripcion,
          })
          
        } 
      }

      if(item.nombre=="Programa de movilidad academica")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_programa:item.id,
            programa:item.descripcion,
          })
         
        } 
      }
      if(item.nombre=="Beneficios")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_beneficios:item.id,
            beneficios:item.descripcion,
          })
          
        } 
      }
      if(item.nombre=="Mas Informacion")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_informacion:item.id,
            informacion:item.descripcion,
            pdfreglamento:item.PDF,
          })
          
        } 
      }
    });

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
        this.loadingspinner=true;
        this.myform.patchValue({
          boton_subir:true
        })
        const archivoCapturado=event.target.files[0];
        this.archivo=archivoCapturado;
        if(this.archivo.type=="application/pdf"){
          const formData = new FormData();
          formData.append('document', this.archivo);
          this._general.reglamentodocumento(formData)
          .subscribe((res:any)=>{
            this.loadingspinner=false;
            if(res.estado==true)
            {
              
              this.myform.patchValue({
                boton_subir:false,
                pdfreglamento:res.documento
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

  //reglamento
  PDF(){
    let url1 = this.myform.get('pdfreglamento')?.value as string;
    let urlToOpen:string=url1;
   let url: string = '';
   if (!/^http[s]?:\/\//.test(urlToOpen)) {
     url += 'http://';
   }

   url += urlToOpen;
   window.open(url, '_blank');
  }

  guardar(){

   if(this.myform.get('objetivo')?.value.length==0 || this.myform.get('programa')?.value.length==0 || this.myform.get('beneficios')?.value.length==0)
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
      

      this.myform.patchValue({
        objetivo:separar1,
      
      });
      let json={data:this.myform.value};

      this._general.updatePaginaMovilidad(json)
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
 
       }
    });

  } 

  }
