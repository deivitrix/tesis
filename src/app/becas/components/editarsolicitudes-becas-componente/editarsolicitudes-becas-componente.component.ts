import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BecasnivelService } from 'src/app/services/becasnivel.service';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';

@Component({
  selector: 'app-editarsolicitudes-becas-componente',
  templateUrl: './editarsolicitudes-becas-componente.component.html',
  styleUrls: ['./editarsolicitudes-becas-componente.component.css']
})
export class EditarsolicitudesBecasComponenteComponent implements OnInit {

  //solicitud_id
  id="";
  // tipo
  tipo_estado="";

  id_personal="";

  //lista 
  listsolicitud:any[]=[];

  //loading
  loading=true;
  loadingspinner=false;

   // formGroup
   myform: FormGroup;

    //menu
  menu_opcion:number=0;

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

  //selector apoyo
  listapoyo: any[] = [];
  listapoyo_aux: any[] = [];

  //selector monto
  listmonto: any[] = [];
  listmonto_aux: any[] = [];


  //selector alergias
  listalergias: any[] = [];
  listalergias_aux: any[] = [];

  //beneficios
  listbeneficio:any[]=[];

   // validaciones
   menu1 = false;
   menu2 = false;
   menu3 = false;
//comprobar enabled o disabled
comprobador=false;

//comprobador 2 enable o disabled de los botones
comprobador2=false;

//enable o disable documento final
comprobador3=true;

//verificar pdf final en Aprobados
verificar_pdf=false;

 //controlador del editor de texto
 public Editor = ClassicEditor;

 //boton guardar documentos
 boton_documentos=false;
 boton_documento_final=false;

 //boton documento final verificar
 verificar_boton_final=false;

 //verficar boton guardar
 verificar_boton_documentos=false;

 //selector naturaleza booleano
 naturaleza_verificar=false;


  constructor(private rutaActiva: ActivatedRoute,private becas:BecasnivelService,private mostrar: FormBuilder
    ,public snackBar:MatSnackBar,private router:Router) { 
      var id_personal;
      id_personal=localStorage.getItem("id_personal") as string;  
      this.id_personal=id_personal;
    this.id=rutaActiva.snapshot.params.id;
    this.tipo_estado=rutaActiva.snapshot.params.tipo;
    if(this.tipo_estado=="A")
    {
      this.comprobador=true;
      this.boton_documentos=true;
      this.myform=mostrar.group({
        //solicitud
      id_personal:this.id_personal,
      id:this.id,
      tipo_documento:this.tipo_estado,
      nombre_facultad:[{ value: '', disabled: true }],
      modalidad:[{ value: '', disabled: true }],
      tipo_destino:[{ value: '', disabled: true }],
      universidad_destino:[{ value: '', disabled: true }],
      campus_destino:[{ value: '', disabled: true }],
      numero_semestre:[{ value: '', disabled: true }],
      fecha_inicio:[{ value: '', disabled: false },Validators.required],
      fecha_fin:[{ value: '', disabled: false },Validators.required],
      naturaleza:[{ value: '', disabled: true }],
      beca_apoyo:[{ value: '', disabled: true }],
      monto_referencial:[{ value: '', disabled: true }],
      beneficios:mostrar.array([]),
      
      alergias:[{ value: '', disabled: true }],
      especificar_alergia:[{ value: '', disabled: true }],
      enfermedades_tratamiento:[{ value: '', disabled: true }],
      poliza_seguro:[{ value: '', disabled: true }],

      //pdf
     //Documentos
     carta_aceptacion: [new File([""], ""), Validators.required],
     pdfcarta_aceptacion: ["", Validators.required],
     nombre_carta: [{ value: '', disabled: true }],
     verificar1: [false],

     titulo: [new File([""], ""), Validators.required],
     pdftitulo: ["", Validators.required],
     nombre_titulo: [{ value: '', disabled: true }],
     verificar2: [false],

     //documento final 
     final: [new File([""], ""), Validators.required],
     pdf_final: ["", Validators.required],
     nombre_final: [{ value: '', disabled: true }],
     verificar3: [false],

    });

    }
    else
    {
      this.comprobador=false;
      this.boton_documentos=false;
      this.myform=mostrar.group({
        //solicitud
      id_personal:this.id_personal,
      id:this.id,
      tipo_documento:this.tipo_estado,
      nombre_facultad:[{ value: '', disabled: true }],
      modalidad:[{ value: '', disabled: false }],
      tipo_destino:[{ value: '', disabled: false }],
      universidad_destino:[{ value: '', disabled: false }],
      campus_destino:[{ value: '', disabled: false },Validators.required],
      numero_semestre:[{ value: '', disabled: false },Validators.required],
      fecha_inicio:[{ value: '', disabled: false },Validators.required],
      fecha_fin:[{ value: '', disabled: false },Validators.required],
      naturaleza:[{ value: '', disabled: false }],
      beca_apoyo:[{ value: '', disabled: false }],
      monto_referencial:[{ value: '', disabled: false }],
      beneficios:mostrar.array([]),
      
      alergias:[{ value: '', disabled: false }],
      especificar_alergia:[{ value: '', disabled: false }],
      enfermedades_tratamiento:[{ value: '', disabled: false }],
      poliza_seguro:[{ value: '', disabled: false }],

      //Documentos
     carta_aceptacion: [new File([""], ""), Validators.required],
     pdfcarta_aceptacion: ["", Validators.required],
     nombre_carta: [{ value: '', disabled: true }],
     verificar1: [false],

     titulo: [new File([""], ""), Validators.required],
     pdftitulo: ["", Validators.required],
     nombre_titulo: [{ value: '', disabled: true }],
     verificar2: [false],

     //documento final 
     final: [new File([""], ""), Validators.required],
     pdf_final: ["", Validators.required],
     nombre_final: [{ value: '', disabled: true }],
     verificar3: [false],
    });


    }
    var id_personal;
    id_personal=localStorage.getItem("id_personal") as string;  
    this.id_personal=id_personal;

  }

