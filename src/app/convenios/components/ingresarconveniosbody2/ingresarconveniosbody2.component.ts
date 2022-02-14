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
import { IngresarfirmaComponent } from '../ingresarfirma/ingresarfirma.component';
import { FirmaModel } from 'src/app/models/convenios/firmaconvenio';
import { DatosConvenioModel } from 'src/app/models/convenios/datosconvenios';
import { ClausulasModel } from 'src/app/models/convenios/clausulas';
import { IngresarclausulaComponent } from '../ingresarclausula/ingresarclausula.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { GalleriaComponent } from '../galleria/galleria.component';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-ingresarconveniosbody2',
  templateUrl: './ingresarconveniosbody2.component.html',
  styleUrls: ['./ingresarconveniosbody2.component.css']
})
export class Ingresarconveniosbody2Component implements OnInit {
  
  public Editor = ClassicEditor;
  // id del convenio plantilla traigo por el url
  id="";

  //tipo ingresar o Modificar
  tipo="";
  // tipo convenio
  tipoconvenio="";


  //titulo
  titulo="";
  tipoIngresar=false;
  tipoModificar=false;

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

  //firmaModel
  firmaconvenioaux:FirmaModel[]=[];
  firmaconvenio:FirmaModel[]=[];
  firmaAgregar:FirmaModel={id:0,titulo_academico:'',nombres:'',cargo:'',institucion:''};


  // listar sin modelo
  datosconvenio:any;
  datosconvenioaux:any;

  // loading
  loading=true;

  //indice
  indice1=0;

   //clausulas
   clausulasget:ClausulasModel[]=[];

   //nombre de la clausula que se va ingresar
   nombreclausula="";

   //boton 
   botonguardar=false;
   botonvista=false;

   //variable titulo boton guardar
   titulotipo="";
   //url_ escoger
    url_escoger="";
    //data
    data:any={id:0,url_escoger:this.url_escoger};



  constructor(private rutaActiva: ActivatedRoute, private ingresar:FormBuilder, private convenios:ConveniosServicesService,
    public dialog: MatDialog,public snackBar:MatSnackBar, private router:Router) {
    this.id=rutaActiva.snapshot.params.id;
    this.tipo=rutaActiva.snapshot.params.tipo;
    this.tipoconvenio=rutaActiva.snapshot.params.tipocon;
    this.ingresoguardado();
    
    this.selector=ingresar.group({
      convenio:['',Validators.required],
      especifico:[{value:'',disabled: true},Validators.required],

    });

    this.myform=this.ingresar.group({
      id_convenio:[''],
      id_usuario:[''],
      id_imagen1:[''],
      id_imagen2:[''],
      urlimagen1:[''],
      urlimagen2:[''],
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
      eliminacion:this.ingresar.array([]),
      PDF:['']
    });
   }

  ngOnInit(): void {
    this.getclausulas();
    this.getdatosconvenios();
    this.getnombretipoconvenio();
    this.getconveniosEspecificos();
    this.getfirma();

  }

