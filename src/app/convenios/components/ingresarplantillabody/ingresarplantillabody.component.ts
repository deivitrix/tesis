import { MensajeconfiguracionComponent } from './../../../configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { IngresarCategoriaComponent } from './../ingresar-categoria/ingresar-categoria.component';
import { ConveniosEspecificosModel } from './../../../models/convenios/conveniosEspecificos';
import { ConveniosServicesService } from './../../../services/generalConvenios/convenios-services.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  convenio=true;
  especifico=true;

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
      selectFirmaEmisor:[''],
      selectFirmaReceptor:[''],

    });


  }

  get clausula() {
      return this.myform.get('clausulas') as FormArray;
  }
 
  
 

  ngOnInit(): void {
    this.getconveniosEspecificos();

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
      nombre:'',
      descripcion:'',
      articulos:this.ingresar.array([
      ])
    });
    this.clausula.push(clausulasFormGroup);
    this.indice1=0;
  }
  
  
  
 

  removerAntecedentes(indice:number)
  {
    this.clausula.removeAt(indice);
    //this.articulos.controls=[];
    
    //console.log(this.clausula);
    

  }

  articulogroup(){
    return this.ingresar.group({
      des_art:'',
      subtipo:''
    });
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
      clausula:'',
      des_art:''
    });
  
      this.articulos.push(articuloFormGroup);
    // console.log(this.antecedente);
    
    
    
  }
  removerArticulo(indice:number,articulo_indice:number)
  {
    const articulo=(<FormArray>this.myform.get('clausulas')).at(indice).get('articulos') as FormArray;
     articulo.removeAt(articulo_indice);
      
  }
}


