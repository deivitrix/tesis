import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralMovilidadService } from 'src/app/services/generalMovilidad/general-movilidad.service';
//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';


@Component({
  selector: 'app-editarsolicitudes-movilidad-componente',
  templateUrl: './editarsolicitudes-movilidad-componente.component.html',
  styleUrls: ['./editarsolicitudes-movilidad-componente.component.css']
})
export class EditarsolicitudesMovilidadComponenteComponent implements OnInit {

  //solicitud_id
  id="";
  // tipo
  tipo_estado="";

  //lista 
  listsolicitud:any[]=[];

  //loading
  loading=true;
  loadingspinner=false;

   // formGroup
   myform: FormGroup;

   // validaciones
   menu1 = false;
   menu2 = false;
   menu3 = false;

   //menu
  menu_opcion: number = 0;

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

  //comprobar enabled o disabled
  comprobador=false;

  //comprobador 2 enable o disabled de los botones
  comprobador2=false;

  //verificar pdf final en Aprobados
  verificar_pdf=false;

   //controlador del editor de texto
   public Editor = ClassicEditor;

   //boton añadir materias , borrar materias
   boton_add_materias=false;
   boton_delete_materias=false;

   //boton guardar documentos
   boton_documentos=false;
   boton_documento_final=false;
  
   //boton documento final verificar
   verificar_boton_final=false;

   //verficar boton guardar
   verificar_boton_documentos=false;