  // el tipo de la pagina ingreso o modificacion
  ingresoguardado()
  {
     var tipo1=this.tipo.toLocaleLowerCase();
    if(tipo1=="ingresar")
    {
      this.titulo="Ingresar Convenio"
      this.tipoIngresar=true;
    }
    else if(tipo1=="modificar"){

      var tip=this.tipoconvenio.toLocaleLowerCase();
      if(tip=='p')
      {
        this.titulo="Modificar Plantilla"
      }
      else if(tip=='a'|| tip=='g'){
        this.titulo="Modificar Convenio"
      }
      this.tipoModificar=true;
    }
    
    
    
  }





// datos convenios
getdatosconvenios(){
  this.convenios.searchconvenio(this.id)
  .subscribe((res:any)=>{
    this.datosconvenio=res;
    console.log(this.datosconvenio);

    this.myform.patchValue({
      id_convenio:this.id,
      id_usuario:this.datosconvenio.id_usuario,
      id_imagen1:this.datosconvenio.id_imagen1,
      id_imagen2:this.datosconvenio.id_imagen2,
      urlimagen1:this.datosconvenio.urlimagen1,
      urlimagen2:this.datosconvenio.urlimagen2,
      id_tipoconvenio:this.datosconvenio.id_tipoconvenio,
      id_tipoespecifico:this.datosconvenio.id_tipoespecifico,
      nombre_convenio:this.datosconvenio.nombre_convenio,
      comparecientes:this.datosconvenio.comparecientes,

    });
     var con=""+this.datosconvenio.id_tipoconvenio as string;
     var espe=""+this.datosconvenio.id_tipoespecifico as string;

     if(this.datosconvenio.id_tipoconvenio==2)
     {
       this.selector.get('especifico')?.enable();
     }
    this.selector.patchValue({
      convenio:con,
      especifico:espe
    });
    this.loading=false;
    var tipo1=this.tipo.toLocaleLowerCase();
    if(tipo1=='modificar')
    {
      var emi=""+this.datosconvenio.selectFirmaEmisor as string;
     var rece=""+this.datosconvenio.selectFirmaReceptor as string;

      this.myform.patchValue({
        selectFirmaEmisor:emi,
        selectFirmaReceptor:rece
      });
      this.insertarobjetofirma_datos(emi);
      this.insertarobjetofirma_datosReceptor(rece);


    }
    this.agregarclausulaDatos(this.datosconvenio);
    
    
  })

}

insertarobjetofirma_datos(id:string)
  {
    
    var id_firma= Number(id);
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

insertarobjetofirma_datosReceptor(id:any)
{
  var id_firma=Number(id);
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

        this.firmaReceptorArray.push(firmaEmisor);
        
        
      }
    });
  });

}

