import { GeneralMovilidadService } from './../../../services/generalMovilidad/general-movilidad.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-formulario-movilidad',
  templateUrl: './formulario-movilidad.component.html',
  styleUrls: ['./formulario-movilidad.component.css']
})
export class FormularioMovilidadComponent implements OnInit {

  //controlador del editor de texto
  public Editor = ClassicEditor;

  //cedula del usuario
  cedula:string="";

  //loading
  loading=true;

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
  menu6=false;


  //botones
  botonguardar=false;
  botoncancelar=false;

  //selector carrera
  listaCarrera:any[]=[];

  //select modalidad
  modalidad1:any[]=[];
  modalidad2:any[]=[];

  modalidad1aux:any[]=[];
  modalidad2aux:any[]=[];


  //selector universidades
  listuniver:any[]=[];

  //selector naturaleza
  listnatu:any[]=[];
  listnatu_aux:any[]=[];

  //selector apoyo
  listapoyo:any[]=[];
  listapoyo_aux:any[]=[];

  //selector monto
  listmonto:any[]=[];
  listmonto_aux:any[]=[];


  //selector alergias
  listalergias:any[]=[];
  listalergias_aux:any[]=[];




  constructor(private rutaActiva: ActivatedRoute, private movilidad:GeneralMovilidadService,private ingresar:FormBuilder,
    private router:Router) {
    this.cedula=rutaActiva.snapshot.params.cedula;
    this.myform=this.ingresar.group({
      idpersonal:[''],
      cedula:[{value:'',disabled: true}],
      Tipo_Sangre:[{value:'',disabled: true}],
      discapacidad:[{value:'',disabled: true}],
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

      periodo:[{value:'',disabled: true}],
      carrera:[{value:'',disabled: true}],
      promedio:[{value:'',disabled: true}],

      carreras:ingresar.array([])
    });
    this.mysolicitud=this.ingresar.group({
      idescuela:['',Validators.required],
      modalidad1:['',Validators.required],
      modalidad2:['',Validators.required],
      id_universidad:['',Validators.required],
      carrera_destino:['',Validators.required],
      semestre_cursar:['',Validators.required],
      fecha_inicio:['',Validators.required],
      fecha_fin:['',Validators.required],
      id_naturaleza:['',Validators.required],
      id_becas:['',Validators.required],
      id_monto:['',Validators.required],
      id_alergias:['',Validators.required],
      especificar_alergias:['',Validators.required],
      enfermedades_tratamiento:['',Validators.required],
      poliza_seguro:['',Validators.required],

      tipo_sangre:[{value:'',disabled: true}],
      materias:this.ingresar.array([]),

      //documentos
      certificado_matricula:[new File([""],""),Validators.required],
      pdfcertificado_matricula:["",Validators.required],
      nombre_certificado:[{value:'',disabled: true}],
      verificar1:[false],
      copia_record:[new File([""],""),Validators.required],
      pdfcopia_record:["",Validators.required],
      nombre_copia:[{value:'',disabled: true}],
      verificar2:[false],
      solicitud_carta:[new File([""],""),Validators.required],
      pdfsolicitud_carta:["",Validators.required],
      nombre_solicitud:[{value:'',disabled: true}],
      verificar3:[false],
      cartas_recomendacion:[new File([""],""),Validators.required],
      pdfcartas_recomendacion:["",Validators.required],
      nombre_cartas:[{value:'',disabled: true}],
      verificar4:[false],
      no_sancion:[new File([""],""),Validators.required],
      pdfno_sancion:["",Validators.required],
      nombre_no_sancion:[{value:'',disabled: true}],
      verificar5:[false],
      fotos:[new File([""],""),Validators.required],
      pdffotos:["",Validators.required],
      nombre_fotos:[{value:'',disabled: true}],
      verificar6:[false],
      seguro:[new File([""],""),Validators.required],
      pdfseguro:["",Validators.required],
      nombre_seguro:[{value:'',disabled: true}],
      verificar7:[false],
      examen_psicometria:[new File([""],""),Validators.required],
      pdfexamen_psicometrico:["",Validators.required],
      nombre_examen:[{value:'',disabled: true}],
      verificar8:[false],
      dominio_idioma:[new File([""],""),Validators.required],
      pdfdominio_idioma:["",Validators.required],
      nombre_dominio:[{value:'',disabled: true}],
      verificar9:[false],
      documento_udestino:[new File([""],""),Validators.required],
      pdfdocumento_udestino:["",Validators.required],
      nombre_documento:[{value:'',disabled: true}],
      verificar10:[false],
      comprobante_solvencia:[new File([""],""),Validators.required],
      pdfcomprobante_solvencia:["",Validators.required],
      nombre_comprobante:[{value:'',disabled: true}],
      verificar11:[false],

    });

   }

