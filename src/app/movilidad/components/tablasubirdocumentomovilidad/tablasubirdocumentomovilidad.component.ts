import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GeneralMovilidadService } from 'src/app/services/generalMovilidad/general-movilidad.service';

@Component({
  selector: 'app-tablasubirdocumentomovilidad',
  templateUrl: './tablasubirdocumentomovilidad.component.html',
  styleUrls: ['./tablasubirdocumentomovilidad.component.css']
})
export class TablasubirdocumentomovilidadComponent implements OnInit {

   //loading 
   loading=true;
   loadingspinner=false;
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
 

  constructor(private movilidad:GeneralMovilidadService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovilidadBecas();
  }
  getMovilidadBecas(){
    this.loadingspinner=true;
    this.movilidad.getablaaprobadosSolicitud()
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

  //subir documento
  subir(id:number){

  }
}
