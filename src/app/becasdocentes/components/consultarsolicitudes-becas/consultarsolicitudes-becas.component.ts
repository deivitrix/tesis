import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BecasnivelService } from 'src/app/services/becasnivel.service';

@Component({
  selector: 'app-consultarsolicitudes-becas',
  templateUrl: './consultarsolicitudes-becas.component.html',
  styleUrls: ['./consultarsolicitudes-becas.component.css']
})
export class ConsultarsolicitudesBecasComponent implements OnInit {

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

  // facultad que pertenece
  facultad:string="";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  constructor(
    private becas:BecasnivelService,public dialog: MatDialog,
    
  ) { 
    var id_personal;
    id_personal=localStorage.getItem("id_personal") as string;  
    this.id=id_personal;
  }

  ngOnInit(): void {
    this.getsolicitudbecas();
  }
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }


  getsolicitudbecas(){
   this.becas.getsolicitudbecas(this.id)
   .subscribe((res:any)=>{
    this.loading=false;
    if(res.estado==true){
   this.listsolicitud=res.datos;
    this.listsolicitud.map((element, index) => (element.position = index + 1));
    this.listsolicitud.forEach((item:any)=>{
      this.nombres=item.nombres;
      this.apellidos=item.apellidos;
      this.facultad=item.nombre_facultad.trim();

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
