import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NombreTipoConveniosModel } from 'src/app/models/convenios/nombretipoconvenios';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { ConveniosEspecificosModel } from 'src/app/models/convenios/conveniosEspecificos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IngresarCategoriaComponent } from '../ingresar-categoria/ingresar-categoria.component';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { FirmaEmisorModel } from 'src/app/models/convenios/firmaemisor';
import { FirmaReceptorModel } from 'src/app/models/convenios/firmareceptor';

//Alertas
import Swal from 'sweetalert2';
import { IngresarfirmaemisorComponent } from '../ingresarfirmaemisor/ingresarfirmaemisor.component';
import { IngresarfirmareceptorComponent } from '../ingresarfirmareceptor/ingresarfirmareceptor.component';

@Component({
  selector: 'app-ingresarconveniosbody2',
  templateUrl: './ingresarconveniosbody2.component.html',
  styleUrls: ['./ingresarconveniosbody2.component.css']
})
export class Ingresarconveniosbody2Component implements OnInit {
  id="";

  // selector 
  selector:FormGroup;

  //nombreconvenios
  nombretipoconvenios:NombreTipoConveniosModel[]=[];

  // convenios especificos
  convenioEspecificosAux:ConveniosEspecificosModel[]=[];
  convenioEspecificos:ConveniosEspecificosModel[]=[];

  // valor agregar en categoria especifico
  categoria="";

  // formGroup
  myform:FormGroup;

  //firmaEmisor
  firmaEmisoraux:FirmaEmisorModel[]=[];
  firmaEmisor:FirmaEmisorModel[]=[];
  firmaEmisorAgregar:FirmaEmisorModel={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};


  //firmaReceptor
  firmaReceptoraux:FirmaReceptorModel[]=[];
  firmaReceptor:FirmaReceptorModel[]=[];
  firmaReceptorAgregar:FirmaReceptorModel={id:0,titulo_academico:'',nombre_receptor:'',cargo_receptor:'',institucion_receptor:''};

  constructor(private rutaActiva: ActivatedRoute, private ingresar:FormBuilder, private convenios:ConveniosServicesService,
    public dialog: MatDialog,public snackBar:MatSnackBar, private router:Router) {
    this.id=rutaActiva.snapshot.params.id;
    this.selector=ingresar.group({
      convenio:['',Validators.required],
      especifico:[{value:'',disabled: true},Validators.required],

    });

    this.myform=this.ingresar.group({
      id_convenio:[''],
      id_especifico:[''],
      nombre_convenio:['',Validators.required],
      comparecientes:['',Validators.required],
      clausulas: this.ingresar.array([]),
      selectFirmaEmisor:['',Validators.required],
      selectFirmaReceptor:['',Validators.required],
      firmaEmisor:this.ingresar.array([]),
      firmaReceptor:this.ingresar.array([]),
    });
   }

  ngOnInit(): void {
    this.getnombretipoconvenio();
    this.getconveniosEspecificos();

    this.getfirmaemisor();
    this.getfirmareceptor();
  }


  /// selector

  getnombretipoconvenio(){
    this.convenios.getnombretipoconvenios()
    .subscribe((res:any)=>{
      this.nombretipoconvenios=res;

    });
  }

  getconveniosEspecificos(){

    this.convenios.getconveniosEspecificos()
    .subscribe((res:any) => {
      this.convenioEspecificosAux=res;
      this.separarConvenios(this.convenioEspecificosAux);
  
      
    });
  }
  separarConvenios(original:ConveniosEspecificosModel[])
  {
    original.forEach((item:ConveniosEspecificosModel)=>{

      if(item.id!=1)
      {
        this.convenioEspecificos.push(item);
      }
    });

   }

  