getclausulas(){
  this.convenios.getclausulas()
  .subscribe((res:any) => {
    this.clausulasget=res;
  });
}

 // Agregar clausulas y convenios
  agregarclausulaDatos(datosconvenio:any)
  {
    
    for(var i=0;i<datosconvenio.clausulas.length;i++){
      var descripcion="" as string;
      if(datosconvenio.clausulas[i].descripcion.length==0)
      {
        descripcion=" ";

      }
      else{
        descripcion=datosconvenio.clausulas[i].descripcion;
      }
      const clausulasFormGroup=this.ingresar.group({
        id:datosconvenio.clausulas[i].id,
        nombre:datosconvenio.clausulas[i].nombre,
        id_contenido:datosconvenio.clausulas[i].id_contenido,
        descripcion:descripcion,
        tipo:datosconvenio.clausulas[i].tipo,
        articulos:this.ingresar.array([])
      });
      this.clausula.push(clausulasFormGroup);
    }

    
    // articulos
    for(var i=0;i<datosconvenio.clausulas.length;i++){
      for(var k=0;k<this.clausula.length;k++){
        if(datosconvenio.clausulas[k].id==this.clausula.controls[i].value.id){
          const articulo=(<FormArray>this.myform.get('clausulas')).at(k).get('articulos') as FormArray;
          for(var j=0;j<datosconvenio.clausulas[i].articulos.length;j++)
          {
            const articuloFormGroup=this.ingresar.group({
              art_id:datosconvenio.clausulas[i].articulos[j]. art_id,
              des_art:datosconvenio.clausulas[i].articulos[j].des_art,
              subtipo:'P'
            });
            articulo.push(articuloFormGroup);
          }
        }
      }
    }

   //console.log(this.clausula);

  }




  /// selector para convenios
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
      this.selector.get('especifico')?.disable();
      this.selector.patchValue({
        especifico:''
      });

      this.myform.patchValue({
        id_tipoconvenio:this.selector.get('convenio')?.value,
        id_tipoespecifico:1
      });
      
    }

    if(this.selector.get('convenio')?.value==2)
    {
      this.selector.get('especifico')?.enable();
      this.myform.patchValue({
        id_tipoconvenio:this.selector.get('convenio')?.value,
        id_tipoespecifico:""
      });
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

   cambioConvenioEspecificos()
  {
    this.myform.patchValue({
      id_tipoconvenio:this.selector.get('convenio')?.value,
      id_tipoespecifico:this.selector.get('especifico')?.value
    });

  }


  //imagen
  fileEvent(event:any)
{
  const form=this.myform;
  const foto=new Image();
  const archivoCapturado=event.target.files[0]; 
  // const general=this._general;
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
              conve.subirImagenConveniosftp(formData)
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

  //modelo eliminar
 get eliminar(){
  return this.myform.get('eliminacion') as FormArray;
 }


  // modelo clausula
  get clausula() {
    return this.myform.get('clausulas') as FormArray;
}

  agregarclausulas()
  {
    const clausulasFormGroup=this.ingresar.group({
      id:0,
      id_contenido:0,
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      articulos:this.ingresar.array([])
    });
    this.clausula.push(clausulasFormGroup);

  }

  removerClausulas(indice:number)
  {
    var verificar=false;
    var indice_eliminar=0;
    
    
    for(var k=0;k<this.eliminar.length;k++)
    {
      if(this.eliminar.controls[k].value.id==this.clausula.controls[indice].value.id_contenido)
      {
        verificar=true;
        this.eliminar.controls[k].value.estado="D"
        indice_eliminar=k;
      }
    }
    if(verificar==true)
    {
      const articulo=(<FormArray>this.myform.get('eliminacion')).at(indice_eliminar).get('articulos') as FormArray;
      const artic=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
      
      for(var i=0;i<artic.length;i++)
      {
        
        var id=artic.controls[i].value.art_id;
        const articuloFormGroup=this.ingresar.group({
          art_id:id,
          estado:'D'
        });
        articulo.push(articuloFormGroup);
      }
    }
    else
    {
    
      const clausulaseliminacionFormGroup=this.ingresar.group({
        id_clausula:this.clausula.controls[indice].value.id,
        id_contenido:this.clausula.controls[indice].value.id_contenido,
        estado:'D',
        articulos:this.ingresar.array([])
      });
  
      this.eliminar.push(clausulaseliminacionFormGroup);

    
      if(this.clausula.controls[indice].value.articulos.length!=0)
      {
        
        this.convenios.searchconvenio(this.id)
        .subscribe((res:any)=>{
          this.datosconvenioaux=res;
         
          for(var i=0;i<this.datosconvenioaux.clausulas.length;i++)
          {
            
             
            for(var k=0;k<this.eliminar.length;k++){
            if(this.eliminar.controls[k].value.id_clausula==this.datosconvenioaux.clausulas[i].id)
            {
            const articulo=(<FormArray>this.myform.get('eliminacion')).at(k).get('articulos') as FormArray;
            
            for(var j=0;j<this.datosconvenioaux.clausulas[i].articulos.length;j++)
            {
              const articuloFormGroup=this.ingresar.group({
                art_id:this.datosconvenioaux.clausulas[i].articulos[j].art_id,
                estado:'D'
              });
              articulo.push(articuloFormGroup);
            }
            }
          }
        }

        }); 
      }
    }

   this.clausula.removeAt(indice);
    //console.log(this.clausula.controls[indice].value.articulos.length);
   
  }

  //ingresar un nombre de clausula a la base de datos
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


 // modelo articulos 
  get articulos(){ 
    return (<FormArray>this.myform.get('clausulas')).at(this.indice1).get('articulos') as FormArray;
  }

  getarticulocontrol(indice:number)
  {
    const articulo=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
    return articulo.controls;
  }

  removerArticulo(indice:number,articulo_indice:number)
  {
    var verificar=false;
    var indice_eliminar=0;
    for(var k=0;k<this.eliminar.length;k++)
    {
      if(this.eliminar.controls[k].value.id==this.clausula.controls[indice].value.id_contenido)
      {
        verificar=true;
        indice_eliminar=k;
        //this.eliminar.controls[k].value.estado="D"
      }
    }

    if(verificar==true)
    {
      const articulo=(<FormArray>this.myform.get('eliminacion')).at(indice_eliminar).get('articulos') as FormArray;
      const artic=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
      const articuloFormGroup=this.ingresar.group({
        art_id:artic.controls[articulo_indice].value.art_id,
        estado:'D'
      });
      articulo.push(articuloFormGroup);
    }else
    {
      const clausulaseliminacionFormGroup=this.ingresar.group({
        id_clausula:this.clausula.controls[indice].value.id,
        id_contenido:this.clausula.controls[indice].value.id_contenido,
        estado:'A',
        articulos:this.ingresar.array([])
      });
      this.eliminar.push(clausulaseliminacionFormGroup);

      for(var i=0;i<this.eliminar.length;i++)
      {
        if(this.clausula.controls[indice].value.id==this.eliminar.controls[i].value.id_clausula)
        {
          
          const articulo=(<FormArray>this.myform.get('eliminacion')).at(i).get('articulos') as FormArray;
          const artic=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
         // console.log(artic.controls[articulo_indice].value.art_id);
          const articuloFormGroup=this.ingresar.group({
            art_id:artic.controls[articulo_indice].value.art_id,
            estado:'D'
          });
          articulo.push(articuloFormGroup);
        }

      }

    }



    const articulo=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
     articulo.removeAt(articulo_indice);
      
  }
  agregarListaArticulo(indice:number)
  {
    this.indice1=indice;
    const articuloFormGroup=this.ingresar.group({
      art_id:0,
      des_art:['',Validators.required],
      subtipo:'P'
    });
      this.articulos.push(articuloFormGroup);
    // console.log(this.antecedente);
  }



  //firmas

  get firmaEmisorArray()
  {
    return this.myform.get("firmaEmisor") as FormArray;
  }

  get firmaReceptorArray(){
    return this.myform.get("firmaReceptor") as FormArray;
  }

  getfirma(){
    this.convenios.getfirmaconvenio()
    .subscribe((res:any)=>{
      this.firmaconvenio=res;
    });

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

  // agregar firma Emisor
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

  Vista(){

    if(this.selector.get('convenio')?.value.length==0)
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

    if(this.selector.get('convenio')?.value=='2')
    {
      if(this.selector.get('especifico')?.value.length==0)
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
    if(this.myform.get('comparecientes')?.value.length==0)
    {
         this.myform.patchValue({
          comparecientes:'<p>&nbsp;</p>'
         });
    }


    if( this.myform.get('nombre_convenio')?.value.length==0 ||this.clausula.length==0
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
        console.log(this.clausula.controls[i].value.nombre);
        
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

    if(this.tipoModificar==true)
    {
      var titulo="";
      if(this.tipoconvenio=="P")
      {
        titulo="Cancelacion de la Modificacion de la Plantilla";

      }
      else if(this.tipoconvenio=="A"  ||  this.tipoconvenio=="G")
      {
        titulo="Cancelacion de la Modificacion del Convenio"

      }
      Swal.fire({
        title:titulo,
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
        }
  
      });


    }
    if(this.tipoIngresar==true)
    {
      Swal.fire({
        title:'Cancelacion del Ingreso del Convenio',
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
        }
  
      });

    }
  
  }

  guardar()
  {
    if(this.selector.get('convenio')?.value.length==0)
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

    if(this.selector.get('convenio')?.value=='2')
    {

      if(this.selector.get('especifico')?.value.length==0)
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

    if(this.myform.get('comparecientes')?.value.length==0)
    {
         this.myform.patchValue({
          comparecientes:'<p>&nbsp;</p>'
         });
    }


    if( this.myform.get('nombre_convenio')?.value.length==0 ||this.clausula.length==0
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
    if(this.tipoIngresar==true)
    {
      this.titulotipo="Esta seguro que desea guarda el convenio?";

    }
    if(this.tipoModificar==true){

      this.titulotipo="Esta seguro que desea guarda la modificacion del convenio? ";
    }
    

    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: this.titulotipo,
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

        if(this.tipoIngresar==true)
        {
          let json={data:this.myform.value}
        
        this.convenios.GuardarVistaPDFconvenios(json)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {
            this.myform.patchValue({
              PDF:res.file
            });
            let json1={data:this.myform.value};
            this.convenios.addconveniosguardado(json1)
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
                  title:'Convenio Guardado con exito',
                  icon:'success'
                });
                this.botonguardar=false;
                this.router.navigate(['/utmricb/convenios/mostrarconvenios']);
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
                mensaje:"No se puedo Guardar el PDF",
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

        })
         


        }
        if(this.tipoModificar==true)
        {
          

      
        }

       
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
