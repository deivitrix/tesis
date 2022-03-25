import { Component, OnInit } from '@angular/core';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogborrarfilesbecasComponent } from '../dialogborrarfilesbecas/dialogborrarfilesbecas.component';


@Component({
  selector: 'app-formulario-becas',
  templateUrl: './formulario-becas.component.html',
  styleUrls: ['./formulario-becas.component.css']
})
export class FormularioBecasComponent implements OnInit {
  //controlador del editor de texto
  public Editor = ClassicEditor;

  //cedula del usuario
  cedula:string="";

  //loading
  loading=true;
  loadingspinner=false;

  // formGroup
  myform:FormGroup;
  mysolicitud:FormGroup;

  //menu
  menu_opcion:number=0;

  // validaciones
  menu1=false;
  menu2=false;
  menu3=false;
  menu4=false;
  menu5=false;

  //variable
  beneficio1=false;
  beneficio2=false;

  //botones
  botonguardar=false;
  botoncancelar=false;
  botonguardarDocumento=false;
  botonborrarDocumento=false;


  //select modalidad
  modalidad1: any[] = [];
  modalidad2: any[] = [];

  modalidad1aux: any[] = [];
  modalidad2aux: any[] = [];


  //selector universidades
  listuniver: any[] = [];

  //selector naturaleza
  listnatu: any[] = [];
  listnatu_aux: any[] = [];

  //beneficios
  listbeneficio:any[]=[];

  //selector apoyo
  listapoyo: any[] = [];
  listapoyo_aux: any[] = [];

  //selector monto
  listmonto: any[] = [];
  listmonto_aux: any[] = [];


  //selector alergias
  listalergias: any[] = [];
  listalergias_aux: any[] = [];

  //verificar presion de guardar
  botonguardardocumentos=false;

  //selector naturaleza booleano
  naturaleza_verificar=false;


  constructor(private rutaActiva: ActivatedRoute, private becas:BecasnivelService,private ingresar:FormBuilder,
    private router:Router, public snackBar:MatSnackBar, public dialog: MatDialog) {
      this.cedula=rutaActiva.snapshot.params.cedula;
      this.myform=this.ingresar.group({
        idpersonal:[''],
        cedula:[{value:'',disabled: true}],
        Tipo_Sangre:[{value:'',disabled: true}],
        nombres:[{value:'',disabled: true}],
        apellido1:[{value:'',disabled: true}],
        apellido2:[{value:'',disabled: true}],
        fecha_nacimiento:[{value:'',disabled: true}],
        nacionalidad:[{value:'',disabled: true}],
        genero:[{value:'',disabled: true}],
        correo_personal_institucional:[{value:'',disabled: true}],
        correo_personal_alternativo:[{value:'',disabled: true}],
        Estado_civil:[{value:'',disabled: true}],
        Pais:[{value:'',disabled: true}],
        Provincia:[{value:'',disabled: true}],
        Canton:[{value:'',disabled: true}],
        residencia_calle_1:[{value:'',disabled: true}],
        residencia_calle_2:[{value:'',disabled: true}],
        residencia_calle_3:[{value:'',disabled: true}],
  
        telefono_personal_domicilio:[{value:'',disabled: true}],
        telefono_personal_celular:[{value:'',disabled: true}],
  
        contacto_emergencia_apellidos:[{value:'',disabled: true}],
        contacto_emergencia_nombres:[{value:'',disabled: true}],
        contacto_emergencia_telefono_1:[{value:'',disabled: true}],
        contacto_emergencia_telefono_2:[{value:'',disabled: true}],
      });
      this.mysolicitud=this.ingresar.group({
        idpersonal:[''],
        modalidad1:['',Validators.required],
        modalidad2:['',Validators.required],
        id_universidad: ['', Validators.required],
        campus_destino:['',Validators.required],
        numero_semestre: ['', Validators.required],
        fecha_inicio:['',Validators.required],
        fecha_fin:['',Validators.required],
        id_naturaleza: ['', Validators.required],
        id_becas: ['', Validators.required],
        id_monto: ['', Validators.required],
        id_alergias: ['', Validators.required],
        especificar_alergias: ['', Validators.required],
        enfermedades_tratamiento: ['', Validators.required],
        poliza_seguro: ['', Validators.required],

        //Documentos
        carta_aceptacion: [new File([""], ""), Validators.required],
        pdfcarta_aceptacion: ["", Validators.required],
        nombre_carta: [{ value: '', disabled: true }],
        verificar1: [false],

        titulo: [new File([""], ""), Validators.required],
        pdftitulo: ["", Validators.required],
        nombre_titulo: [{ value: '', disabled: true }],
        verificar2: [false],

      });
     }

