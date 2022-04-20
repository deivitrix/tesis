import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GeneralMovilidadService } from 'src/app/services/generalMovilidad/general-movilidad.service';

@Component({
  selector: 'app-consultarsolicitud-movilidad',
  templateUrl: './consultarsolicitud-movilidad.component.html',
  styleUrls: ['./consultarsolicitud-movilidad.component.css']
})
export class ConsultarsolicitudMovilidadComponent implements OnInit {

   //loading
   loading=true;
  
   loadingspinner=false;

  //id del usuario
   id:string;
   
  //lista 

  listsolicitud:any[]=[];

  //nombres y apellidos
  nombres:string="";
  apellidos:string="";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 5;
  public pageNumber: number = 1;

  constructor(
    private movilidad:GeneralMovilidadService,public dialog: MatDialog,
  ) { 
    var id_personal;
    id_personal=localStorage.getItem("id_personal") as string;  
    this.id=id_personal;
  }

  ngOnInit(): void {
    this.getsolicitud();
  }
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }


  getsolicitud(){
  //  this.listsolicitud=this.id;
    this.movilidad.getsolicitudmovilidad(this.id)
    .subscribe((res:any)=>{
      this.loading=false;
      if(res.estado==true){
        this.listsolicitud=res.datos;
    this.listsolicitud.map((element, index) => (element.position = index + 1));
    this.listsolicitud.forEach((item:any)=>{
      this.nombres=item.nombres;
      this.apellidos=item.apellidos;

      if(item.estado_solicitud=="A")
      {
        item.estado_solicitud="APROBADO";

      }
      if(item.estado_solicitud=="P")
      {
        item.estado_solicitud="PENDIENTE";

      }
      if(item.estado_solicitud=="R")
      {
        item.estado_solicitud="RECHAZADO";

      }
    })
  }

})}}
