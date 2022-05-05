import { DialoginformacionbecasComponent } from './../dialoginformacionbecas/dialoginformacionbecas.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { GenerarreporteconvenioComponent } from 'src/app/convenios/components/generarreporteconvenio/generarreporteconvenio.component';
import { GenerarReporteModel } from 'src/app/models/convenios/generarreporte';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleriaComponent } from 'src/app/convenios/components/galleria/galleria.component';

@Component({
  selector: 'app-tablamostrarbecas',
  templateUrl: './tablamostrarbecas.component.html',
  styleUrls: ['./tablamostrarbecas.component.css']
})
export class TablamostrarbecasComponent implements OnInit {
   //loading 
   loading=true;
   loadingspinner=false;
   
  //FormGroup
    selector: FormGroup;
   tabla = false;

   //estado movilidad
  estado_movilidad="";
 
   //lista 
   listsolicitud:any[]=[];

   //tipo 
   estado!:string;

   arrayfecha:GenerarReporteModel={fechafin:'',fechainicio:'',tipo:''};
 
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 
   public pageSize: number = 10;
   public pageNumber: number = 1;
 
   //filtro
   public filtro: string = '';
 
   applyFilter(event: any) {
     this.filtro = event.target.value;
   }
 
   //boton
   botongenerar=true;

  constructor(private mostrar: FormBuilder, private becas:BecasnivelService, public dialog: MatDialog, public snackBar:MatSnackBar,) { 
    this.selector=mostrar.group({
      tipo:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }
  cambioEstadoMovilidad(event: any){
    this.estado=event.value;
    this.botongenerar=false;
    this.loadingspinner=true;
    this.estado_movilidad=event.value;
    this.becas.getEstadoSolicitudMovilidad(event.value)
    .subscribe((res:any)=>{
      this.tabla=true;
      this.loading=false;
      this.loadingspinner=false;
      this.listsolicitud=[];
      if(res.estado==true)
      {
        this.listsolicitud=res.datos;
        this.listsolicitud.map((element, index) => (element.position = index + 1));
      }


    });


  }
  //paginacion
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

  opendialogInformacio(id:number)
  {
    const dialogRef1=this.dialog.open(DialoginformacionbecasComponent,{
      width:'1300px',
      data:{titulo:'Informacion Solicitud',objeto:id}
    });
    

  }

  //dialog reportes
  DialogReporte(){
    const dialogRef=this.dialog.open(GenerarreporteconvenioComponent,{
      width:'500px',
      data:{titulo:'Ingresar la Fecha para Generar Reporte',fecha:this.arrayfecha}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      { 
        this.arrayfecha=result;
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
        var data={id:0,url_escoger:""};
        const dialogRef1=this.dialog.open(GalleriaComponent,{
          width:'700px',
          data:{titulo:'Galeria ',url:data}
        });

        dialogRef1.afterClosed().subscribe(result1 => {
          console.log('The dialog was closed');
          if(result1!=null)
          { 
            if(result1.url_escoger.length==0)
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
            this.separarFecha(result1.url_escoger);

           
             
          }
        
         
          
        });

        // this.separarFecha(result1.url_escoger);

       
         
      }
      else{
        this.arrayfecha={fechafin:'',fechainicio:'',tipo:''}
      }
     
     
      
    });
  
  }
  separarFecha(imagen:string)
  {

    
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
  
   
   // Mandar a la vista para generar el Reporte
   let json={
     data:{
      fecha_inicio:fechainicio,
      fecha_fin: fechafinal,
      estado:this.estado,
      tipo:"B",
      imagen1:imagen
     }
   }

   
   this.botongenerar=true;
  //  this.botonvista=true;
   this.becas.generar_reporte(json)
   .subscribe((res:any)=>{

    if(res.estado)
    {
      let url1 = this.becas.VistaPDF(res.file) as string;
      let urlToOpen:string=url1;
     let url: string = '';
     if (!/^http[s]?:\/\//.test(urlToOpen)) {
       url += 'http://';
     }
    //  this.botonvista=false;
     this.botongenerar=false;
     this.arrayfecha={fechainicio:"",fechafin:"",tipo:""};
     url += urlToOpen;
     window.open(url, '_blank');
    }

   })
  }


  

}
