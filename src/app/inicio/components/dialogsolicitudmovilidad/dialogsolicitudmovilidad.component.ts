import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dialogsolicitudmovilidad',
  templateUrl: './dialogsolicitudmovilidad.component.html',
  styleUrls: ['./dialogsolicitudmovilidad.component.css']
})
export class DialogsolicitudmovilidadComponent implements OnInit {

  //lista 

  listsolicitud:any[]=[];

  //nombres y apellidos
  nombres:string="";
  apellidos:string="";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  constructor(
    public dialoRef:MatDialogRef<DialogsolicitudmovilidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getsolicitud();
  }
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }


  getsolicitud(){
    this.listsolicitud=this.data.objeto;
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

  onNoClick(){
    this.dialoRef.close();
  }

}