  ngOnInit(): void {
    this.getMovilidadEstudiante()
    this.menu(6)
    this.getmodalidad();
    this.getuniversidad();
    this.getnaturaleza();
    this.getapoyo();
    this.getmonto();
    this.getalergias();
  }

  getMovilidadEstudiante()
  {
    this.movilidad.getMovilidadEstudiante(this.cedula)
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
        discapacidad:res.usuario.Nombre_Discapacidad,
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
       this.agregarcarrera(res.usuario);
       this.selectCarrera(res.usuario);

       this.mysolicitud.patchValue({
         tipo_sangre:res.usuario.Tipo_Sangre
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
          title:res.mensaje,
          icon:'warning'
        });
        this.router.navigate(['/principal/movilidad'])
        return;
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
      this.menu6=false;
      
    }
    else if(this.menu_opcion==2)
    {
      this.menu1=false;
      this.menu2=true;
      this.menu3=false;
      this.menu4=false;
      this.menu5=false;
      this.menu6=false;
    }
    else if(this.menu_opcion==3)
    {
      this.menu1=false;
      this.menu2=false;
      this.menu3=true;
      this.menu4=false;
      this.menu5=false;
      this.menu6=false;
    }
    else if(this.menu_opcion==4)
    {
      this.menu1=false;
      this.menu2=false;
      this.menu3=false;
      this.menu4=true;
      this.menu5=false;
      this.menu6=false;
    }
    else if(this.menu_opcion==5)
    {
      this.menu1=false;
      this.menu2=false;
      this.menu3=false;
      this.menu4=false;
      this.menu5=true;
      this.menu6=false;
    }
    else if(this.menu_opcion==6)
    {
      this.menu1=false;
      this.menu2=false;
      this.menu3=false;
      this.menu4=false;
      this.menu5=false;
      this.menu6=true;
    }

  }

 

  //modelo de carrera
  get carreras(){
    return this.myform.get('carreras') as FormArray;
  }

  agregarcarrera(usuario:any){

    for(var i=0;i<usuario.carrera.length;i++){
      var promedio1="";
      if(usuario.carrera[i].promedio==null)
      {
        promedio1="Periodo Vigente";

      }
      else{
        promedio1=usuario.carrera[i].periodo;

      }
      const carreraFormGroup=this.ingresar.group({
        
        id_escuela:usuario.carrera[i].idescuela,
        escuela_nombre:[{value:usuario.carrera[i].escuela_nombre,disabled: true}] ,
        promedio:[{value:promedio1,disabled: true}],
        periodo:[{value:usuario.carrera[i].periodo,disabled: true}],
        semestre:[{value:usuario.carrera[i].semestre,disabled: true}]
      });
      this.carreras.push(carreraFormGroup);
    }

  }

  selectCarrera(usuario:any)
  {
      for(var i=0;i<usuario.carrera.length;i++){
        let carrera={id_escuela:0,escuela_nombre:"",}
        carrera.id_escuela=usuario.carrera[i].idescuela;
        carrera.escuela_nombre=usuario.carrera[i].escuela_nombre;
        this.listaCarrera.push(carrera)
      }


  }

  //selector modalidad
  getmodalidad()
  {
    this.movilidad.getserviciomodalidad("0")
    .subscribe((res:any)=>{
      if(res.estado==true)
      {
        this.modalidad1aux=res.modalidad;

        this.modalidad1aux.forEach((item:any)=>{
          if(item.estado=="A"){
            this.modalidad1.push(item);
          }

        })


      }
    });

    this.movilidad.getserviciomodalidad("1")
    .subscribe((res:any)=>{
      if(res.estado==true)
      {
        this.modalidad2aux=res.modalidad;
        this.modalidad2aux.forEach((item:any)=>{
          if(item.estado=="A"){
            this.modalidad2.push(item);
          }
        })

      }
    })


  }

   //selector universidad
   getuniversidad(){
     this.movilidad.getserviciouniversidades()
     .subscribe((res:any)=>{
       this.listuniver=res;
       
     })
   }

   //selector naturaleza
   getnaturaleza(){
     this.movilidad.getservicionaturaleza("M")
     .subscribe((res:any)=>{
       if(res.estado==true)
       {
         this.listnatu_aux=res.naturaleza
         this.listnatu_aux.forEach((item:any)=>{
           if(item.estado=="A")
           {
             this.listnatu.push(item);
           }
         })

       }
     })
   }

   //selector apoyo
   getapoyo(){
     this.movilidad.getservicioapoyo("M")
     .subscribe((res:any)=>{
       if(res.estado){
         this.listapoyo_aux=res.apoyo
         this.listapoyo_aux.forEach((item:any)=>{
           if(item.estado=="A")
           {
             this.listapoyo.push(item);

           }
         })

       }
     })
   
   }

   // select monto
   getmonto(){
    this.movilidad.getserviciomonto("M")
    .subscribe((res:any)=>{
      if(res.estado){
        this.listmonto_aux=res.monto
        this.listmonto_aux.forEach((item:any)=>{
          if(item.estado=="A")
          {
            this.listmonto.push(item);

          }
        })

      }
    })
   }

   //selector alergias
   getalergias(){
     this.movilidad.getservicioalergias()
     .subscribe((res:any)=>{
       if(res.estado==true)
       {
        this.listalergias_aux=res.alergias;
        this.listalergias_aux.forEach((item:any)=>{
          if(item.estado=="A")
          {
            this.listalergias.push(item);
          }
        })

       }

     })
   }
  

  //modelo de FormArray de materias
  get materias() {
    return this.mysolicitud.get('materias') as FormArray;
}


