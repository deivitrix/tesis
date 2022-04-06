import { DialoginformacionbecasComponent } from './../dialoginformacionbecas/dialoginformacionbecas.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablaeditarsolicitudesbecas',
  templateUrl: './tablaeditarsolicitudesbecas.component.html',
  styleUrls: ['./tablaeditarsolicitudesbecas.component.css']
})
export class TablaeditarsolicitudesbecasComponent implements OnInit {

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

  //selector
  selector_a="";

 constructor(private mostrar: FormBuilder, private becas:BecasnivelService, public dialog: MatDialog,private router:Router) { 
   this.selector=mostrar.group({
     tipo:['',Validators.required]
   })
 }

 ngOnInit(): void {
 }
 cambioEstadoMovilidad(event: any){
   this.botongenerar=false;
   this.loadingspinner=true;
   this.selector_a=event.value;
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
 
 editar(id:number)
   {
    this.router.navigate(['/utmricb/becas/editarSolicitud-becas/'+id+'/'+this.selector_a])
   }
}
