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


  //firmaReceptor
  firmaReceptoraux:FirmaReceptorModel[]=[];
  firmaReceptor:FirmaReceptorModel[]=[];

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

  get clausula() {
      return this.myform.get('clausulas') as FormArray;
  }

  ngOnInit(): void {
    this.getconveniosEspecificos();
    this.getclausulas();
    this.getfirmaemisor();
    this.getfirmareceptor();
  }



  getclausulas(){
    this.convenios.getclausulas()
    .subscribe((res:any) => {
      this.clausulasget=res;
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
    if(this.selector.get('convenios')?.value=='M')
    {
      this.selector.get('especificos')?.disable();
      this.selector.patchValue({
        especificos:''
      });
    }

    if(this.selector.get('convenios')?.value=='E')
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


}


