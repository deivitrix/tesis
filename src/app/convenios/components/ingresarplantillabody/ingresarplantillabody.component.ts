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

//import Swal from 'sweetalert2'

//Alertas
import Swal from 'sweetalert2';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';

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

  // Nombre tipo convenios
  nombretipoconvenios:NombreTipoConveniosModel[]=[];
  botonvista=false;


// cedula del usuario
cedula:string;

  constructor(private ingresar:FormBuilder,private convenios:ConveniosServicesService,
              public dialog: MatDialog,public snackBar:MatSnackBar, private router:Router,
              private usuario:UsuarioServicesService) 
  {
    this.selector=this.ingresar.group({
      convenios:['',Validators.required],
       especificos:[{value:'',disabled: true},Validators.required]
    });

    this.myform=this.ingresar.group({
      id_usuario:[''],
      id_tipoconvenio:[''],
      id_tipoespecifico:[''],
      nombre_convenio:['',Validators.required],
      comparecientes:['',Validators.required],
      clausulas: this.ingresar.array([]),
      selectFirmaEmisor:['',Validators.required],
      selectFirmaReceptor:['',Validators.required],
      firmaEmisor:this.ingresar.array([]),
      firmaReceptor:this.ingresar.array([]),
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
    this.getfirmaemisor();
    this.getfirmareceptor();
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
  

  removerAntecedentes(indice:number)
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
          this.agregarfirma();


      }
     
      
    });


  }

  agregarfirma(){
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

  // agregarfirmaEmisorDialog(){
  //   const dialogRef=this.dialog.open(IngresarfirmaemisorComponent,{
  //     width:'600px',
  //     data:{titulo:'Ingresar Firma del Emisor',emisor:this.firmaEmisorAgregar}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if(result!=null)
  //     {
  //       this.firmaEmisorAgregar=result;
  //        if(this.firmaEmisorAgregar.nombre_emisor.length==0 || this.firmaEmisorAgregar.titulo_academico.length==0 ||
  //           this.firmaEmisorAgregar.cargo_emisor.length==0 || this.firmaEmisorAgregar.institucion_emisor.length==0)
  //           {
  //             this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
  //               data:{
  //                 titulo:'Error.....',
  //                 mensaje:"Datos Faltantes",
  //                buttonText:'',
  //                icon:'error'
  //               },
  //               duration:1000,
  //               horizontalPosition:'end',
  //               verticalPosition:'bottom',
  //               panelClass:'error'     
  //             });
  //             this.firmaEmisorAgregar={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};
  //             return;
  //           }
  //        this.agregarfirmaEmisor();
  //     }
     
      
  //   });

  // }

  // agregarfirmaEmisor(){
  //   let json={firma_emisor:{titulo_academico:this.firmaEmisorAgregar.titulo_academico,nombre_emisor:this.firmaEmisorAgregar.nombre_emisor,
  //     cargo_emisor:this.firmaEmisorAgregar.cargo_emisor,institucion_emisor:this.firmaEmisorAgregar.institucion_emisor}};
  //   this.convenios.addfirmaEmisor(json).
  //   subscribe((res:any)=>{
  //     if(res.estado==true)
  //     {
  //       this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
  //         data:{
  //           titulo:'Success.....',
  //           mensaje:res.mensaje,
  //          buttonText:'',
  //          icon:'success'
  //         },
  //         duration:1000,
  //         horizontalPosition:'end',
  //         verticalPosition:'bottom',
  //         panelClass:'success'     
  //       });
  //       this.firmaEmisorAgregar={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};
  //       this.firmaEmisor=[];
  //       this.getfirmaemisor();
  //       return;
        

  //     }
  //     if(res.estado==false)
  //     {
  //       this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
  //         data:{
  //           titulo:'Error.....',
  //           mensaje:res.mensaje,
  //          buttonText:'',
  //          icon:'warning'
  //         },
  //         duration:1000,
  //         horizontalPosition:'end',
  //         verticalPosition:'bottom',
  //         panelClass:'error'     
  //       });
  //       this.firmaEmisorAgregar={id:0,titulo_academico:'',nombre_emisor:'',cargo_emisor:'',institucion_emisor:''};
  //       return;
  //     }
  //   });

  // }

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
      }

    });
  }


}