  ngOnInit(): void {
    this.getBecasDocente()
    this.menu(6)
    this.getmodalidad();
    this.getuniversidad();
    this.getnaturaleza();
    this.getapoyo();
    this.getmonto();
    this.getalergias();
  }

  getBecasDocente(){
    this.becas.getBecasDocente(this.cedula)
    .subscribe((res:any)=>{
      this.loading=false;
      if(res.estado==true)
      {
        var genero="";
        if(res.usuario.genero=="M")
        {
          genero="Masculino";

        }
        else{
          genero="Femenino";
        }
       this.myform.patchValue({
        idpersonal:res.usuario.idpersonal,
        cedula:res.usuario.cedula,
        Tipo_Sangre:res.usuario.Tipo_Sangre,
        nombres:res.usuario.nombres,
        apellido1:res.usuario.apellido1,
        apellido2:res.usuario.apellido2,
        fecha_nacimiento:res.usuario.fecha_nacimiento,
        nacionalidad:res.usuario.Nacionalidad,
        genero:genero,
        correo_personal_institucional:res.usuario.correo_personal_institucional,
        correo_personal_alternativo:res.usuario.correo_personal_alternativo,
        Estado_civil:res.usuario.Estado_civil,

        Pais:res.usuario.Pais,
        Provincia:res.usuario.Provincia,
        Canton:res.usuario.Canton,
        residencia_calle_1:res.usuario.residencia_calle_1,
        residencia_calle_2:res.usuario.residencia_calle_2,
        residencia_calle_3:res.usuario.residencia_calle_3,
        telefono_personal_domicilio:res.usuario.telefono_personal_domicilio,
        telefono_personal_celular:res.usuario.telefono_personal_celular,

  
        contacto_emergencia_apellidos:res.usuario.contacto_emergencia_apellidos,
        contacto_emergencia_nombres:res.usuario.contacto_emergencia_nombres,
        contacto_emergencia_telefono_1:res.usuario.contacto_emergencia_telefono_1,
        contacto_emergencia_telefono_2:res.usuario.contacto_emergencia_telefono_2,
       });

       this.mysolicitud.patchValue({
        idpersonal:res.usuario.idpersonal,
         tipo_sangre:res.usuario.Tipo_Sangre
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
          title:res.mensaje,
          icon:'warning'
        });
        this.router.navigate(['/principal/becas'])
        return;
      }
    })

  }

   //selector modalidad
   getmodalidad() {
    this.becas.getserviciomodalidad("0")
      .subscribe((res: any) => {
        if (res.estado == true) {
          this.modalidad1aux = res.modalidad;

          this.modalidad1aux.forEach((item: any) => {
            if (item.estado == "A") {
              this.modalidad1.push(item);
            }

          })


        }
      });

    this.becas.getserviciomodalidad("1")
      .subscribe((res: any) => {
        if (res.estado == true) {
          this.modalidad2aux = res.modalidad;
          this.modalidad2aux.forEach((item: any) => {
            if (item.estado == "A") {
              this.modalidad2.push(item);
            }
          })

        }
      })


  }

  //selector universidad
  getuniversidad() {
    this.becas.getserviciouniversidades()
      .subscribe((res: any) => {
        this.listuniver = res;

      })
  }

  //selector naturaleza
  getnaturaleza() {
    this.becas.getservicionaturaleza("B")
      .subscribe((res: any) => {
        if (res.estado == true) {
          this.listnatu_aux = res.naturaleza
          this.listnatu_aux.forEach((item: any) => {
            if (item.estado == "A") {
              this.listnatu.push(item);
            }
          })

        }
      })
  }

  //selector apoyo
  getapoyo() {
    this.becas.getservicioapoyo("B")
      .subscribe((res: any) => {
        if (res.estado) {
          this.listapoyo_aux = res.apoyo
          this.listapoyo_aux.forEach((item: any) => {
            if (item.estado == "A") {
              this.listapoyo.push(item);
            }
          })

        }
      })

  }

  // select monto
  getmonto() {
    this.becas.getserviciomonto("B")
      .subscribe((res: any) => {
        if (res.estado) {
          this.listmonto_aux = res.monto
          this.listmonto_aux.forEach((item: any) => {
            if (item.estado == "A") {
              this.listmonto.push(item);

            }
          })

        }
      })
  }

