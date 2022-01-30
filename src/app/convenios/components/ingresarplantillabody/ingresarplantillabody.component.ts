import { GalleriaComponent } from './../galleria/galleria.component';
import { FirmaModel } from './../../../models/convenios/firmaconvenio';
import { IngresarfirmaComponent } from './../ingresarfirma/ingresarfirma.component';
import { Router } from '@angular/router';
import { LoginComponent } from './../../../auth/components/login/login.component';

import { FirmaReceptorModel } from './../../../models/convenios/firmareceptor';
import { FirmaEmisorModel } from './../../../models/convenios/firmaemisor';
import { IngresarclausulaComponent } from './../ingresarclausula/ingresarclausula.component';
import { MensajeconfiguracionComponent } from './../../../configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { IngresarCategoriaComponent } from './../ingresar-categoria/ingresar-categoria.component';
import { ConveniosEspecificosModel } from './../../../models/convenios/conveniosEspecificos';
import { ConveniosServicesService } from './../../../services/generalConvenios/convenios-services.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClausulasModel } from 'src/app/models/convenios/clausulas';
import { NombreTipoConveniosModel } from 'src/app/models/convenios/nombretipoconvenios';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
//import Swal from 'sweetalert2'



//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { GeneralService } from 'src/app/services/generalget/general.service';

//PDF
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';



@Component({
  selector: 'app-ingresarplantillabody',
  templateUrl: './ingresarplantillabody.component.html',
  styleUrls: ['./ingresarplantillabody.component.css']
})
export class IngresarplantillabodyComponent implements OnInit {
  selector:FormGroup;
  indice1=0;
  myform:FormGroup;
  convenioEspecificosAux:ConveniosEspecificosModel[]=[];
  convenioEspecificos:ConveniosEspecificosModel[]=[];
  categoria="";
  nombreclausula="";

  convenio=true;
  especifico=true;
  
  //clausulas
  clausulasget:ClausulasModel[]=[];

  //firmaEmisor
  firmaEmisoraux:FirmaEmisorModel[]=[];
  firmaEmisor:FirmaEmisorModel[]=[];
  firmaEmisorAgregar:FirmaEmisorModel={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};


  //firmaReceptor
  firmaReceptoraux:FirmaReceptorModel[]=[];
  firmaReceptor:FirmaReceptorModel[]=[];
  firmaReceptorAgregar:FirmaReceptorModel={id:0,titulo_academico:'',nombre_receptor:'',cargo_receptor:'',institucion_receptor:''};

  //firmaModel
  firmaconvenioaux:FirmaModel[]=[];
  firmaconvenio:FirmaModel[]=[];
  firmaAgregar:FirmaModel={id:0,titulo_academico:'',nombres:'',cargo:'',institucion:''};

  // Nombre tipo convenios
  nombretipoconvenios:NombreTipoConveniosModel[]=[];
  
  //botones disabled
  botonvista=false;
  botonguardar=false;

// cedula del usuario
cedula:string;

public Editor = ClassicEditor;

//path imagen
pathimagendefecto="";

//url_ escoger
url_escoger="";
//data
data:any={id:0,url_escoger:this.url_escoger};




  constructor(private ingresar:FormBuilder,private convenios:ConveniosServicesService,
              public dialog: MatDialog,public snackBar:MatSnackBar, private router:Router,
              private usuario:UsuarioServicesService,private _pathimagenes:PathImagenesService,
              private _general:GeneralService) 
  {
    this.pathimagendefecto=_pathimagenes.pathimagendefecto;
    this.selector=this.ingresar.group({
      convenios:['',Validators.required],
       especificos:[{value:'',disabled: true},Validators.required]
    });

    this.myform=this.ingresar.group({
      id_usuario:[''],
      id_imagen1:[''],
      id_imagen2:[''],
      urlimagen1:[_pathimagenes.pathimagendefecto],
      urlimagen2:[_pathimagenes.pathimagendefecto],
      botonsubir1:false,
      botonsubir2:false,
      escoger1:false,
      escoger2:false,
      id_tipoconvenio:[''],
      id_tipoespecifico:[''],
      nombre_convenio:['',Validators.required],
      comparecientes:['',Validators.required],
      clausulas: this.ingresar.array([]),
      selectFirmaEmisor:['',Validators.required],
      selectFirmaReceptor:['',Validators.required],
      firmaEmisor:this.ingresar.array([]),
      firmaReceptor:this.ingresar.array([]),
      PDF:['']
    });
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;

  }

 

