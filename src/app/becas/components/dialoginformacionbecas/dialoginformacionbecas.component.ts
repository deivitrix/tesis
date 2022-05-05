import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BecasnivelService } from 'src/app/services/becasnivel.service';

@Component({
  selector: 'app-dialoginformacionbecas',
  templateUrl: './dialoginformacionbecas.component.html',
  styleUrls: ['./dialoginformacionbecas.component.css']
})
export class DialoginformacionbecasComponent implements OnInit {
  
  //loading
  loading=true;

  // myform
  // formGroup
  myform: FormGroup;

   // validaciones
   menu1 = false;
   menu2 = false;
   menu3 = false;
   //menu
  menu_opcion: number = 0;

  constructor(
    public dialoRef:MatDialogRef<DialoginformacionbecasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private becas:BecasnivelService,
    private mostrar: FormBuilder
  ) {
    this.myform = this.mostrar.group({
      idpersonal: [''],
      cedula: [{ value: '', disabled: true }],
      tipo_sangre: [{ value: '', disabled: true }],
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


      

      //solicitud
      nombre_facultad:[{ value: '', disabled: true }],
      modalidad:[{ value: '', disabled: true }],
      tipo_destino:[{ value: '', disabled: true }],
      universidad_destino:[{ value: '', disabled: true }],
      campus_destino:[{ value: '', disabled: true }],
      numero_semestre:[{ value: '', disabled: true }],
      fecha_inicio:[{ value: '', disabled: true }],
      fecha_fin:[{ value: '', disabled: true }],
      naturaleza:[{ value: '', disabled: true }],
      beca_apoyo:[{ value: '', disabled: true }],
      monto_referencial:[{ value: '', disabled: true }],
      beneficios:mostrar.array([]),
      
      alergias:[{ value: '', disabled: true }],
      especificar_alergia:[{ value: '', disabled: true }],
      enfermedades_tratamiento:[{ value: '', disabled: true }],
      poliza_seguro:[{ value: '', disabled: true }],

      //pdf
      pdfcarta_aceptacion:[{ value: '', disabled: true }],
      pdftitulo:[{ value: '', disabled: true }],
      

      nombre_carta: [{ value: '', disabled: true }],
      nombre_titulo: [{ value: '', disabled: true }],

    });

    }

  ngOnInit(): void {
    this.getinformacion()
    this.menu(0)

  }
  getinformacion(){
    
    this.becas.getsolicitudid(this.data.objeto)
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
          nombre_carta:"Si",
          nombre_titulo:"Si",
        });
        



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
          nombre_facultad:res.datos.nombre_facultad.trim(),
          modalidad:res.datos.modalidad,
          tipo_destino:res.datos.tipo_destino,
          universidad_destino:res.datos.universidad_destino,
          campus_destino:res.datos.campus_destino,
          numero_semestre:res.datos.numero_semestre,
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
          pdfcarta_aceptacion:res.datos.pdfcarta_aceptacion,
          pdftitulo:res.datos.pdftitulo,


        });

        this.agregarbeneficios(res.datos);
      }

    })
    

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

  //modelo de carrera
  get beneficios() {
    return this.myform.get('beneficios') as FormArray;
  }

  agregarbeneficios(usuario:any)
  {
    for (var i = 0; i < usuario.beneficios.length; i++) 
    {
      const beneficiosFormGroup = this.mostrar.group({

        descripcion: [{ value: usuario.beneficios[i].beneficios, disabled: true }],
      });
      this.beneficios.push(beneficiosFormGroup);
    }
   
    

  }

  documentoURL(numero:number){

    if(numero==1)
    {
      let urlToOpen:string= this.myform.get('pdfcarta_aceptacion')?.value;
      let url: string = '';
      if (!/^http[s]?:\/\//.test(urlToOpen)) {
        url += 'http://';
      }
  
      url += urlToOpen;
      window.open(url, '_blank');

    }
    else if(numero==2)
    {
      let urlToOpen:string= this.myform.get('pdftitulo')?.value;
      let url: string = '';
      if (!/^http[s]?:\/\//.test(urlToOpen)) {
        url += 'http://';
      }
  
      url += urlToOpen;
      window.open(url, '_blank');


    }

  }

}