  constructor(private rutaActiva: ActivatedRoute,private movilidad:GeneralMovilidadService, private mostrar: FormBuilder,
    private router:Router,public snackBar:MatSnackBar) { 
    this.id=rutaActiva.snapshot.params.id;
    this.tipo_estado=rutaActiva.snapshot.params.tipo;
    
    if(this.tipo_estado=="A")
    {
      this.comprobador=true;
      this.boton_add_materias=true;
      this.boton_delete_materias=true;
      this.boton_documentos=true;
      this.myform = this.mostrar.group({
        //solicitud
        id:this.id,
        tipo_documento:this.tipo_estado,
        nombre_carrera:[{ value: '', disabled: true }],
        modalidad:[{ value: '', disabled: true }],
        tipo_destino:[{ value: '', disabled: true }],
        universidad_destino:[{ value: '', disabled: true }],
        carrera_destino:[{ value: '', disabled: true }],
        semestre_cursar:[{ value: '', disabled: true }],
        fecha_inicio:[{ value: '', disabled: false }],
        fecha_fin:[{ value: '', disabled: false }],
        naturaleza:[{ value: '', disabled: true }],
        beca_apoyo:[{ value: '', disabled: true }],
        monto_referencial:[{ value: '', disabled: true }],
        
        alergias:[{ value: '', disabled: true }],
        especificar_alergia:[{ value: '', disabled: true }],
        enfermedades_tratamiento:[{ value: '', disabled: true }],
        poliza_seguro:[{ value: '', disabled: true }],
  
        //materias
        materias: this.mostrar.array([]),
  
         //documentos
         certificado_matricula: [new File([""], ""), Validators.required],
         pdfcertificado_matricula: ["", Validators.required],
         nombre_certificado: [{ value: '', disabled: true }],
         verificar1: [false],
         copia_record: [new File([""], ""), Validators.required],
         pdfcopia_record: ["", Validators.required],
         nombre_copia: [{ value: '', disabled: true }],
         verificar2: [false],
         solicitud_carta: [new File([""], ""), Validators.required],
         pdfsolicitud_carta: ["", Validators.required],
         nombre_solicitud: [{ value: '', disabled: true }],
         verificar3: [false],
         cartas_recomendacion: [new File([""], ""), Validators.required],
         pdfcartas_recomendacion: ["", Validators.required],
         nombre_cartas: [{ value: '', disabled: true }],
         verificar4: [false],
         no_sancion: [new File([""], ""), Validators.required],
         pdfno_sancion: ["", Validators.required],
         nombre_no_sancion: [{ value: '', disabled: true }],
         verificar5: [false],
         fotos: [new File([""], ""), Validators.required],
         pdffotos: ["", Validators.required],
         nombre_fotos: [{ value: '', disabled: true }],
         verificar6: [false],
         seguro: [new File([""], ""), Validators.required],
         pdfseguro: ["", Validators.required],
         nombre_seguro: [{ value: '', disabled: true }],
         verificar7: [false],
         examen_psicometria: [new File([""], ""), Validators.required],
         pdfexamen_psicometrico: ["", Validators.required],
         nombre_examen: [{ value: '', disabled: true }],
         verificar8: [false],
         dominio_idioma: [new File([""], ""), Validators.required],
         pdfdominio_idioma: ["", Validators.required],
         nombre_dominio: [{ value: '', disabled: true }],
         verificar9: [false],
         documentos_udestino: [new File([""], ""), Validators.required],
         pdfdocumentos_udestino: ["", Validators.required],
         nombre_documento: [{ value: '', disabled: true }],
         verificar10: [false],
         comprobante_solvencia: [new File([""], ""), Validators.required],
         pdfcomprobante_solvencia: ["", Validators.required],
         nombre_comprobante: [{ value: '', disabled: true }],
         verificar11: [false],

          //documento final 
          final: [new File([""], ""), Validators.required],
          pdf_final: ["", Validators.required],
          nombre_final: [{ value: '', disabled: true }],
          verificar12: [false],
       });



    }
    else
    {
      this.comprobador=false;
      this.boton_add_materias=false;
      this.boton_delete_materias=false;
      this.boton_documentos=false;
      this.myform = this.mostrar.group({
        //solicitud
        id:this.id,
        tipo_documento:this.tipo_estado,
        nombre_carrera:[{ value: '', disabled: true },Validators.required],
        modalidad:[{ value: '', disabled: false }],
        tipo_destino:[{ value: '', disabled: false }],
        universidad_destino:[{ value: '', disabled: false }],
        carrera_destino:[{ value: '', disabled: false },Validators.required],
        semestre_cursar:[{ value: '', disabled: false },Validators.required],
        fecha_inicio:[{ value: '', disabled: false },Validators.required],
        fecha_fin:[{ value: '', disabled: false },Validators.required],
        naturaleza:[{ value: '', disabled: false }],
        beca_apoyo:[{ value: '', disabled: false }],
        monto_referencial:[{ value: '', disabled: false }],
        
        alergias:[{ value: '', disabled: false }],
        id_especificar_alergias:[''],
        especificar_alergia:[{ value: '', disabled: false }],
        id_enfermedades_cronicas:[''],
        enfermedades_tratamiento:[{ value: '', disabled: false }],
        poliza_seguro:[{ value: '', disabled: false }],
  
        //materias
        materias: this.mostrar.array([]),
        eliminar_materia:this.mostrar.array([]),
  
         //documentos
         certificado_matricula: [new File([""], ""), Validators.required],
         pdfcertificado_matricula: ["", Validators.required],
         nombre_certificado: [{ value: '', disabled: true }],
         verificar1: [false],
         copia_record: [new File([""], ""), Validators.required],
         pdfcopia_record: ["", Validators.required],
         nombre_copia: [{ value: '', disabled: true }],
         verificar2: [false],
         solicitud_carta: [new File([""], ""), Validators.required],
         pdfsolicitud_carta: ["", Validators.required],
         nombre_solicitud: [{ value: '', disabled: true }],
         verificar3: [false],
         cartas_recomendacion: [new File([""], ""), Validators.required],
         pdfcartas_recomendacion: ["", Validators.required],
         nombre_cartas: [{ value: '', disabled: true }],
         verificar4: [false],
         no_sancion: [new File([""], ""), Validators.required],
         pdfno_sancion: ["", Validators.required],
         nombre_no_sancion: [{ value: '', disabled: true }],
         verificar5: [false],
         fotos: [new File([""], ""), Validators.required],
         pdffotos: ["", Validators.required],
         nombre_fotos: [{ value: '', disabled: true }],
         verificar6: [false],
         seguro: [new File([""], ""), Validators.required],
         pdfseguro: ["", Validators.required],
         nombre_seguro: [{ value: '', disabled: true }],
         verificar7: [false],
         examen_psicometria: [new File([""], ""), Validators.required],
         pdfexamen_psicometrico: ["", Validators.required],
         nombre_examen: [{ value: '', disabled: true }],
         verificar8: [false],
         dominio_idioma: [new File([""], ""), Validators.required],
         pdfdominio_idioma: ["", Validators.required],
         nombre_dominio: [{ value: '', disabled: true }],
         verificar9: [false],
         documento_udestino: [new File([""], ""), Validators.required],
         pdfdocumentos_udestino: ["", Validators.required],
         nombre_documento: [{ value: '', disabled: true }],
         verificar10: [false],
         comprobante_solvencia: [new File([""], ""), Validators.required],
         pdfcomprobante_solvencia: ["", Validators.required],
         nombre_comprobante: [{ value: '', disabled: true }],
         verificar11: [false],


         //documento final 
         final: [new File([""], ""), Validators.required],
         pdf_final: ["", Validators.required],
         nombre_final: [{ value: '', disabled: true }],
         verificar12: [false],
       });

    }
    
   

  }

