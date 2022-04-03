
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GeneralMovilidadService } from 'src/app/services/generalMovilidad/general-movilidad.service';
import { DialogsubirdocumentomovilidadComponent } from '../dialogsubirdocumentomovilidad/dialogsubirdocumentomovilidad.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

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
 

  constructor(private movilidad:GeneralMovilidadService, public dialog: MatDialog) { 

  }

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
  subir(id:number,nombres:string,apellidos:string){
    const  archivo:File=new File([""],"");

    var nombres_a=nombres+" "+apellidos;
    const dialogRef1=this.dialog.open(DialogsubirdocumentomovilidadComponent,{
      width:'700px',
      data:{titulo:'Subir Documento Final Movilidad',nombres:nombres_a,objeto:archivo,subir:false}
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
          title: 'Desea subir el documento final?....',
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
            this.movilidad.addsolicitudfinalftp(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                // console.log(res.documento);
                let json={
                  data:{
                    id:id,
                    PDF:res.documento,
                    tipo:"M"
                  }
                }
                this.movilidad.updateEstadoSubirDocumento(json)
                .subscribe((res1:any)=>{
                  this.loadingspinner=false;
                  if(res1.estado==true)
                  {
                    Swal.fire({
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      },
                      title:'Se actualizado el registro de Movilidad...!!',
                      icon:'success'
                    });
                    this.getMovilidadBecas();
                  }
                  else{
                    Swal.fire({
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      },
                      title:res1.mensaje,
                      icon:'warning'
                    });
                    return;
                  }

                });

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
