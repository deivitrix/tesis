import { Router } from '@angular/router';
import { GenerarreporteconvenioComponent } from './../generarreporteconvenio/generarreporteconvenio.component';
import { element } from 'protractor';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConveniosTipoModel } from 'src/app/models/convenios/conveniostipos';
import { MatDialog } from '@angular/material/dialog';
import { GenerarReporteModel } from 'src/app/models/convenios/generarreporte';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { FirmaModel } from 'src/app/models/convenios/firmaconvenio';

@Component({
  selector: 'app-tablamostrarconvenios',
  templateUrl: './tablamostrarconvenios.component.html',
  styleUrls: ['./tablamostrarconvenios.component.css'],
})
export class TablamostrarconveniosComponent implements OnInit {
  selector: FormGroup;
  tabla = false;
  conveniotipo: ConveniosTipoModel[] = [];
  conveniotipoaux: ConveniosTipoModel[] = [];
  show = true;

  generarReporte=true;
  arrayfecha:GenerarReporteModel={fechafin:'',fechainicio:'',tipo:''};

  listaConv: any[] = [];
  listaConvaux:any[]=[];

   // listar sin modelo
   datosconvenio:any;
   // formGroup
  myform:FormGroup;

  // boton vista
  botonvista=false;

  firmaconvenio:FirmaModel[]=[];
  firmaAgregar:FirmaModel={id:0,titulo_academico:'',nombres:'',cargo:'',institucion:''};

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';
  loading=true;

  constructor(
    private convenios: ConveniosServicesService,
    private mostrar: FormBuilder,
    public dialog: MatDialog,
    public snackBar:MatSnackBar,
    private router:Router
  ) {
    this.selector = mostrar.group({
      conveniostipo: ['', Validators.required],
    });
    this.myform=this.mostrar.group({
      id_convenio:[''],
      id_usuario:[''],
      id_tipoconvenio:[''],
      id_tipoespecifico:[''],
      nombre_convenio:['',Validators.required],
      comparecientes:['',Validators.required],
      clausulas: this.mostrar.array([]),
      selectFirmaEmisor:['',Validators.required],
      selectFirmaReceptor:['',Validators.required],
      firmaEmisor:this.mostrar.array([]),
      firmaReceptor:this.mostrar.array([]),
    });

  }

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  ngOnInit(): void {}

  cambioConveniosTipos(event: any) {
    this.generarReporte=false;
    this.convenios.getconveniostipo(event.value).subscribe((res: any) => {
      this.tabla = true;
      this.loading=false;
      this.listaConvaux=[];
      this.listaConv=[];
      this.listaConvaux=res;
      this.loading=false;
      if(this.listaConvaux.length!=0)
      {
        for(var i=0;i<this.listaConvaux.length;i++){
          if(this.listaConvaux[i].estado=="A")
          {
            this.listaConv.push(this.listaConvaux[i]);
          }
        }
        this.listaConv.map((element, index) => (element.position = index + 1));
        this.listaConv.map(
          (element) =>
            (element.fecha_creacion = element.f_creaciondoc.split(' ')[0])
        );

      }
    });
  }

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