  //selector alergias
  getalergias() {
    this.becas.getservicioalergias()
      .subscribe((res: any) => {
        if (res.estado == true) {
          this.listalergias_aux = res.alergias;
          this.listalergias_aux.forEach((item: any) => {
            if (item.estado == "A") {
              this.listalergias.push(item);
            }
          })

        }

      })
  }





    // menu
  menu(id:number)
    {
      
      if(this.menu_opcion==0)
      {
        this.menu_opcion=1;
      }
      else{
        this.menu_opcion=id;
      }
  
      if(this.menu_opcion==1)
      {
        this.menu1=true;
        this.menu2=false;
        this.menu3=false;
        this.menu4=false;
        this.menu5=false;
        
        
      }
      else if(this.menu_opcion==2)
      {
        this.menu1=false;
        this.menu2=true;
        this.menu3=false;
        this.menu4=false;
        this.menu5=false;
      
      }
      else if(this.menu_opcion==3)
      {
        this.menu1=false;
        this.menu2=false;
        this.menu3=true;
        this.menu4=false;
        this.menu5=false;
      }
      else if(this.menu_opcion==4)
      {
        this.menu1=false;
        this.menu2=false;
        this.menu3=false;
        this.menu4=true;
        this.menu5=false;
      }
      else if(this.menu_opcion==5)
      {
        this.menu1=false;
        this.menu2=false;
        this.menu3=false;
        this.menu4=false;
        this.menu5=true;
      }
  
    }

    //beneficios
  beneficios_naturaleza()
  {
    this.naturaleza_verificar=true;
    this.becas.getserviciobeneficio(this.mysolicitud.get('id_naturaleza')?.value)
    .subscribe((res:any)=>{
      if(res.estado==true){

        this.naturaleza_verificar=false;
        this.listbeneficio=[];
        this.listbeneficio=res.beneficios;
      }

    });

   
  }

