import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BecasnivelService } from 'src/app/services/becasnivel.service';

@Component({
  selector: 'app-tablasubirdocumentobecas',
  templateUrl: './tablasubirdocumentobecas.component.html',
  styleUrls: ['./tablasubirdocumentobecas.component.css']
})
export class TablasubirdocumentobecasComponent implements OnInit {
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

  constructor(private becas:BecasnivelService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBecas();
  }

  getBecas(){
    this.loadingspinner=true;
    this.becas.getablaaprobadosSolicitud()
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

  //subir
  subir(id:number){

  }

}
