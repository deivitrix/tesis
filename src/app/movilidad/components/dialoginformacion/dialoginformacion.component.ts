import { GeneralMovilidadService } from './../../../services/generalMovilidad/general-movilidad.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialoginformacion',
  templateUrl: './dialoginformacion.component.html',
  styleUrls: ['./dialoginformacion.component.css']
})
export class DialoginformacionComponent implements OnInit {

  //loading
  loading=true;

  // myform
  // formGroup
  myform: FormGroup;

   // validaciones
   menu1 = false;
   menu2 = false;
   menu3 = false;
   menu4 = false;

   //menu
  menu_opcion: number = 0;

  constructor(
    public dialoRef:MatDialogRef<DialoginformacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private movilidad:GeneralMovilidadService,
    private mostrar: FormBuilder
  ) { 

    this.myform = this.mostrar.group({
      idpersonal: [''],
      cedula: [{ value: '', disabled: true }],
      Tipo_Sangre: [{ value: '', disabled: true }],
      discapacidad: [{ value: '', disabled: true }],
      nombres: [{ value: '', disabled: true }],
      apellido1: [{ value: '', disabled: true }],
      apellido2: [{ value: '', disabled: true }],
      fecha_nacimiento: [{ value: '', disabled: true }],
      nacionalidad: [{ value: '', disabled: true }],
      genero: [{ value: '', disabled: true }],
      correo_personal_institucional: [{ value: '', disabled: true }],
      correo_personal_alternativo: [{ value: '', disabled: true }],

      Estado_civil: [{ value: '', disabled: true }],
      Pais: [{ value: '', disabled: true }],
      Provincia: [{ value: '', disabled: true }],
      Canton: [{ value: '', disabled: true }],
      residencia_calle_1: [{ value: '', disabled: true }],
      residencia_calle_2: [{ value: '', disabled: true }],
      residencia_calle_3: [{ value: '', disabled: true }],

      telefono_personal_domicilio: [{ value: '', disabled: true }],
      telefono_personal_celular: [{ value: '', disabled: true }],

      contacto_emergencia_apellidos: [{ value: '', disabled: true }],
      contacto_emergencia_nombres: [{ value: '', disabled: true }],
      contacto_emergencia_telefono_1: [{ value: '', disabled: true }],
      contacto_emergencia_telefono_2: [{ value: '', disabled: true }],

      periodo: [{ value: '', disabled: true }],
      carrera: [{ value: '', disabled: true }],
      promedio: [{ value: '', disabled: true }],

      carreras: mostrar.array([]),

      tipo_sangre: [{ value: '', disabled: true }],

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

      //pdf
      pdfcertificado_matricula:[{ value: '', disabled: true }],
      pdfcopia_record:[{ value: '', disabled: true }],
      pdfsolicitud_carta:[{ value: '', disabled: true }],
      pdfcartas_recomendacion:[{ value: '', disabled: true }],
      pdfno_sancion:[{ value: '', disabled: true }],
      pdffotos:[{ value: '', disabled: true }],
      pdfseguro:[{ value: '', disabled: true }],
      pdfexamen_psicometrico:[{ value: '', disabled: true }],
      pdfdominio_idioma:[{ value: '', disabled: true }],
      pdfdocumentos_udestino:[{ value: '', disabled: true }],
      pdfcomprobante_solvencia:[{ value: '', disabled: true }],

      nombre_certificado: [{ value: '', disabled: true }],
      nombre_copia: [{ value: '', disabled: true }],
      nombre_solicitud: [{ value: '', disabled: true }],
      nombre_cartas: [{ value: '', disabled: true }],
      nombre_no_sancion: [{ value: '', disabled: true }],
      nombre_fotos: [{ value: '', disabled: true }],
      nombre_seguro: [{ value: '', disabled: true }],
      nombre_examen: [{ value: '', disabled: true }],
      nombre_dominio: [{ value: '', disabled: true }],
      nombre_documento: [{ value: '', disabled: true }],
      nombre_comprobante: [{ value: '', disabled: true }],

    });
  }

  ngOnInit(): void {
    this.getinformacion()
    this.menu(0)
  }

  onNoClick(){
    this.dialoRef.close();
  
  }