  ngOnInit(): void {
    this.menu(0)
    this.getmodalidad();
    this.getuniversidad();
    this.getnaturaleza();
    this.getapoyo();
    this.getmonto();
    this.getalergias();
    this.getSolicitudBecas()
  }



  getSolicitudBecas()
  {
    this.movilidad.getconsultarMovilidadeditar(this.id,this.tipo_estado)
    .subscribe((res:any)=>{
      console.log(res);
     
      if(res.estado==true)
      {
        this.verificar_pdf=false;
        res.datos.id_modalidad1=res.datos.id_modalidad1+"";
        res.datos.id_modalidad2=res.datos.id_modalidad2+"";
        res.datos.iduniversidad=res.datos.iduniversidad+"";

        //
        res.datos.naturaleza_id=res.datos.naturaleza_id+"";
        res.datos.id_becas=res.datos.id_becas+"";
        res.datos.id_monto= res.datos.id_monto+"";

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
          nombre_carrera:res.datos.nombre_carrera,
          modalidad:res.datos.id_modalidad1,
          tipo_destino:res.datos.id_modalidad2,
          universidad_destino:res.datos.iduniversidad,
          carrera_destino:res.datos.carrera_destino,
          semestre_cursar:res.datos.semestre_cursar,
          fecha_inicio:fecha_i ,
          fecha_fin:fecha_f,
          naturaleza:res.datos.naturaleza_id,
          beca_apoyo:res.datos.id_becas,
          monto_referencial:res.datos.id_monto,
          
          alergias:res.datos.id_alergias,
          id_especificar_alergias:res.datos.id_alergias,
          especificar_alergia:res.datos.especificar_alergia,
          id_enfermedades_cronicas:res.datos.id_enfermedades_cronicas,
          enfermedades_tratamiento:res.datos.enfermedades_tratamiento,
          poliza_seguro:res.datos.poliza_seguro,

          //pdf
          pdfcertificado_matricula:res.datos.pdfcertificado_matricula,
          nombre_certificado:this.extraer_nombre(res.datos.pdfcertificado_matricula),
          pdfcopia_record:res.datos.pdfcopia_record,
          nombre_copia:this.extraer_nombre(res.datos.pdfcopia_record),
          pdfsolicitud_carta:res.datos.pdfsolicitud_carta,
          nombre_solicitud:this.extraer_nombre(res.datos.pdfsolicitud_carta),
          pdfcartas_recomendacion:res.datos.pdfcartas_recomendacion,
          nombre_cartas:this.extraer_nombre(res.datos.pdfcartas_recomendacion),
          pdfno_sancion:res.datos.pdfno_sancion,
          nombre_no_sancion:this.extraer_nombre(res.datos.pdfno_sancion),
          pdffotos:res.datos.pdffotos,
          nombre_fotos:this.extraer_nombre(res.datos.pdffotos),
          pdfseguro:res.datos.pdfseguro,
          nombre_seguro:this.extraer_nombre(res.datos.pdfseguro),
          pdfexamen_psicometrico:res.datos.pdfexamen_psicometrico,
          nombre_examen:this.extraer_nombre(res.datos.pdfexamen_psicometrico),
          pdfdominio_idioma:res.datos.pdfdominio_idioma,
          nombre_dominio:this.extraer_nombre(res.datos.pdfdominio_idioma),
          pdfdocumentos_udestino:res.datos.pdfdocumentos_udestino,
          nombre_documento:this.extraer_nombre(res.datos.pdfdocumentos_udestino),
          pdfcomprobante_solvencia:res.datos.pdfcomprobante_solvencia,
          nombre_comprobante:this.extraer_nombre(res.datos.pdfcomprobante_solvencia),
        });
        this.agregarmaterias(res.datos);
        this.loading=false;
      }
      else{
        this.loading=false;
      }

    });

  }

  menu(id:number){
    
    if (this.menu_opcion == 0) {
      this.menu_opcion = 1;
    }
    else {
      this.menu_opcion = id;
    }

    if (this.menu_opcion == 1) {
      this.menu1 = true;
      this.menu2 = false;
      this.menu3 = false;
     

    }
    else if (this.menu_opcion == 2) {
      this.menu1 = false;
      this.menu2 = true;
      this.menu3 = false;
    
    }
    else if (this.menu_opcion == 3) {
      this.menu1 = false;
      this.menu2 = false;
      this.menu3 = true;
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

   //modelo de FormArray de materias
 get materias() {
  return this.myform.get('materias') as FormArray;
}

  agregarmaterias(usuario:any)
  {
    for (var i = 0; i < usuario.materias.length; i++) 
    {
      
      if(this.tipo_estado=='A')
      {
        const materiasFormGroup = this.mostrar.group({

          id: usuario.materias[i].id,
          materia_origen: [{ value: usuario.materias[i].materia_origen, disabled: true }],
          clave_origen: [{ value: usuario.materias[i].codigo_origen, disabled: true }],
          materia_destino: [{ value: usuario.materias[i].materia_destino, disabled: true }],
          clave_destino: [{ value: usuario.materias[i].codigo_destino, disabled: true }]
        });
        this.materias.push(materiasFormGroup);
      }
      else
      {
        const materiasFormGroup = this.mostrar.group({

          id: usuario.materias[i].id,
          materia_origen: [{ value: usuario.materias[i].materia_origen, disabled: false }],
          clave_origen: [{ value: usuario.materias[i].codigo_origen, disabled: false }],
          materia_destino: [{ value: usuario.materias[i].materia_destino, disabled: false }],
          clave_destino: [{ value: usuario.materias[i].codigo_destino, disabled: false }]
        });
        this.materias.push(materiasFormGroup);
      }
     
     


    }

  }

  agregarmaterias_add()
  {
    const materiasFormGroup = this.mostrar.group({
      id: 0,
      materia_origen: ['', Validators.required],
      clave_origen: [''],
      materia_destino: ['', Validators.required],
      clave_destino: [''],
    });
    this.materias.push(materiasFormGroup);

  }

  removerMateria(index: number) {
    if(this.materias.controls[index].value.id==0)
    {
      this.materias.removeAt(index);
    }
    else
    {
      const eliminar=this.mostrar.group({ 
        id:this.materias.controls[index].value.id
      });
      this.eliminar_materias.push(eliminar);
      this.materias.removeAt(index);
    }
    
    
  }

  get eliminar_materias(){
    return this.myform.get('eliminar_materia') as FormArray;
  }



  //selector modalidad
  getmodalidad() {
    this.movilidad.getserviciomodalidad("0")
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

    this.movilidad.getserviciomodalidad("1")
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
    this.movilidad.getserviciouniversidades()
      .subscribe((res: any) => {
        this.listuniver = res;

      })
  }

  //selector naturaleza
  getnaturaleza() {
    this.movilidad.getservicionaturaleza("M")
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
    this.movilidad.getservicioapoyo("M")
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
    this.movilidad.getserviciomonto("M")
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
    this.movilidad.getservicioalergias()
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

  //documento
  fileEvent(event:any,numero:number){
    const archivoCapturado = event.target.files[0];
    if (archivoCapturado.type == "application/pdf") {
        if(numero==1)
        {
          if(this.myform.get('pdfcertificado_matricula')?.value.length==0 || this.myform.get('pdfcertificado_matricula')?.value.length==1)
          {
            this.myform.patchValue({
              certificado_matricula: archivoCapturado,
              pdfcertificado_matricula:'',
              nombre_certificado: archivoCapturado.name,
              verificar1: true,
            });
            return;
            

          }
          if(this.myform.get('pdfcertificado_matricula')?.value.length>1)
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
                  certificado_matricula: archivoCapturado,
                  pdfcertificado_matricula:'',
                  nombre_certificado: archivoCapturado.name,
                  verificar1: true,
                });

              }
            })
            

          }



        }
        if(numero==2)
        {
          if(this.myform.get('pdfcopia_record')?.value.length==0 || this.myform.get('pdfcopia_record')?.value.length==1)
          {
            this.myform.patchValue({
              copia_record: archivoCapturado,
              pdfcopia_record:'',
              nombre_copia: archivoCapturado.name,
              verificar2: true,
            });
            return;
            

          }
          if(this.myform.get('pdfcopia_record')?.value.length>1)
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
                  copia_record: archivoCapturado,
                  pdfcopia_record:'',
                  nombre_copia: archivoCapturado.name,
                  verificar2: true,
                });

              }
            })
            

          }

        }

        if(numero==3)
        {
          if(this.myform.get('pdfsolicitud_carta')?.value.length==0 || this.myform.get('pdfsolicitud_carta')?.value.length==1)
          {
            this.myform.patchValue({
              solicitud_carta: archivoCapturado,
              pdfsolicitud_carta:'',
              nombre_solicitud: archivoCapturado.name,
              verificar3: true,
            });
            return;
            

          }
          if(this.myform.get('pdfsolicitud_carta')?.value.length>1)
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
                  solicitud_carta: archivoCapturado,
                  pdfsolicitud_carta:'',
                  nombre_solicitud: archivoCapturado.name,
                  verificar3: true,
                });

              }
            })
            

          }

        }

        if(numero==4)
        {
          if(this.myform.get(' pdfcartas_recomendacion')?.value.length==0 || this.myform.get(' pdfcartas_recomendacion')?.value.length==1)
          {
            this.myform.patchValue({
              cartas_recomendacion: archivoCapturado,
              pdfcartas_recomendacion:'',
              nombre_cartas: archivoCapturado.name,
              verificar4: true,
            });
            return;
            

          }
          if(this.myform.get(' pdfcartas_recomendacion')?.value.length>1)
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
                  cartas_recomendacion: archivoCapturado,
                  pdfcartas_recomendacion:'',
                  nombre_cartas: archivoCapturado.name,
                  verificar4: true,
                });

              }
            })
            

          }

        }

        if(numero==5)
        {
          if(this.myform.get('pdfno_sancion')?.value.length==0 || this.myform.get('pdfno_sancion')?.value.length==1)
          {
            this.myform.patchValue({
              no_sancion: archivoCapturado,
              pdfno_sancion:'',
              nombre_no_sancion: archivoCapturado.name,
              verificar5: true,
            });
            return;
            

          }
          if(this.myform.get('pdfno_sancion')?.value.length>1)
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
                  no_sancion: archivoCapturado,
                  pdfno_sancion:'',
                  nombre_no_sancion: archivoCapturado.name,
                  verificar5: true,
                });

              }
            })
            

          }

        }

        if(numero==6)
        {
          if(this.myform.get('pdffotos')?.value.length==0 || this.myform.get('pdffotos')?.value.length==1)
          {
            this.myform.patchValue({
              fotos: archivoCapturado,
              pdffotos:'',
              nombre_fotos: archivoCapturado.name,
              verificar6: true,
            });
            return;
            

          }
          if(this.myform.get('pdffotos')?.value.length>1)
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
                  fotos: archivoCapturado,
                  pdffotos:'',
                  nombre_fotos: archivoCapturado.name,
                  verificar6: true,
                });

              }
            })
            

          }

        }

        if(numero==7)
        {
          if(this.myform.get('pdfseguro')?.value.length==0 || this.myform.get('pdfseguro')?.value.length==1)
          {
            this.myform.patchValue({
              seguro: archivoCapturado,
              pdfseguro:'',
              nombre_seguro: archivoCapturado.name,
              verificar7: true,
            });
            return;
            

          }
          if(this.myform.get('pdfseguro')?.value.length>1)
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
                  seguro: archivoCapturado,
                  pdfseguro:'',
                  nombre_seguro: archivoCapturado.name,
                  verificar7: true,
                });

              }
            })
            

          }

        }

        if(numero==8)
        {
          if(this.myform.get('pdfexamen_psicometrico')?.value==null)
          {
            this.myform.patchValue({
              examen_psicometria: archivoCapturado,
              pdfexamen_psicometrico:'',
              nombre_examen: archivoCapturado.name,
              verificar8: true,
            });
            return;

          }
          if(this.myform.get('pdfexamen_psicometrico')?.value.length==0 || this.myform.get('pdfexamen_psicometrico')?.value.length==1)
          {
            this.myform.patchValue({
              examen_psicometria: archivoCapturado,
              pdfexamen_psicometrico:'',
              nombre_examen: archivoCapturado.name,
              verificar8: true,
            });
            return;
            

          }
          if(this.myform.get('pdfexamen_psicometrico')?.value.length>1)
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
                  examen_psicometria: archivoCapturado,
                  pdfexamen_psicometrico:'',
                  nombre_examen: archivoCapturado.name,
                  verificar8: true,
                });

              }
            })
            

          }

        }

        if(numero==9)
        {
          if(this.myform.get('pdfdominio_idioma')?.value==null)
          {
            this.myform.patchValue({
              dominio_idioma: archivoCapturado,
              pdfdominio_idioma:'',
              nombre_dominio: archivoCapturado.name,
              verificar9: true,
            });
            return;

          }
          if(this.myform.get('pdfdominio_idioma')?.value.length==0 || this.myform.get('pdfdominio_idioma')?.value.length==1)
          {
            this.myform.patchValue({
              dominio_idioma: archivoCapturado,
              pdfdominio_idioma:'',
              nombre_dominio: archivoCapturado.name,
              verificar9: true,
            });
            return;
            

          }
          if(this.myform.get('pdfdominio_idioma')?.value.length>1)
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
                  dominio_idioma: archivoCapturado,
                  pdfdominio_idioma:'',
                  nombre_dominio: archivoCapturado.name,
                  verificar9: true,
                });

              }
            })
            

          }

        }

        if(numero==10)
        {
          if(this.myform.get('pdfdocumentos_udestino')?.value.length==0 || this.myform.get('pdfdocumentos_udestino')?.value.length==1)
          {
            this.myform.patchValue({
              documento_udestino: archivoCapturado,
              pdfdocumentos_udestino:'',
              nombre_documento: archivoCapturado.name,
              verificar10: true,
            });
            return;
            

          }
          if(this.myform.get('pdfdocumentos_udestino')?.value.length>1)
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
                  documento_udestino: archivoCapturado,
                  pdfdocumentos_udestino:'',
                  nombre_documento: archivoCapturado.name,
                  verificar10: true,
                });

              }
            })
            

          }

        }

        if(numero==11)
        {
          if(this.myform.get('pdfcomprobante_solvencia')?.value.length==0 || this.myform.get('pdfcomprobante_solvencia')?.value.length==1)
          {
            this.myform.patchValue({
              comprobante_solvencia: archivoCapturado,
              pdfcomprobante_solvencia:'',
              nombre_documento: archivoCapturado.name,
              verificar11: true,
            });
            return;
            

          }
          if(this.myform.get('pdfcomprobante_solvencia')?.value.length>1)
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
                  comprobante_solvencia: archivoCapturado,
                  pdfcomprobante_solvencia:'',
                  nombre_documento: archivoCapturado.name,
                  verificar11: true,
                });

              }
            })
            

          }

        }

        if(numero==12)
        {
          if(this.myform.get('pdf_final')?.value.length==0 || this.myform.get('pdf_final')?.value.length==1)
          {
            this.myform.patchValue({
              final: archivoCapturado,
              pdf_final:'',
              nombre_final: archivoCapturado.name,
              verificar12: true,
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
                  nombre_final:archivoCapturado.name,
                  verificar12: true,
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

  //eliminar archivos
  eliminar_archivo(numero:number){
    if (numero == 1) {
      this.myform.patchValue({
        certificado_matricula: [new File([""], ""), Validators.required],
        pdfcertificado_matricula:'',
        nombre_certificado: '',
        verificar1: false
      });
    }
     if (numero == 2) {
      this.myform.patchValue({
        copia_record: [new File([""], ""), Validators.required],
        pdfcopia_record:'',
        nombre_copia: '',
        verificar2: false
      });

    }
     if (numero == 3) {
      this.myform.patchValue({
        solicitud_carta: [new File([""], ""), Validators.required],
        pdfsolicitud_carta:'',
        nombre_solicitud: '',
        verificar3: false
      });

    }
     if (numero == 4) {
      this.myform.patchValue({
        cartas_recomendacion: [new File([""], ""), Validators.required],
        pdfcartas_recomendacion:'',
        nombre_cartas: '',
        verificar4: false
      });

    }
     if (numero == 5) {
      this.myform.patchValue({
        no_sancion: [new File([""], ""), Validators.required],
        pdfno_sancion:'',
        nombre_no_sancion: '',
        verificar5: false
      });

    }
     if (numero == 6) {
      this.myform.patchValue({
        fotos: [new File([""], ""), Validators.required],
        pdffotos:'',
        nombre_fotos: '',
        verificar6: false
      });

    }
     if (numero == 7) {
      this.myform.patchValue({
        seguro: [new File([""], ""), Validators.required],
        pdfseguro: '',
        nombre_seguro: '',
        verificar7: false
      });

    }
     if (numero == 8) {
      this.myform.patchValue({
        examen_psicometria: [new File([""], ""), Validators.required],
        pdfexamen_psicometrico:'',
        nombre_examen: '',
        verificar8: false
      });

    }
     if (numero == 9) {
      this.myform.patchValue({
        dominio_idioma: [new File([""], ""), Validators.required],
        pdfdominio_idioma:'',
        nombre_dominio: '',
        verificar9: false
      });

    }
     if (numero == 10) {
      this.myform.patchValue({
        documento_udestino: [new File([""], ""), Validators.required],
        pdfdocumentos_udestino:'',
        nombre_documento: '',
        verificar10: false
      });

    }
     if (numero == 11) {
      this.myform.patchValue({
        comprobante_solvencia: [new File([""], ""), Validators.required],
        pdfcomprobante_solvencia:'',
        nombre_comprobante: '',
        verificar11: false
      });

    }

    if (numero == 12) {
      this.myform.patchValue({
        final: [new File([""], ""), Validators.required],
          pdf_final: '',
          nombre_final: '',
          verificar12: [false],
      });

    }

  }



  //guardar_documentos
  guardar_documentos()
  {
    if(this.myform.get('nombre_certificado')?.value.length==0 || this.myform.get('nombre_copia')?.value.length==0 
    || this.myform.get('nombre_solicitud')?.value.length==0 || this.myform.get('nombre_cartas')?.value.length==0
    || this.myform.get('nombre_no_sancion')?.value.length==0 || this.myform.get('nombre_fotos')?.value.length==0
    || this.myform.get('nombre_seguro')?.value.length==0 || this.myform.get('nombre_documento')?.value.length==0
    || this.myform.get('nombre_comprobante')?.value.length==0)
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

    if(this.myform.get('verificar1')?.value==false && this.myform.get('verificar2')?.value==false
    && this.myform.get('verificar3')?.value==false && this.myform.get('verificar4')?.value==false
    && this.myform.get('verificar5')?.value==false && this.myform.get('verificar6')?.value==false
    && this.myform.get('verificar7')?.value==false && this.myform.get('verificar8')?.value==false
    && this.myform.get('verificar9')?.value==false && this.myform.get('verificar10')?.value==false
    && this.myform.get('verificar11')?.value==false)
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
        if(this.myform.get('verificar8')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('examen_psicometria')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfexamen_psicometrico:res.documento
              });
            }

          });
        }
    
        if(this.myform.get('verificar9')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('dominio_idioma')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfdominio_idioma:res.documento
              })
            }
          });
        }
        if(this.myform.get('verificar1')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('certificado_matricula')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfcertificado_matricula:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar2')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('copia_record')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfcopia_record:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar3')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('solicitud_carta')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfsolicitud_carta:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar4')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('cartas_recomendacion')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfcartas_recomendacion:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar5')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('no_sancion')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfno_sancion:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar6')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('fotos')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdffotos:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar7')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('seguro')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfseguro:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar10')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('documentos_udestino')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfdocumentos_udestino:res.documento
              })
            }
          });

        }
        if(this.myform.get('verificar11')?.value==true)
        {
          this.loading=true;
          const formData = new FormData();
          formData.append('document', this.myform.get('comprobante_solvencia')?.value);
          this.movilidad.addftpmovilidad_v2(formData)
          .subscribe((res:any)=>{
            this.loading=false;
            if(res.estado==true)
            {
              this.myform.patchValue({
                pdfcomprobante_solvencia:res.documento
              })
            }
          });

        }
      }
    })

   






    

  }

  //guardar documento final
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
    this.verificar_boton_final=true;
    this.loading=true;
    this.boton_documento_final=true;
    const formData = new FormData();
    formData.append('document', this.myform.get('final')?.value);
    this.movilidad.addsolicitudfinalftp(formData)
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


  guardar(){

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
        this.movilidad.updateSolicitudMovilidad(json)
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
            this.router.navigate(['/utmricb/movilidad/editarsolicitudes-movilidad']);

          }
        })




    }
    if(this.tipo_estado=='P')
    {
        //carrera destino
      if(this.myform.get('carrera_destino')?.value.length==0)
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
          // semestre cursar
      if(this.myform.get('semestre_cursar')?.value.length==0)
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

        //Materias
    if(this.materias.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Ingresar Materias  ",
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
    
    for(var i=0;i<this.materias.length;i++)
    {
      if(this.materias.controls[i].value.materia_origen.length==0)
      { 
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar el nombre de la materia origen  "+(i+1),
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

      if(this.materias.controls[i].value.materia_destino.length==0)
      { 
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar el nombre de la materia destino "+(i+1),
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
      


    if(this.myform.get('pdfcertificado_matricula')?.value.length==0 || this.myform.get('pdfcopia_record')?.value.length==0 
      || this.myform.get('pdfsolicitud_carta')?.value.length==0 || this.myform.get('pdfcartas_recomendacion')?.value.length==0
      || this.myform.get('pdfno_sancion')?.value.length==0 || this.myform.get('pdffotos')?.value.length==0
      || this.myform.get('pdfseguro')?.value.length==0 || this.myform.get('pdfdocumento_udestino')?.value.length==0
      || this.myform.get('pdfcomprobante_solvencia')?.value.length==0)
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


      if(this.myform.get('verificar8')?.value==true)
      {
        if(this.myform.get('pdfexamen_psicometrico')?.value.length==0)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Cargando datos documentos....!! Espere unos minutos",
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
      if(this.myform.get('verificar9')?.value==true)
      {
        if(this.myform.get('pdfdominio_idioma')?.value.length==0)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Cargando datos documentos....!! Espere unos minutos",
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

      let json={
        data:this.myform.value
      }
      this.movilidad.updateSolicitudMovilidad(json)
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
          this.router.navigate(['/utmricb/movilidad/editarsolicitudes-movilidad']);

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
          text: 'Se redirecciona a la pagina principal de Editar Movilidad',
          icon: 'success',
        });
        this.router.navigate(['/utmricb/movilidad/editarsolicitudes-movilidad']);


      }
    })

  }






}
