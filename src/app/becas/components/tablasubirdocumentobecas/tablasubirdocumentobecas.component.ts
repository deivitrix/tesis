import { DialogsubirdocumentobecasComponent } from './../dialogsubirdocumentobecas/dialogsubirdocumentobecas.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BecasnivelService } from 'src/app/services/becasnivel.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';


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
  subir(id:number,nombres:string,apellidos:string){
    const  archivo:File=new File([""],"");

    var nombres_a=nombres+" "+apellidos;
    const dialogRef1=this.dialog.open(DialogsubirdocumentobecasComponent,{
      width:'700px',
      data:{titulo:'Subir Documento Final Becas',nombres:nombres_a,objeto:archivo,subir:false}
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); 
    if(result!=null)
    { 
      if(result.subir==true)
      {
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title: 'Desea subir el documento?....',
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          denyButtonText: `No Guardar`,
          
        }).then((result1)=>{
          if(result1.isConfirmed)
          {
            this.loadingspinner=true;
            const archivo=result.objeto;
            const formData = new FormData();
            formData.append('document', archivo);
            this.becas.addsolicitudfinalftp(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                console.log(res.documento);
                this.loadingspinner=false;

              }
            })
          }
        })


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
          title:'Se debe seleccionar un archivo PDF',
          icon:'warning'
        });
        return;
      }

    }
    
    });

  }

}
