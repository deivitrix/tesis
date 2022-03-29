import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { DialoginformacionbecasComponent } from '../dialoginformacionbecas/dialoginformacionbecas.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-tablabecas-aprobado',
  templateUrl: './tablabecas-aprobado.component.html',
  styleUrls: ['./tablabecas-aprobado.component.css']
})
export class TablabecasAprobadoComponent implements OnInit {
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
    this.getBecasSolicitud();
  }

  getBecasSolicitud(){
    this.loadingspinner=true;
    this.becas.getEstadoSolicitudMovilidad("P")
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
  aceptarSolicitud(id:number)
  { 
    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: 'Que desea realizar con esta solicitud....?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aprobar',
      denyButtonText: `Rechazar`,
      
    }).then((result)=>{

      if(result.isConfirmed){
         ///Aprobar
       this.loadingspinner=true;
       let json={
         data:{
           id:id,
           tipo:"B",
           estado_solicitud:"A"
         }
       }
       this.becas.updateSolicitudEstadoBecas(json)
       .subscribe((res:any)=>{
        this.loadingspinner=false;
        if(res.estado==true)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Solicitud Aprobada....!!!!',
            icon:'success'
          });
          this.getBecasSolicitud();

        }
        else{
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:res.mensaje,
            icon:'warning'
          });
        }
       });

      }

      if(result.isDenied)
      {
        //Rechazado
        this.loadingspinner=true;
       let json={
         data:{
           id:id,
           tipo:"B",
           estado_solicitud:"R"
         }
       }

       this.becas.updateSolicitudEstadoBecas(json)
       .subscribe((res:any)=>{
        this.loadingspinner=false;
         if(res.estado==true)
         {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Solicitud Rechazada.....!!!',
            icon:'warning'
          });

         }
         else
         {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:res.mensaje,
            icon:'warning'
          });

         }
       })



      }

    })

   }

}
