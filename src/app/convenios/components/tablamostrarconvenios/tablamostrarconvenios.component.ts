import { GenerarreporteconvenioComponent } from './../generarreporteconvenio/generarreporteconvenio.component';
import { element } from 'protractor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConveniosTipoModel } from 'src/app/models/convenios/conveniostipos';
import { MatDialog } from '@angular/material/dialog';
import { GenerarReporteModel } from 'src/app/models/convenios/generarreporte';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';

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

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';
  loading=true;

  constructor(
    private convenios: ConveniosServicesService,
    private mostrar: FormBuilder,
    public dialog: MatDialog,
    public snackBar:MatSnackBar
  ) {
    this.selector = mostrar.group({
      conveniostipo: ['', Validators.required],
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
      console.log(res);
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


   


   // mandar a un link externo
  //  let urlToOpen:string='http://utmdricb.herokuapp.com/api/nombre-tipo-convenio';
  //  let url: string = '';
  //  if (!/^http[s]?:\/\//.test(urlToOpen)) {
  //   url += 'http://';
  //  }

  //  url += urlToOpen;
  //  window.open(url, '_blank');
   
   
   
   
   

   
   
  }
}
