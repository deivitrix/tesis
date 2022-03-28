import { DialoginformacionComponent } from './../dialoginformacion/dialoginformacion.component';
import { GeneralMovilidadService } from './../../../services/generalMovilidad/general-movilidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tablamostrarmovilidad',
  templateUrl: './tablamostrarmovilidad.component.html',
  styleUrls: ['./tablamostrarmovilidad.component.css']
})
export class TablamostrarmovilidadComponent implements OnInit {

  //loading 
  loading=true;
  loadingspinner=false;
  
 //FormGroup
   selector: FormGroup;
  tabla = false;

  //lista 
  listsolicitud:any[]=[];

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



  constructor(private mostrar: FormBuilder, private movilidad:GeneralMovilidadService, public dialog: MatDialog) {
    
 this.selector=mostrar.group({
   tipo:['',Validators.required]
 })
   }

  ngOnInit(): void {
  }

  cambioEstadoMovilidad(event: any){
    this.botongenerar=false;
    this.loadingspinner=true;
    this.movilidad.getEstadoSolicitudMovilidad(event.value)
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
    const dialogRef1=this.dialog.open(DialoginformacionComponent,{
      width:'1300px',
      data:{titulo:'Informacion Solicitud',objeto:id}
    });
    

  }


}