  cambioConvenio()
  {
    if(this.selector.get('convenio')?.value==1 ||this.selector.get('convenio')?.value==3)
    {
      this.selector.get('especificos')?.disable();
      this.selector.patchValue({
        especificos:''
      });
    }

    if(this.selector.get('convenio')?.value==2)
    {
      this.selector.get('especifico')?.enable();
    }

  }
  agregarcategoria()
  {
    const dialogRef=this.dialog.open(IngresarCategoriaComponent,{
      width:'400px',
      data:{titulo:'Ingresar Convenios Especifico',categoria:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
      this.categoria = result;
      this.agregarConveniosEspecificos();
      }
     
      
    });

  }
  agregarConveniosEspecificos(){

    let json={convenio_especifico:{descripcion_ce:this.categoria}}
    this.convenios.addconveniosEspecificos(json)
    .subscribe((res:any) => {
      if(res.status==true)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Success.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'success'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'success'     
        });
        this.convenioEspecificosAux=[];
        this.convenioEspecificos=[];
        this.getconveniosEspecificos();
        return;
        

      }
      if(res.status==false)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:res.mensaje,
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
     
    
      
    });

  }

  // modelo clausula
  get clausula() {
    return this.myform.get('clausulas') as FormArray;
}

  agregarclausulas()
  {
    const clausulasFormGroup=this.ingresar.group({
      id:'',
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      articulos:this.ingresar.array([
      ])
    });
    this.clausula.push(clausulasFormGroup);

  }







  //firmas

  get firmaEmisorArray()
  {
    return this.myform.get("firmaEmisor") as FormArray;
  }

  get firmaReceptorArray(){
    return this.myform.get("firmaReceptor") as FormArray;
  }
  getfirmaemisor(){
    this.convenios.getfirmaEmisor()
    .subscribe((res:any)=>{
      this.firmaEmisor=res;
    });

  }

  getfirmareceptor(){
    this.convenios.getfirmaReceptor()
    .subscribe((res:any)=>{
      this.firmaReceptor=res;
    });
  }


  


  insertarobjetofirma(event:any)
  {
    var id_firma=event.value;
    var abreviatura ="";
    var nombre="";
   
    if(this.firmaEmisorArray.length!=0)
    {
      this.firmaEmisorArray.removeAt(0);
    }
    this.convenios.getfirmaEmisor()
    .subscribe((res:any)=>{
      this.firmaEmisor=res;
      this.firmaEmisor.forEach((item:FirmaEmisorModel)=>{
        if(item.id==id_firma)
        {
          var separar=item.titulo_academico.split(" ");
          abreviatura=this.abreviaturaProfesional(separar[0]);
          nombre=abreviatura+" "+item.nombre_emisor;
          
          const firmaEmisor=this.ingresar.group({
            nombre:nombre,
            cargo:item.cargo_emisor,
            institucion:item.institucion_emisor
          });

          this.firmaEmisorArray.push(firmaEmisor);

        }
      });
    });




    

  }

  insertarobjetofirmaReceptor(event:any){
    var id_firma=event.value;
    var abreviatura ="";
    var nombre="";
   
    if(this.firmaReceptorArray.length!=0)
    {
      this.firmaReceptorArray.removeAt(0);
    }
    this.convenios.getfirmaReceptor()
    .subscribe((res:any)=>{
      this.firmaReceptor=res;
      this.firmaReceptor.forEach((item:FirmaReceptorModel)=>{
        if(item.id==id_firma)
        {

          var separar=item.titulo_academico.split(" ");
          abreviatura=this.abreviaturaProfesional(separar[0]);
          nombre=abreviatura+" "+item.nombre_receptor;
          
          const firmaEmisor=this.ingresar.group({
            nombre:nombre,
            cargo:item.cargo_receptor,
            institucion:item.institucion_receptor
          });

          this.firmaReceptorArray.push(firmaEmisor);

        }
      });
    });

  }

  // agregar firma Emisor
  agregarfirmaEmisorDialog(){
    const dialogRef=this.dialog.open(IngresarfirmaemisorComponent,{
      width:'600px',
      data:{titulo:'Ingresar Firma del Emisor',emisor:this.firmaEmisorAgregar}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
        this.firmaEmisorAgregar=result;
         if(this.firmaEmisorAgregar.nombre_emisor.length==0 || this.firmaEmisorAgregar.titulo_academico.length==0 ||
            this.firmaEmisorAgregar.cargo_emisor.length==0 || this.firmaEmisorAgregar.institucion_emisor.length==0)
            {
              this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
                data:{
                  titulo:'Error.....',
                  mensaje:"Datos Faltantes",
                 buttonText:'',
                 icon:'error'
                },
                duration:1000,
                horizontalPosition:'end',
                verticalPosition:'bottom',
                panelClass:'error'     
              });
              this.firmaEmisorAgregar={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};
              return;
            }
         this.agregarfirmaEmisor();
      }
     
      
    });

  }

  agregarfirmaEmisor(){
    let json={firma_emisor:{titulo_academico:this.firmaEmisorAgregar.titulo_academico,nombre_emisor:this.firmaEmisorAgregar.nombre_emisor,
      cargo_emisor:this.firmaEmisorAgregar.cargo_emisor,institucion_emisor:this.firmaEmisorAgregar.institucion_emisor}};
    this.convenios.addfirmaEmisor(json).
    subscribe((res:any)=>{
      if(res.estado==true)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Success.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'success'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'success'     
        });
        this.firmaEmisorAgregar={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};
        this.firmaEmisor=[];
        this.getfirmaemisor();
        return;
        

      }
      if(res.estado==false)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'warning'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'error'     
        });
        this.firmaEmisorAgregar={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};
        return;
      }
    });

  }

  //agregar firma receptor 
  agregarfirmaReceptorDialog(){
    const dialogRef=this.dialog.open(IngresarfirmareceptorComponent,{
      width:'600px',
      data:{titulo:'Ingresar Firma del Receptor',receptor:this.firmaReceptorAgregar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if(result!=null)
      {
        this.firmaReceptorAgregar=result;
        if(this.firmaReceptorAgregar.nombre_receptor.length==0 || this.firmaReceptorAgregar.titulo_academico.length==0 ||
          this.firmaReceptorAgregar.cargo_receptor.length==0 || this.firmaReceptorAgregar.institucion_receptor.length==0)
          {
            this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
              data:{
                titulo:'Error.....',
                mensaje:"Datos Faltantes",
               buttonText:'',
               icon:'error'
              },
              duration:1000,
              horizontalPosition:'end',
              verticalPosition:'bottom',
              panelClass:'error'     
            });
            this.firmaReceptorAgregar={id:0,titulo_academico:'',nombre_receptor:'',cargo_receptor:'',institucion_receptor:''};
            return;
          }
          this.agregarfirmaReceptor();


      }
     
      
    });


  }

  agregarfirmaReceptor(){
    let json={firma_emisor:{titulo_academico:this.firmaEmisorAgregar.titulo_academico,nombre_emisor:this.firmaEmisorAgregar.nombre_emisor,
      cargo_emisor:this.firmaEmisorAgregar.cargo_emisor,institucion_emisor:this.firmaEmisorAgregar.institucion_emisor}};
      this.convenios.addfirmaReceptor(json)
      .subscribe((res:any)=>{

        if(res.estado==true)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Success.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'success'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'success'     
        });
        this.firmaReceptorAgregar={id:0,titulo_academico:'',nombre_receptor:'',cargo_receptor:'',institucion_receptor:''};
        this.firmaReceptor=[];
        this.getfirmareceptor();
        return;
        

      }
      if(res.estado==false)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:res.mensaje,
           buttonText:'',
           icon:'warning'
          },
          duration:1000,
          horizontalPosition:'end',
          verticalPosition:'bottom',
          panelClass:'error'     
        });
        this.firmaReceptorAgregar={id:0,titulo_academico:'',nombre_receptor:'',cargo_receptor:'',institucion_receptor:''};
        return;
      }


      });
  }

  abreviaturaProfesional(cargo:string)
  {
    var cargo_m=cargo.toLocaleLowerCase();
     var verificar=false;
    var cargoreturn="";
    switch(cargo_m)
    {
      case 'abogado':  cargoreturn="Abgdo"; break;
      case 'abogada':  cargoreturn="Abgda"; break;
      case 'administrador':  cargoreturn="Adm"; break;
      case 'administradora':  cargoreturn="Adm"; break;
      case 'analista':  cargoreturn="Anl"; break;
      case 'arquitecto':  cargoreturn="Arq"; break;
      case 'arquitecto':  cargoreturn="Arq"; break;
      case 'contador':  cargoreturn="Cdor"; break;
      case 'director':  cargoreturn="Dir"; break;
      case 'directora':  cargoreturn="Dira"; break;
      case 'doctor':  cargoreturn="Dr"; break;
      case 'doctora':  cargoreturn="Dra"; break;
      case 'economista':  cargoreturn="Econ"; break;
      case 'enfermero':  cargoreturn="Enf"; break;
      case 'enfermera':  cargoreturn="Enf"; break;
      case 'ingeniero':  cargoreturn="Ing"; break;
      case 'ingeniera':  cargoreturn="Ing"; break;
      case 'licenciado':  cargoreturn="Lcdo"; break;
      case 'licenciada':  cargoreturn="Lcda"; break;
      case 'odontologo':  cargoreturn="Odont"; break;
      case 'psicólogo':  cargoreturn="Psic"; break;
      case 'psiquiatra':  cargoreturn="Psiq"; break;
      case 'químico':  cargoreturn="Quim"; break;
      case 'sociólogo':  cargoreturn="Soc"; break;
      case 'veterinario':  cargoreturn="Vet"; break;
      case 'nutricionista':  cargoreturn="Nut"; break;
      case 'profesor':  cargoreturn="Prof"; break;
      default: cargoreturn="";
    }
    return cargoreturn;
  
  }




  // boton ultimos

  cancelar(){
    Swal.fire({
      title:'Cancelacion del Convenio',
      text:'Desea cancelar el ingreso del convenio??',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cancelar'
    }).then((result)=>{
      if (result.value) {
        Swal.fire({
          title:'Redireccionamiento',
          text:'Se redirecciona a la pagina Listar convenios',
          icon:'success',
        });
        this.router.navigate(['/utmricb/convenios/mostrarconvenios']);
      }

    });
  }
  
  

}
