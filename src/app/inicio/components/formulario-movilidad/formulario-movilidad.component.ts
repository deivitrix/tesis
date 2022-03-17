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

  // checkbox
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  //selector
  selected="";
  selected2="";

  //variable
  beneficio1=false;
  beneficio2=false;

  //botones
  botonguardar=false;
  botoncancelar=false;


  constructor(private rutaActiva: ActivatedRoute, private movilidad:GeneralMovilidadService,private ingresar:FormBuilder,
    private router:Router) {
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

      periodo:[{value:'',disabled: true}],
      carrera:[{value:'',disabled: true}],
      promedio:[{value:'',disabled: true}],
    });
    this.mysolicitud=this.ingresar.group({
      modalidad1:['',Validators.required],
      modalidad2:['',Validators.required],
      universidad_destino:['',Validators.required],
      campus_destino:['',Validators.required],
      semestre_cursar:['',Validators.required],
      fecha_inicio:['',Validators.required],
      fecha_fin:['',Validators.required],
      naturaleza:['',Validators.required],
      becas:['',Validators.required],
      monto:['',Validators.required],

      tipo_sangre:[{value:'',disabled: true}],
      materias:this.ingresar.array([])
    });

   }

  ngOnInit(): void {
    this.getMovilidadEstudiante()
    this.menu(6)
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
  
        periodo:res.usuario.periodo,
        carrera:res.usuario.carrera,
        promedio:res.usuario.promedio,
       });

       this.mysolicitud.patchValue({
         tipo_sangre:res.usuario.Tipo_Sangre
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