  getinformacion(){
    //console.log(this.data.objeto);
    this.movilidad.getsolicitudid(this.data.objeto)
    .subscribe((res:any)=>{
      this.loading=false;
      if(res.estado==true)
      {
        
        var genero1 = "";
        var poliza="";
        if (res.datos.genero == "M") {
          genero1 = "Masculino";

        }
        else {
          genero1 = "Femenino";
        }

        if(res.datos.poliza_seguro=="S")
        {
          poliza="Si";
        }
        else{
          poliza="No";

        }
      
       
        this.myform.patchValue({
          nombre_certificado:"Si",
          nombre_copia:"Si",
          nombre_solicitud:"Si",
          nombre_cartas:"Si",
          nombre_no_sancion:"Si",
          nombre_fotos:"Si",
          nombre_seguro:"Si",
          nombre_documento:"Si",
          nombre_comprobante:"Si"


        })
        


        if(res.datos.pdfexamen_psicometrico==null)
        {
          this.myform.patchValue({
            nombre_examen:"NO"
          })

        }
        else if(res.datos.pdfexamen_psicometrico.length!=0)
        {
          this.myform.patchValue({
            nombre_examen:"Si"
          })

        }
        else{
          this.myform.patchValue({
            nombre_examen:"No"
          })
        }

         if(res.datos.pdfdominio_idioma==null)
        {
          this.myform.patchValue({
            nombre_dominio:"No"
          })

        }
        else if(res.datos.pdfdominio_idioma.length!=0)
        {
          this.myform.patchValue({
            nombre_dominio:"Si"
          })

        }
        else{
          this.myform.patchValue({
            nombre_dominio:"No"
          })
        }


        this.myform.patchValue({
          idpersonal: res.datos.idpersonal,
          cedula: res.datos.cedula,
          discapacidad: res.datos.nombre_discapacidad,
          nombres: res.datos.nombres,
          apellido1: res.datos.apellido1,
          apellido2: res.datos.apellido2,
          fecha_nacimiento: res.datos.fecha_nacimiento,
          nacionalidad: res.datos.nacionalidad,
          genero: genero1,
          correo_personal_institucional: res.datos.correo_personal_institucional,
          correo_personal_alternativo: res.datos.correo_personal_alternativo,
          Estado_civil: res.datos.estado_civil,
          tipo_sangre: res.datos.tipo_sangre,

          Pais: res.datos.pais,
          Provincia: res.datos.provincia,
          Canton: res.datos.canton,
          residencia_calle_1: res.datos.residencia_calle_1,
          residencia_calle_2: res.datos.residencia_calle_2,
          residencia_calle_3: res.datos.residencia_calle_3,
          telefono_personal_domicilio: res.datos.telefono_personal_domicilio,
          telefono_personal_celular: res.datos.telefono_personal_celular,


          contacto_emergencia_apellidos: res.datos.contacto_emergencia_apellidos,
          contacto_emergencia_nombres: res.datos.contacto_emergencia_nombres,
          contacto_emergencia_telefono_1: res.datos.contacto_emergencia_telefono_1,
          contacto_emergencia_telefono_2: res.datos.contacto_emergencia_telefono_2,

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
          poliza_seguro:poliza,

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

        this.agregarcarrera(res.datos);
        this.agregarmaterias(res.datos);
      }

    })
    

  }

  menu(id:number){
    console.log(id);
    
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
      this.menu4 = false;

    }
    else if (this.menu_opcion == 2) {
      this.menu1 = false;
      this.menu2 = true;
      this.menu3 = false;
      this.menu4 = false;
    }
    else if (this.menu_opcion == 3) {
      this.menu1 = false;
      this.menu2 = false;
      this.menu3 = true;
      this.menu4 = false;
    }
    else if (this.menu_opcion == 4) {
      this.menu1 = false;
      this.menu2 = false;
      this.menu3 = false;
      this.menu4 = true;
    }

  }
  //modelo de carrera
  get carreras() {
    return this.myform.get('carreras') as FormArray;
  }
  agregarcarrera(usuario: any) {

    for (var i = 0; i < usuario.carrera.length; i++) {
      var promedio1 = "";
      if (usuario.carrera[i].promedio == null) {
        promedio1 = "Periodo Vigente";

      }
      else {
        promedio1 = usuario.carrera[i].periodo;

      }
      const carreraFormGroup = this.mostrar.group({

        id_escuela: usuario.carrera[i].idescuela,
        escuela_nombre: [{ value: usuario.carrera[i].escuela_nombre, disabled: true }],
        promedio: [{ value: promedio1, disabled: true }],
        periodo: [{ value: usuario.carrera[i].periodo, disabled: true }],
        semestre: [{ value: usuario.carrera[i].semestre, disabled: true }]
      });
      this.carreras.push(carreraFormGroup);
    }

  }

  //materias
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

documentoURL(numero:number)
{
  if(numero==1)
  {
    let urlToOpen:string= this.myform.get('pdfcertificado_matricula')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
   

  }
  else if(numero==2){
    let urlToOpen:string=this.myform.get('pdfcopia_record')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    

  }
  else if(numero==3){
    let urlToOpen:string=this.myform.get('pdfsolicitud_carta')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    

  }
  else if(numero==4){
    let urlToOpen:string=this.myform.get('pdfcartas_recomendacion')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    

  }
  else if(numero==5){
    let urlToOpen:string=this.myform.get('pdfno_sancion')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    
  }
  else if(numero==6){
    let urlToOpen:string=this.myform.get('pdffotos')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    

  }
  else if(numero==7){
    let urlToOpen:string=this.myform.get('pdfseguro')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    

  }
  else if(numero==8){
    let urlToOpen:string=this.myform.get('pdfexamen_psicometrico')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    
  }
  else if(numero==9){
    let urlToOpen:string=this.myform.get('pdfdominio_idioma')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    
  }
  else if(numero==10){
    let urlToOpen:string=this.myform.get('pdfdocumentos_udestino')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    
  }
  else if(numero==11){
    let urlToOpen:string=this.myform.get('pdfcomprobante_solvencia')?.value;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
    
  }

}

}
