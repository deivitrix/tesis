import { LoginComponent } from './../../../auth/components/login/login.component';
import { IngresarfirmareceptorComponent } from './../ingresarfirmareceptor/ingresarfirmareceptor.component';
import { IngresarfirmaemisorComponent } from './../ingresarfirmaemisor/ingresarfirmaemisor.component';
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

//PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NombreTipoConveniosModel } from 'src/app/models/convenios/nombretipoconvenios';


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

  // Nombre tipo convenios
  nombretipoconvenios:NombreTipoConveniosModel[]=[];

  constructor(private ingresar:FormBuilder,private convenios:ConveniosServicesService,public dialog: MatDialog,public snackBar:MatSnackBar) 
  {
    this.selector=this.ingresar.group({
      convenios:['',Validators.required],
       especificos:[{value:'',disabled: true},Validators.required]
    });

    this.myform=this.ingresar.group({
      nombre_convenio:['',Validators.required],
      comparecientes:['',Validators.required],
      clausulas: this.ingresar.array([]),
      selectFirmaEmisor:['',Validators.required],
      selectFirmaReceptor:['',Validators.required],

    });


  }

 

  ngOnInit(): void {
    this.getnombretipoconvenios()
    this.getconveniosEspecificos();
    this.getclausulas();
    this.getfirmaemisor();
    this.getfirmareceptor();
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

  separarConvenios(original:ConveniosEspecificosModel[])
  {
    original.forEach((item:ConveniosEspecificosModel)=>{

      if(item.id!=1)
      {
        this.convenioEspecificos.push(item);
      }
    });

    
  }
  cambioConvenio(){

    if(this.selector.get('convenios')?.value==1 ||this.selector.get('convenios')?.value==3)
    {
      this.selector.get('especificos')?.disable();
      this.selector.patchValue({
        especificos:''
      });
    }

    if(this.selector.get('convenios')?.value==2)
    {
      this.selector.get('especificos')?.enable();
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
      console.log(res);
      if(res.status==true)
      {
        this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
          data:{
            titulo:'Error.....',
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
      articulos:this.ingresar.array([
      ])
    });
    this.clausula.push(clausulasFormGroup);
  }
  

  removerAntecedentes(indice:number)
  {
    this.clausula.removeAt(indice);
    //this.articulos.controls=[];
    
    //console.log(this.clausula);
    

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
    var id= this.clausula.value[indice].nombre;
    var id_clausula=Number(id);
    this.convenios.getclausulas()
    .subscribe((res:any) => {
      this.clausulasget=res;
      this.actualizarnombreclausula(this.clausulasget,id_clausula,indice);
    });

  }
  actualizarnombreclausula(original:ClausulasModel[],id:number,indice:number)
  {
    original.forEach((item:ClausulasModel)=>{
      if(item.id==id)
      {
        this.clausula.value[indice].id=item.id;
        this.clausula.value[indice].nombre=item.nombre_clau;
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


      }
     
      
    });


  }

  agregarfirmaReceptor(){
    let json={firma_emisor:{titulo_academico:this.firmaEmisorAgregar.titulo_academico,nombre_emisor:this.firmaEmisorAgregar.nombre_emisor,
      cargo_emisor:this.firmaEmisorAgregar.cargo_emisor,institucion_emisor:this.firmaEmisorAgregar.institucion_emisor}};
  }

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

  Descargar(){

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
      
      if(this.clausula.controls[i].value.nombre.length==0 || this.clausula.controls[i].value.descripcion.length==0)
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

    // const doc = new jsPDF();

    // doc.text(this.myform.get('nombre_convenio')?.value, 10, 10);
    // doc.save('Convenio plantilla.pdf');
    
    

  }


}