agregarMaterias(){

  const materiasFormGroup=this.ingresar.group({
    id:0,
    materia_origen:['',Validators.required],
    clave_origen:[''],
    materia_destino:['',Validators.required],
    clave_destino:[''],
  });
  this.materias.push(materiasFormGroup);
}

removerMateria(index:number)
{
  this.materias.removeAt(index);
}


// agregar files al mysolicitud

fileEvent(event:any,numero:number)
{
  const archivoCapturado=event.target.files[0];
  if(archivoCapturado.type=="application/pdf"){
    if(numero==1)
    {
      this.mysolicitud.patchValue({
        certificado_matricula:archivoCapturado,
        nombre_certificado:archivoCapturado.name,
        verificar1:true
      });
    }
    else if(numero==2){
      this.mysolicitud.patchValue({
        copia_record:archivoCapturado,
        nombre_copia:archivoCapturado.name,
        verificar2:true
      });
  
    }
    else if(numero==3){
      this.mysolicitud.patchValue({
        solicitud_carta:archivoCapturado,
        nombre_solicitud:archivoCapturado.name,
        verificar3:true
      });
  
    }
    else if(numero==4){
      this.mysolicitud.patchValue({
        cartas_recomendacion:archivoCapturado,
        nombre_cartas:archivoCapturado.name,
        verificar4:true
      });
  
    }
    else if(numero==5){
      this.mysolicitud.patchValue({
        no_sancion:archivoCapturado,
        nombre_no_sancion:archivoCapturado.name,
        verificar5:true
      });
  
    }
    else if(numero==6){
      this.mysolicitud.patchValue({
        fotos:archivoCapturado,
        nombre_fotos:archivoCapturado.name,
        verificar6:true
      });
  
    }
    else if(numero==7){
      this.mysolicitud.patchValue({
        seguro:archivoCapturado,
        nombre_seguro:archivoCapturado.name,
        verificar7:true
      });
  
    }
    else if(numero==8){
      this.mysolicitud.patchValue({
        examen_psicometria:archivoCapturado,
        nombre_examen:archivoCapturado.name,
        verificar8:true
      });
  
    }
    else if(numero==9){
      this.mysolicitud.patchValue({
        dominio_idioma:archivoCapturado,
        nombre_dominio:archivoCapturado.name,
        verificar9:true
      });
  
    }
    else if(numero==10){
      this.mysolicitud.patchValue({
        documento_udestino:archivoCapturado,
        nombre_documento:archivoCapturado.name,
        verificar10:true
      });
  
    }
    else if(numero==11){
      this.mysolicitud.patchValue({
        comprobante_solvencia:archivoCapturado,
        nombre_comprobante:archivoCapturado.name,
        verificar11:true
      });
  
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
      title:"Solo se puede escoger archivos PDF ",
      icon:'warning'
    });
  }

 
  

}

// eliminar file
borrar_archivos(){
 

}

//botones 
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
        text:'Se redirecciona a la pagina principal de Movilidad',
        icon:'success',
      });
      this.router.navigate(['/principal/movilidad']);


    }
  })

}

}