  // agregar files al mysolicitud
  fileEvent(event: any, numero: number) {
    const archivoCapturado = event.target.files[0];
    if (archivoCapturado.type == "application/pdf") {
      if (numero == 1) {
        this.mysolicitud.patchValue({
          carta_aceptacion: archivoCapturado,
          nombre_carta: archivoCapturado.name,
          verificar1: true
        });
      }
      else if (numero == 2) {
        this.mysolicitud.patchValue({
          titulo: archivoCapturado,
          nombre_titulo: archivoCapturado.name,
          verificar2: true
        });


      }
    }
    else {
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        title: "Solo se puede escoger archivos PDF ",
        icon: 'warning'
      });
    }

  }

  // checkbox beneficios
  presionar(value:boolean,numero:number)
  {
    if(numero==1)
    {
      this.beneficio1=value;
    }
    if(numero==2)
    {
      this.beneficio2=value;

    }
  }

  //botones 

  guardar(){
    
    //modalidad
    if(this.mysolicitud.get('modalidad1')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de modalidad",
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

    if(this.mysolicitud.get('modalidad2')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de tipo destino",
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

    //universidad
    if(this.mysolicitud.get('id_universidad')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una Universidad",
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

    //campus destino
    if(this.mysolicitud.get('campus_destino')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Ingresar carrera destino",
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

    // numero semestre
 if(this.mysolicitud.get('numero_semestre')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Ingresar un semestre a cursar ",
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

    if(this.mysolicitud.get('numero_semestre')?.value <0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Ingresar numero de semestres en numeros positivos",
         buttonText:'',
         icon:'warning'
        },
        duration:2000,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'     
      });
      return;

    }

    //fecha inicio 
    if(this.mysolicitud.get('fecha_inicio')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Ingresar una fecha de inicio ",
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

    //fecha fin 
    if(this.mysolicitud.get('fecha_fin')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Ingresar una fecha de fin ",
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
    //naturaleza
    if(this.mysolicitud.get('id_naturaleza')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una Naturaleza de Movilidad ",
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

    //becas
    if(this.mysolicitud.get('id_becas')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de Becas ",
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

    //monto
    // if(this.mysolicitud.get('id_monto')?.value.length==0)
    // {
    //   this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
    //     data:{
    //       titulo:'Error.....',
    //       mensaje:"Escoger una opcion de monto ",
    //      buttonText:'',
    //      icon:'warning'
    //     },
    //     duration:1000,
    //     horizontalPosition:'end',
    //     verticalPosition:'bottom',
    //     panelClass:'error'     
    //   });
    //   return;

    // }


    //alergias
    if(this.mysolicitud.get('id_alergias')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de Alergias ",
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

    //especificar Alergias 
    if(this.mysolicitud.get('especificar_alergias')?.value.length==0)
    {
      
     this.mysolicitud.patchValue({
         especificar_alergias:'<p>&nbsp;No definido</p>'
     });
     
    }
    //Enfermedades Persistentes y tratamiento 
    if(this.mysolicitud.get('enfermedades_tratamiento')?.value.length==0)
    {
      
     this.mysolicitud.patchValue({
      enfermedades_tratamiento:'<p>&nbsp;No definido</p>'
     });
     
    }

    //Poliza de seguro
    if(this.mysolicitud.get('poliza_seguro')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de Poliza de Seguro ",
         buttonText:'',
         icon:'warning'
        },
        duration:1500,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'     
      });
      return;
    }

    if(this.botonguardardocumentos==false)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Presionar el boton de Guardar de la pestaña Documentos",
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

    if(this.mysolicitud.get('pdfcarta_aceptacion')?.value.length==0 || this.mysolicitud.get('pdftitulo')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Cargando datos documentos....!!",
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


  cancelar(){

  Swal.fire({
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    title: 'Esta seguro que desea cancelar la operacion?',
    icon: 'warning',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Salir',
    denyButtonText: `No Salir`,
   
  }).then((result)=>{
    if(result.isConfirmed)
    {
      Swal.fire({
        title:'Redireccionamiento',
        text:'Se redirecciona a la pagina principal de Becas',
        icon:'success',
      });
      this.router.navigate(['/principal/becas']);


    }
  })

  }

  //borrar archivos selecionados

  borrar_archivos(){
    const dialogRef = this.dialog.open(DialogborrarfilesbecasComponent, {
      width: '900px',
      data: {
        titulo: 'Borrar Archivos', objeto: {
          carta_aceptacion: this.mysolicitud.get('nombre_carta')?.value,
          borrar1: false,
          titulo: this.mysolicitud.get('nombre_titulo')?.value,
          borrar2: false,
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result != null) {

       if(result.borrar1==false && result.borrar2==false)
        {
          return;
        }

        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title: "Esta seguro que desea Borrar los archivos seleccionados!!",
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `No Borrar`,

        }).then((result1) => {

          if (result1.isConfirmed) {
            if (result.borrar1 == true) {
              this.mysolicitud.patchValue({
                carta_aceptacion: [new File([""], ""), Validators.required],
                nombre_carta: [''],
                verificar1: false
              });
            }
            if (result.borrar2 == true) {
              this.mysolicitud.patchValue({
                titulo: [new File([""], ""), Validators.required],
                nombre_titulo: [''],
                verificar2: false
              });

            }
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title:"Elimino los archivos seleccionados",
              icon:'success'
            });

          }

        })
      }
    });



  }

  //guardar documentos
  guardar_documentos(){

    // carta de aceptacion
    if(this.mysolicitud.get('verificar1')?.value==false)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Subir documento Carta de Aceptacion ",
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

    //Copia Record
    if(this.mysolicitud.get('verificar2')?.value==false)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Subir documento Titulo ",
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
      title: 'Esta seguro que desea guardar los Documentos?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
     
    }).then((result)=>{

      if(result.isConfirmed)
      {
         // declarar variables
         var verificar_pdf1=false;
         var verificar_pdf2=false;
         this.loadingspinner=true;
         this.botonguardardocumentos=true;
         this.botonguardarDocumento=true;
         this.botonborrarDocumento=true;


         const formData = new FormData();
          formData.append('document', this.mysolicitud.get('carta_aceptacion')?.value);
          this.becas.addftpsolicitudbecas(formData)
          .subscribe((res:any)=>{
            if(res.estado==true)
            {
              verificar_pdf1=true;
              this.mysolicitud.patchValue({
                pdfcarta_aceptacion:res.documento 
              })
              if(verificar_pdf1==true && verificar_pdf2==true)
                { 
                  this.loadingspinner=false;
                }

            }
          });



          const formData2 = new FormData();
          formData2.append('document', this.mysolicitud.get('titulo')?.value);
          this.becas.addftpsolicitudbecas(formData2)
          .subscribe((res:any)=>{
            if(res.estado==true)
            {
              verificar_pdf2=true;
              this.mysolicitud.patchValue({
                pdftitulo:res.documento 
              });
              if(verificar_pdf1==true && verificar_pdf2==true)
                { 
                  this.loadingspinner=false;
                }

            }
          });

      }


    });



  }

}


