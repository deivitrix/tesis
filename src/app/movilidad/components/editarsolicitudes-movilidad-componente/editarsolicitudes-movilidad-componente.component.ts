import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralMovilidadService } from 'src/app/services/generalMovilidad/general-movilidad.service';

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

   // formGroup
   myform: FormGroup;

   // validaciones
   menu1 = false;
   menu2 = false;
   menu3 = false;

   //menu
  menu_opcion: number = 0;

  constructor(private rutaActiva: ActivatedRoute,private movilidad:GeneralMovilidadService, private mostrar: FormBuilder) { 
    this.id=rutaActiva.snapshot.params.id;
    this.tipo_estado=rutaActiva.snapshot.params.tipo;
    
    if(this.tipo_estado=="A")
    {
      this.myform = this.mostrar.group({
        //solicitud
        nombre_carrera:[{ value: '', disabled: true }],
        modalidad:[{ value: '', disabled: true }],
        tipo_destino:[{ value: '', disabled: true }],
        universidad_destino:[{ value: '', disabled: true }],
        carrera_destino:[{ value: '', disabled: true }],
        semestre_cursar:[{ value: '', disabled: true }],
        fecha_inicio:[{ value: '', disabled: true }],
        fecha_fin:[{ value: '', disabled: true }],
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
         documento_udestino: [new File([""], ""), Validators.required],
         pdfdocumento_udestino: ["", Validators.required],
         nombre_documento: [{ value: '', disabled: true }],
         verificar10: [false],
         comprobante_solvencia: [new File([""], ""), Validators.required],
         pdfcomprobante_solvencia: ["", Validators.required],
         nombre_comprobante: [{ value: '', disabled: true }],
         verificar11: [false],
       });



    }
    else
    {
      this.myform = this.mostrar.group({
        //solicitud
        nombre_carrera:[{ value: '', disabled: true }],
        modalidad:[{ value: '', disabled: true }],
        tipo_destino:[{ value: '', disabled: true }],
        universidad_destino:[{ value: '', disabled: true }],
        carrera_destino:[{ value: '', disabled: true }],
        semestre_cursar:[{ value: '', disabled: true }],
        fecha_inicio:[{ value: '', disabled: true }],
        fecha_fin:[{ value: '', disabled: true }],
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
         documento_udestino: [new File([""], ""), Validators.required],
         pdfdocumento_udestino: ["", Validators.required],
         nombre_documento: [{ value: '', disabled: true }],
         verificar10: [false],
         comprobante_solvencia: [new File([""], ""), Validators.required],
         pdfcomprobante_solvencia: ["", Validators.required],
         nombre_comprobante: [{ value: '', disabled: true }],
         verificar11: [false],
       });

    }
    
   

  }

  ngOnInit(): void {
    this.getSolicitudBecas()
    this.menu(0)
  }



  getSolicitudBecas()
  {
    this.movilidad.getconsultarMovilidadeditar(this.id,this.tipo_estado)
    .subscribe((res:any)=>{
      console.log(res);
      this.loading=false;
      if(res.estado==true)
      {
        this.listsolicitud=res.datos;

        if(this.tipo_estado=="A")
        {


        }

        else
        {


        }
        this.myform.patchValue({
          //solicitud
          nombre_carrera:res.datos.nombre_carrera,
          modalidad:res.datos.modalidad,
          tipo_destino:res.datos.tipo_destino,
          universidad_destino:res.datos.universidad_destino,
          carrera_destino:res.datos.carrera_destino,
          semestre_cursar:res.datos.semestre_cursar,
          fecha_inicio:res.datos.fecha_inicio,
          fecha_fin:res.datos.fecha_fin,
          naturaleza:res.datos.naturaleza,
          beca_apoyo:res.datos.beca_apoyo,
          monto_referencial:res.datos.monto_referencial,
          
          alergias:res.datos.alergias,
          especificar_alergia:res.datos.especificar_alergia,
          enfermedades_tratamiento:res.datos.enfermedades_tratamiento,
          poliza_seguro:res.datos.poliza_seguro,

          //pdf
          pdfcertificado_matricula:res.datos.pdfcertificado_matricula,
          pdfcopia_record:res.datos.pdfcopia_record,
          pdfsolicitud_carta:res.datos.pdfsolicitud_carta,
          pdfcartas_recomendacion:res.datos.pdfcartas_recomendacion,
          pdfno_sancion:res.datos.pdfno_sancion,
          pdffotos:res.datos.pdffotos,
          pdfseguro:res.datos.pdfseguro,
          pdfexamen_psicometrico:res.datos.pdfexamen_psicometrico,
          pdfdominio_idioma:res.datos.pdfdominio_idioma,
          pdfdocumentos_udestino:res.datos.pdfdocumentos_udestino,
          pdfcomprobante_solvencia:res.datos.pdfcomprobante_solvencia,
        });
        this.agregarmaterias(res.datos);
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

   //modelo de FormArray de materias
 get materias() {
  return this.myform.get('materias') as FormArray;
}

  agregarmaterias(usuario:any)
  {
    for (var i = 0; i < usuario.materias.length; i++) 
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

  }





}