  ngOnInit(): void {
    this.menu(0)
    this.getmodalidad();
    this.getuniversidad();
    this.getnaturaleza();
    this.getapoyo();
    this.getmonto();
    this.getalergias();
    this.getbecas();
  }

  getbecas(){

    this.becas.getconsultarBecasEditar(this.id,this.tipo_estado)
    .subscribe((res:any)=>{
      if(res.estado==true)
      {
      

        this.verificar_pdf=false;
        res.datos.id_modalidad1=res.datos.id_modalidad1+"";
        res.datos.id_modalidad2=res.datos.id_modalidad2+"";
        res.datos.iduniversidad=res.datos.iduniversidad+"";

        //
        this.myform.patchValue({
          naturaleza:res.datos.id_naturaleza,
        });

        res.datos.id_naturaleza=res.datos.id_naturaleza+"";
        res.datos.id_becasapoyo=res.datos.id_becasapoyo+"";
        res.datos.id_monto= res.datos.id_monto+"";
        this.beneficios_naturaleza()
        //alergias
        res.datos.id_alergias=res.datos.id_alergias+"";


        if(res.datos.s_aprobado)
        {
          if(res.datos.s_aprobado.pdf==null)
          {
            this.verificar_pdf=true;
          }
          else{
            this.myform.patchValue({
            pdf_final: res.datos.s_aprobado.pdf,
            nombre_final: this.extraer_nombre(res.datos.s_aprobado.pdf),
            })
          }
        }

        var fecha=res.datos.fecha_inicio as string;
        var fecha_fi=res.datos.fecha_fin as string;
        var fecha_i= new Date(fecha);
        var fecha_f=new Date(fecha_fi);
        
        this.myform.patchValue({
         //solicitud
          nombre_facultad:res.datos.nombre_facultad.trim(),
          modalidad:res.datos.id_modalidad1,
          tipo_destino:res.datos.id_modalidad2,
          universidad_destino:res.datos.iduniversidad,
          campus_destino:res.datos.campus_destino,
          numero_semestre:res.datos.numero_semestre,
          fecha_inicio:fecha_i ,
          fecha_fin:fecha_f,
          naturaleza:res.datos.id_naturaleza,
          beca_apoyo: res.datos.id_becasapoyo,
          monto_referencial:res.datos.id_monto,
          
          alergias:res.datos.id_alergias,
          especificar_alergia:res.datos.especificar_alergia,
          enfermedades_tratamiento:res.datos.enfermedades_tratamiento,
          poliza_seguro:res.datos.poliza_seguro,

          //pdf
          pdfcarta_aceptacion:res.datos.pdfcarta_aceptacion,
          nombre_carta:this.extraer_nombre(res.datos.pdfcarta_aceptacion),
          pdftitulo:res.datos.pdftitulo,
          nombre_titulo:this.extraer_nombre(res.datos.pdftitulo),


        });
        

      }
      this.loading=false;
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

  //beneficios
  beneficios_naturaleza()
  {
    this.naturaleza_verificar=true;
    this.becas.getserviciobeneficio(this.myform.get('naturaleza')?.value)
    .subscribe((res:any)=>{
      if(res.estado==true){

        this.naturaleza_verificar=false;
        this.listbeneficio=[];
        this.listbeneficio=res.beneficios;
      }

    });
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
       
       
     }
     else if(this.menu_opcion==2)
     {
       this.menu1=false;
       this.menu2=true;
       this.menu3=false;
     
     }
     else if(this.menu_opcion==3)
     {
       this.menu1=false;
       this.menu2=false;
       this.menu3=true;
     }
    
 
   }

   // funcion para poner el nombre del archivo
  extraer_nombre(nombre:string)
  {
    if(nombre!=null)
    {
      var separar=nombre.split('/');
      var nombre_archivo=separar[separar.length-1];
      return nombre_archivo;

    }
   return "";
  }

   //documento
   fileEvent(event:any,numero:number)
  {
    const archivoCapturado = event.target.files[0];
    if (archivoCapturado.type == "application/pdf") {
      if(numero==1)
        {
          if(this.myform.get('pdfcarta_aceptacion')?.value.length==0 || this.myform.get('pdfcarta_aceptacion')?.value.length==1)
          {
            this.myform.patchValue({
              carta_aceptacion: archivoCapturado,
              pdfcarta_aceptacion:'',
              nombre_carta: archivoCapturado.name,
              verificar1: true,
            });
            return;
            

          }
          if(this.myform.get('pdfcarta_aceptacion')?.value.length>1)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title: 'Esta seguro que desea cambiar el archivo....?',
              icon: 'warning',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Guardar',
              denyButtonText: `No Guardar`,
        
            }).then((result)=>{
              if(result.isConfirmed){
                this.myform.patchValue({
                  carta_aceptacion: archivoCapturado,
                  pdfcarta_aceptacion:'',
                  nombre_carta: archivoCapturado.name,
                  verificar1: true,
                });

              }
            })
            

          }



        }
        if(numero==2)
        {
          if(this.myform.get('pdftitulo')?.value.length==0 || this.myform.get('pdftitulo')?.value.length==1)
          {
            this.myform.patchValue({
              titulo: archivoCapturado,
              pdftitulo:'',
              nombre_titulo: archivoCapturado.name,
              verificar2: true,
            });
            return;
            

          }
          if(this.myform.get('pdftitulo')?.value.length>1)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title: 'Esta seguro que desea cambiar el archivo....?',
              icon: 'warning',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Guardar',
              denyButtonText: `No Guardar`,
        
            }).then((result)=>{
              if(result.isConfirmed){
                this.myform.patchValue({
                  titulo: archivoCapturado,
                  pdftitulo:'',
                  nombre_titulo: archivoCapturado.name,
                  verificar2: true,
                });

              }
            })
            

          }

        }

        if(numero==3)
        {
          if(this.myform.get('pdf_final')?.value.length==0 || this.myform.get('pdf_final')?.value.length==1)
          {
            this.myform.patchValue({
              final: archivoCapturado,
              pdf_final:'',
              nombre_final: archivoCapturado.name,
              verificar3: true,
            });
            return;
            

          }
          if(this.myform.get('pdf_final')?.value.length>1)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title: 'Esta seguro que desea cambiar el archivo....?',
              icon: 'warning',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Guardar',
              denyButtonText: `No Guardar`,
        
            }).then((result)=>{
              if(result.isConfirmed){
                this.myform.patchValue({
                  final: archivoCapturado,
                  pdf_final:'',
                  nombre_final: archivoCapturado.name,
                  verificar3: true,
                });

              }
            })
            

          }

        }

     }
     else{
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

  eliminar_archivo(numero:number){
    if (numero == 1) {
      this.myform.patchValue({
        carta_aceptacion: [new File([""], ""), Validators.required],
        pdfcarta_aceptacion:'',
        nombre_carta: '',
        verificar1: false
      });
    }
     if (numero == 2) {
      this.myform.patchValue({
        titulo: [new File([""], ""), Validators.required],
        pdftitulo:'',
        nombre_titulo: '',
        verificar2: false
      });

    }
     if (numero == 3) {
      this.myform.patchValue({
        final: [new File([""], ""), Validators.required],
        pdf_final:'',
        nombre_final: '',
        verificar3: false
      });

    }

  }

  guardar_documentos()
  {
    if(this.myform.get('nombre_carta')?.value.length==0 || this.myform.get('nombre_titulo')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Error documentos faltantes....!!",
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
    if(this.myform.get('verificar1')?.value==false && this.myform.get('verificar2')?.value==false)
    {
      this.boton_documentos=true;
      this.verificar_boton_documentos=true;
      this.comprobador2=true;
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
        this.boton_documentos=true;
        this.comprobador2=true;
        this.verificar_boton_documentos=true;
        if(this.myform.get('verificar1')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('carta_aceptacion')?.value);
          this.becas.addftpsolicitudbecas(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfcarta_aceptacion:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar2')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('titulo')?.value);
          this.becas.addftpsolicitudbecas(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdftitulo:res.documento
              })
            }
          });

        }

      }
    });
    

  }

  guardar_documento_final(){
    if(this.myform.get('nombre_final')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Error Agregar un documento Final....!!",
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

    if(this.myform.get('verificar3')?.value ==false)
    {
      this.boton_documento_final=true;
      this.verificar_boton_final=true;
      this.comprobador3=true;
      return;

    }
    this.verificar_boton_final=true;
    this.loading=true;
    this.boton_documento_final=true;
    const formData = new FormData();
    formData.append('document', this.myform.get('final')?.value);
    this.becas.addsolicitudfinalftp(formData)
    .subscribe((res:any)=>{
      this.loading=false;
      if(res.estado==true)
      {
        this.myform.patchValue({
          pdf_final:res.documento
        });
      }

    });

  }

  guardar()
  {
    if(this.tipo_estado=="A")
    {
      if(this.verificar_pdf==false)
      {
        if(this.myform.get('pdf_final')?.value.length==0)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Error Documento final sin subir",
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

      if(this.myform.get('fecha_inicio')?.value==null)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Error Fecha inicio no ingresada....!!!",
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

        if(this.myform.get('fecha_fin')?.value==null)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Error Fecha fin no ingresada....!!!",
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

        //subir la informacion editar de la solicitud

        let json={
          data:this.myform.value  
        }
        this.becas.updateSolicitudBecas(json)
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
              title:'Solicitud Actualizada con exito.....!!!',
              icon:'success'
            });
            this.router.navigate(['/utmricb/becas/editarsolicitudes-becas']);

          }
        })




    }

    if(this.tipo_estado=='P')
    {
        //carrera destino
      if(this.myform.get('campus_destino')?.value.length==0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar campus destino",
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
          // semestre cursar
      if(this.myform.get('numero_semestre')?.value.length==0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar el numero de semestres ",
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
      if(this.myform.get('numero_semestre')?.value<0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar numeros positivos.....!!!",
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

      //fecha inicio 
      if(this.myform.get('fecha_inicio')?.value==null)
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
      if(this.myform.get('fecha_fin')?.value==null)
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

       //especificar Alergias   
    if(this.myform.get('especificar_alergia')?.value.length==0)
    {
      
     this.myform.patchValue({
         especificar_alergia:'<p>&nbsp;No definido</p>'
     });
     
    }
    //Enfermedades Persistentes y tratamiento 
    if(this.myform.get('enfermedades_tratamiento')?.value.length==0)
    {
      
     this.myform.patchValue({
      enfermedades_tratamiento:'<p>&nbsp;No definido</p>'
     });
    }
    if(this.verificar_boton_documentos==false)
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
  if(this.myform.get('pdfcarta_aceptacion')?.value.length==0 || this.myform.get('pdftitulo')?.value.length==0)
  {
    this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
      data:{
        titulo:'Error.....',
        mensaje:"Cargando datos documentos....!! Espere unos segundos",
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

  let json={
    data:this.myform.value
  }
  this.becas.updateSolicitudBecas(json)
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
              title:'Solicitud Actualizada con exito.....!!!',
              icon:'success'
            });
            this.router.navigate(['/utmricb/becas/editarsolicitudes-becas']);

          }
        })



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

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Redireccionamiento',
          text: 'Se redirecciona a la pagina principal de Editar Becas',
          icon: 'success',
        });
        this.router.navigate(['/utmricb/becas/editarsolicitudes-becas']);


      }
    })

  }



}