  generarReporteAccion()
  {
    const dialogRef=this.dialog.open(GenerarreporteconvenioComponent,{
      width:'500px',
      data:{titulo:'Ingresar la Fecha para Generar Reporte',fecha:this.arrayfecha}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
        this.arrayfecha=result;
        this.separarFecha();
      }
     
      
    });

  }

  separarFecha()
  {

    if(this.arrayfecha.fechainicio.length==0|| this.arrayfecha.fechafin.length==0)
    {
      this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
        data:{
          titulo:'Error.....',
          mensaje:"Datos Faltantes para Generar el Reporte",
         buttonText:'',
         icon:'warning'
        },
        duration:1500,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'     
      });
      return;
    }
  // obtener la fecha en string
   var fechai=this.arrayfecha.fechainicio;
   var fechaf=this.arrayfecha.fechafin;
  // transformar en Date
   var fechaiaux=new Date(fechai);
   var fechafaux=new Date(fechaf);

   // Fecha inicio string
   var diainicioaux=fechaiaux.getDate();
   var mesinicioaux=(fechaiaux.getMonth()+1);
   var diainicio="";
   var mesinicio="";
   
   if(diainicioaux<=9){
    diainicio="0"+diainicioaux
  }
  else{
    diainicio=""+diainicioaux;
  }

  if(mesinicioaux<=9){

   mesinicio="0"+mesinicioaux;
  }
  else{
   mesinicio=""+mesinicioaux;
  }

   //fecha final string
   var diafinalaux=fechafaux.getDate();
   var mesfinalaux=(fechafaux.getMonth()+1);
   var diafinal="";
   var mesfinal="";
   
   if(diafinalaux<=9){
    diafinal="0"+diafinalaux
  }
  else{
    diafinal=""+diafinalaux;
  }

  if(mesfinalaux<=9){

   mesfinal="0"+mesfinalaux;
  }
  else{
   mesfinal=""+mesfinalaux;
  }
   
   

   var fechainicio=fechaiaux.getFullYear()+"-"+mesinicio+"-"+diainicio;
   var fechafinal=fechafaux.getFullYear()+"-"+mesfinal+"-"+diafinal;
  
   this.arrayfecha.fechainicio=fechainicio;
   this.arrayfecha.fechafin=fechafinal;
   this.arrayfecha.tipo=this.selector.get('conveniostipo')?.value;

   
   // Mandar a la vista para generar el Reporte 
   this.arrayfecha.fechainicio="";
   this.arrayfecha.fechafin="";
   this.arrayfecha.tipo=""; 


   


  
   
   
   
   
   

   
   
  }




  // visualizar convenios aprobados
  conveniosURL(id:string,tipo:string,pdf:string)
  {
   if(tipo=='A')
   {
    let urlToOpen:string=pdf;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
   }
   if(tipo=='G')
   {
     this.botonvista=true;
      this.myform=this.mostrar.group({
      id_convenio:[''],
      id_usuario:[''],
      id_tipoconvenio:[''],
      id_tipoespecifico:[''],
      nombre_convenio:['',Validators.required],
      comparecientes:['',Validators.required],
      clausulas: this.mostrar.array([]),
      selectFirmaEmisor:['',Validators.required],
      selectFirmaReceptor:['',Validators.required],
      firmaEmisor:this.mostrar.array([]),
      firmaReceptor:this.mostrar.array([]),
    });
     this.getdatosconvenios(id);
   }
  

  }

  // datosconvenio
  getdatosconvenios(id:string){
    this.convenios.searchconvenio(id)
    .subscribe((res:any)=>{
      this.datosconvenio=res;
      //console.log(this.datosconvenio);
  
      this.myform.patchValue({
        id_convenio:id,
        id_usuario:this.datosconvenio.id_usuario,
        id_tipoconvenio:this.datosconvenio.id_tipoconvenio,
        id_tipoespecifico:this.datosconvenio.id_tipoespecifico,
        nombre_convenio:this.datosconvenio.nombre_convenio,
        comparecientes:this.datosconvenio.comparecientes
      });

       var emi=""+this.datosconvenio.selectFirmaEmisor as string;
       var rece=""+this.datosconvenio.selectFirmaReceptor as string;
  
        this.myform.patchValue({
          selectFirmaEmisor:emi,
          selectFirmaReceptor:rece
        });
        this.agregarclausulaDatos(this.datosconvenio);


        // firma 
        this.insertarobjetofirma_datos(emi);
        this.insertarobjetofirma_datosReceptor(rece);

      
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
            
            const firmaEmisor=this.mostrar.group({
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
          
          const firmaEmisor=this.mostrar.group({
            nombre:nombre,
            cargo:item.cargo,
            institucion:item.institucion
          });
  
          this.firmaReceptorArray.push(firmaEmisor);
          let json={data:this.myform.value}
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
          
          
        }
      });
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
      const clausulasFormGroup=this.mostrar.group({
        id:datosconvenio.clausulas[i].id,
        nombre:datosconvenio.clausulas[i].nombre,
        descripcion:descripcion,
        tipo:datosconvenio.clausulas[i].tipo,
        articulos:this.mostrar.array([])
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
            const articuloFormGroup=this.mostrar.group({
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

  //modelos
  get firmaEmisorArray()
  {
    return this.myform.get("firmaEmisor") as FormArray;
  }

  get firmaReceptorArray(){
    return this.myform.get("firmaReceptor") as FormArray;
  }

  get clausula() {
    return this.myform.get('clausulas') as FormArray;
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

  
}