  ngOnInit(): void {
    this.getusuario();
    this.getnombretipoconvenios();
    this.getconveniosEspecificos();
    this.getclausulas();
    this.getfirma();
  }

  // usuario

  getusuario(){
    this.usuario.getusuariosearch(this.cedula)
    .subscribe((res:any)=>{ 
        this.myform.patchValue({
          id_usuario:res.usuario.id
        });
    });
  }

  get clausula() {
    return this.myform.get('clausulas') as FormArray;
}

  getclausulas(){
    this.convenios.getclausulas()
    .subscribe((res:any) => {
      this.clausulasget=res;
    });
  }

  getnombretipoconvenios(){
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

//imagen
fileEvent(event:any)
{
  const form=this.myform;
  const foto=new Image();
  const archivoCapturado=event.target.files[0]; 
  const general=this._general;
  const conve=this.convenios;
  if(archivoCapturado.type=='image/png'|| archivoCapturado.type=='image/jpeg')
  {
    let base=this.toBase64(archivoCapturado);
    base.then((imagen1:any)=>{
      foto.src=imagen1;
      foto.onload=function(){ 
        const imgWidth = foto.naturalWidth;
        const imgHeight = foto.naturalHeight;
        if(imgWidth==450&&imgHeight==500)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title: 'Esta seguro que desea subir la imagen...??',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Subir',
            denyButtonText: `No Subir`,
           
          }).then((result)=>{
            if(result.isConfirmed)
            {
              form.patchValue({
                botonsubir1:true,
                botonsubir2:true,
                escoger1:true,
                escoger2:true
              });
              //console.log(archivoCapturado.name);
              const formData = new FormData();
              formData.append('img', archivoCapturado);
              general.subirImagenConveniosftp(formData)
              .subscribe((res:any)=>{
                if(res.estado==true)
                {
                  let json={data:{nombre:archivoCapturado.name,url_imagen:res.imagen}};
                   conve.addimagenconvenio(json)
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
                        title:'Se subio la imagen con exito',
                        icon:'success'
                      });
                      form.patchValue({
                        botonsubir1:false,
                        botonsubir2:false,
                        escoger1:false,
                        escoger2:false
                      });

                     }
                   })

                }
              })


              


            }
            if(result.isDenied)
            {
              form.patchValue({
                botonsubir1:false,
                botonsubir2:false,
                escoger1:false,
                escoger2:false
              });
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
            }
          
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
            title:'Error.. Solo se puede subir imagenes de dimensiones 450x500 pixeles',
            icon:'warning'
          });
          form.patchValue({
            botonsubir1:false,
            botonsubir2:false,
            escoger1:false,
            escoger2:false
          });
          return;
         }
      }
    })

  }
 
}

toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

escoger(id:number){
  this.data={id:0,url_escoger:this.url_escoger};
  
  const dialogRef=this.dialog.open(GalleriaComponent,{
    width:'700px',
    data:{titulo:'Galeria Convenios',url:this.data}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result!=null)
    {
      if(id==1)
      {
        if(result.url_escoger.length!=0){
          this.myform.patchValue({
            id_imagen1:result.id,
            urlimagen1:result.url_escoger
          });
        }
      }
      if(id==2)
      {
        if(result.url_escoger.length!=0)
        {
          this.myform.patchValue({
            id_imagen2:result.id,
            urlimagen2:result.url_escoger
  
          });
        }
        
       
      }

    }
   
    
  });

}


  getfirma(){
    this.convenios.getfirmaconvenio()
    .subscribe((res:any)=>{
      this.firmaconvenio=res;
    });

  }


  
  cambioConvenio(){

    if(this.selector.get('convenios')?.value==1 ||this.selector.get('convenios')?.value==3)
    {
      this.selector.get('especificos')?.disable();
      this.selector.patchValue({
        especificos:''
      });

      this.myform.patchValue({
        id_tipoconvenio:this.selector.get('convenios')?.value,
        id_tipoespecifico:1
      });
      
    }

    if(this.selector.get('convenios')?.value==2)
    {
      this.selector.get('especificos')?.enable();
      this.myform.patchValue({
        id_tipoconvenio:this.selector.get('convenios')?.value,
        id_tipoespecifico:""
      });
    }

  }

  cambioConvenioEspecificos()
  {
    this.myform.patchValue({
      id_tipoconvenio:this.selector.get('convenios')?.value,
      id_tipoespecifico:this.selector.get('especificos')?.value
    });

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

  agregarclausulas()
  {
    const clausulasFormGroup=this.ingresar.group({
      id:'',
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      tipo:'P',
      articulos:this.ingresar.array([
      ])
    });
    this.clausula.push(clausulasFormGroup);
  }
  

  removerClausulas(indice:number)
  {
    this.clausula.removeAt(indice);
  }
  
  get articulos(){
     
    return (<FormArray>this.myform.get('clausulas')).at(this.indice1).get('articulos') as FormArray;
  }

  getarticulocontrol(indice:number)
  {
    const articulo=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
    return articulo.controls;
  }

  agregarListaArticulo(indice:number)
  {
    this.indice1=indice;
    const articuloFormGroup=this.ingresar.group({
      des_art:['',Validators.required],
      subtipo:'P'
    });
      this.articulos.push(articuloFormGroup);
    // console.log(this.antecedente);
  }

  insertarnombreclausula(indice:number)
  {
    var nombre= this.clausula.value[indice].nombre;
    this.convenios.getclausulas()
    .subscribe((res:any) => {
      this.clausulasget=res;
      this.actualizarnombreclausula(this.clausulasget,nombre,indice);
    });

  }
  actualizarnombreclausula(original:ClausulasModel[],nombre_c:string,indice:number)
  {
    original.forEach((item:ClausulasModel)=>{
      if(item.nombre_clau==nombre_c)
      {
        this.clausula.controls[indice].patchValue({
          id:item.id
        });
      }
    });
    


  }

  removerArticulo(indice:number,articulo_indice:number)
  {
    const articulo=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
     articulo.removeAt(articulo_indice);
      
  }

  agregarclausulaDialog()
  {
    const dialogRef=this.dialog.open(IngresarclausulaComponent,{
      width:'500px',
      data:{titulo:'Ingresar Nombre de la Clausula',clausula:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
      this.nombreclausula = result;
      this.agregarClausula();
      }
     
      
    });

  }

  agregarClausula(){
    let json={clausula:{nombre_clau:this.nombreclausula}}
    this.convenios.addclausulas(json)
    .subscribe((res:any) => {
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
        this.clausulasget=[];
        this.getclausulas();
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
        return;
      }
      
    });

  }
  
  agregarfirmaDialog(){
    const dialogRef=this.dialog.open(IngresarfirmaComponent,{
      width:'600px',
      data:{titulo:'Ingresar Firma',firma:this.firmaAgregar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if(result!=null)
      {
        this.firmaReceptorAgregar=result;
        if(this.firmaAgregar.nombres.length==0 || this.firmaAgregar.titulo_academico.length==0 ||
          this.firmaAgregar.cargo.length==0 || this.firmaAgregar.institucion.length==0)
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
            this.firmaAgregar={id:0,titulo_academico:'',nombres:'',cargo:'',institucion:''};
            return;
          }
          this.agregarfirma();


      }
     
      
    });


  }

  agregarfirma(){
    let json={firmas:{titulo_academico:this.firmaAgregar.titulo_academico,nombres:this.firmaAgregar.nombres,
      cargo:this.firmaAgregar.cargo,institucion:this.firmaAgregar.institucion}};
      this.convenios.addfirmaconvenios(json)
      .subscribe((res:any)=>{
        console.log(res);
        
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
        this.firmaAgregar={id:0,titulo_academico:'',nombres:'',cargo:'',institucion:''};
        this.firmaconvenio=[];
        this.getfirma();
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
        this.firmaAgregar={id:0,titulo_academico:'',nombres:'',cargo:'',institucion:''};
        return;
      }


      });
  }

    

  get firmaEmisorArray()
  {
    return this.myform.get("firmaEmisor") as FormArray;
  }

  get firmaReceptorArray(){
    return this.myform.get("firmaReceptor") as FormArray;
  }




  insertarobjetofirmaReceptor(event:any){
    var id_firma=event.value;
    var abreviatura ="";
    var nombre="";
   
    if(this.firmaReceptorArray.length!=0)
    {
      this.firmaReceptorArray.removeAt(0);
    }
    this.convenios.getfirmaconvenio()
    .subscribe((res:any)=>{
      this.firmaconvenio=res;
      this.firmaconvenio.forEach((item:FirmaModel)=>{
        if(item.id==id_firma)
        {

          var separar=item.titulo_academico.split(" ");
          abreviatura=this.abreviaturaProfesional(separar[0]);
          nombre=abreviatura+" "+item.nombres;
          
          const firmaEmisor=this.ingresar.group({
            nombre:nombre,
            cargo:item.cargo,
            institucion:item.institucion
          });

          this.firmaReceptorArray.push(firmaEmisor);

        }
      });
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
    this.convenios.getfirmaconvenio()
    .subscribe((res:any)=>{
      this.firmaconvenio=res;
      this.firmaconvenio.forEach((item:FirmaModel)=>{
        if(item.id==id_firma)
        {
          var separar=item.titulo_academico.split(" ");
          abreviatura=this.abreviaturaProfesional(separar[0]);
          nombre=abreviatura+" "+item.nombres;
          
          const firmaEmisor=this.ingresar.group({
            nombre:nombre,
            cargo:item.cargo,
            institucion:item.institucion
          });

          this.firmaEmisorArray.push(firmaEmisor);

        }
      });
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
  
  // botones finales
  Vista(){

    if(this.selector.get('convenios')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de convenio",
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

    if(this.selector.get('convenios')?.value=='E')
    {
      if(this.selector.get('especificos')?.value.length==0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Escoger una opcion de Convenios Especificos",
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

    if(this.myform.get('urlimagen1')?.value==this.pathimagendefecto || this.myform.get('urlimagen2')?.value==this.pathimagendefecto)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Debe escoger una imagen",
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


    if( this.myform.get('nombre_convenio')?.value.length==0 ||this.myform.get('comparecientes')?.value.length==0 ||this.clausula.length==0
        || this.myform.get('selectFirmaEmisor')?.value.length==0 || this.myform.get('selectFirmaReceptor')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Datos Faltantes",
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
  
    

    for(var i=0;i<this.clausula.length;i++)
    {
      
      if(this.clausula.controls[i].value.nombre.length==0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar el nombre en las Clausulas",
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
      if(this.clausula.controls[i].value.descripcion.length==0)
      {
         this.clausula.controls[i].patchValue({
          descripcion:'<p>&nbsp;</p>'
         });
      }


      if(this.articulos.length!=0)
      {
        const articulo=(<FormArray>this.myform.get('clausulas')).at(i).get('articulos') as FormArray;
        for(var j=0;j<articulo.length;j++)
        {
          if(articulo.controls[j].value.des_art.length==0)
          {
            this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
              data:{
                titulo:'Error.....',
                mensaje:"Ingresar Datos en los Articulos",
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
      }
    }
    this.botonvista=true;
    let json={data:this.myform.value}

    //console.log(json);
    
    this.convenios.GuardarVistaPDFconvenios(json)
    .subscribe((res:any)=>{
      console.log(res);

      if(res.estado==true)
      {
        // mandar a un link externo
        let url1 = this.convenios.VistaPDFconvenios(res.file) as string;
         let urlToOpen:string=url1;
        let url: string = '';
        if (!/^http[s]?:\/\//.test(urlToOpen)) {
          url += 'http://';
        }

        url += urlToOpen;
        window.open(url, '_blank');
      }
      else{
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"No se puedo crear la vista",
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
    this.botonvista=false;
    

       
  
    });
   


    // const doc = new jsPDF();

    // doc.text(this.myform.get('nombre_convenio')?.value, 10, 10);
    // doc.save('Convenio plantilla.pdf');
    
    

  }

  cancelar(){
    Swal.fire({
      title:'Cancelacion de Ingreso Plantilla',
      text:'Desea salir de la pagina',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo salir'
    }).then((result)=>{
      if (result.value) {
        Swal.fire({
          title:'Redireccionamiento',
          text:'Se redirecciona a la pagina Listar convenios',
          icon:'success',
        });
        this.router.navigate(['/utmricb/convenios/mostrarconvenios']);
        // this.convenios.eliminarpdf()
        // .subscribe((res:any)=>{
        //   if(res.estado==true)
        //   {
           
        //   }
        // })
        
      }

    });
  }

  guardar()
  {
    if(this.selector.get('convenios')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Escoger una opcion de convenio",
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

    if(this.selector.get('convenios')?.value=='E')
    {
      if(this.selector.get('especificos')?.value.length==0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Escoger una opcion de Convenios Especificos",
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


    if( this.myform.get('nombre_convenio')?.value.length==0 ||this.myform.get('comparecientes')?.value.length==0 ||this.clausula.length==0
        || this.myform.get('selectFirmaEmisor')?.value.length==0 || this.myform.get('selectFirmaReceptor')?.value.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Datos Faltantes",
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
  
    

    for(var i=0;i<this.clausula.length;i++)
    {
      
      if(this.clausula.controls[i].value.nombre.length==0)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
            mensaje:"Ingresar Datos en las Clausulas",
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
      
      if(this.clausula.controls[i].value.descripcion.length==0)
      {
         this.clausula.controls[i].patchValue({
          descripcion:'<p>&nbsp;</p>'
         });
      }
      if(this.articulos.length!=0)
      {
        const articulo=(<FormArray>this.myform.get('clausulas')).at(i).get('articulos') as FormArray;
        for(var j=0;j<articulo.length;j++)
        {
          if(articulo.controls[j].value.des_art.length==0)
          {
            this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
              data:{
                titulo:'Error.....',
                mensaje:"Ingresar Datos en los Articulos",
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
      }
    }


    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: 'Esta seguro que desea guarda la plantilla?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
     
    }).then((result)=>{
      if(result.isConfirmed)
      {  
        this.botonguardar=true;
        let json={data:this.myform.value}
        
        this.convenios.GuardarVistaPDFconvenios(json)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {
            this.myform.patchValue({
              PDF:res.file
            });
            let json1={data:this.myform.value};
            this.convenios.addconveniosplantilla(json1)
            .subscribe((res:any)=>{

              if(res.estado==true)
              {
                this.convenios.eliminarpdf()
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
                      title:'Plantilla Guardada con exito',
                      icon:'success'
                    });
                    this.botonguardar=false;
                    this.router.navigate(['/utmricb/convenios/mostrarconvenios']);
                  }
                })
                
              }
              

            
            },(error:any)=>{
              this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
                data:{
                  titulo:'Error.....',
                  mensaje:"No se puedo ingresar la plantilla",
                buttonText:'',
                icon:'warning'
                },
                duration:1000,
                horizontalPosition:'end',
                verticalPosition:'bottom',
                panelClass:'error'
              });
              this.botonguardar=false;
              return;

            });
            
            
          }
          else{
            this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
              data:{
                titulo:'Error.....',
                mensaje:"No se puedo crear la vista",
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

       
      }

    });
   





  }


}


