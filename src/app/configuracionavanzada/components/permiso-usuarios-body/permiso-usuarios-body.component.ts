import { AgregarPermisoComponent } from './../agregar-permiso/agregar-permiso.component';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-permiso-usuarios-body',
  templateUrl: './permiso-usuarios-body.component.html',
  styleUrls: ['./permiso-usuarios-body.component.css']
})
export class PermisoUsuariosBodyComponent implements OnInit {
  public id!:string;
  public loading=true;
  public loadingspinner=false;

  public listFuncionalidad:any[]=[];

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  constructor(private rutaActiva: ActivatedRoute,private usuario:UsuarioServicesService,public dialog: MatDialog) { 
    this.id=rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getFuncionalidad();
  }

  getFuncionalidad(){
    this.usuario.getFuncionalidadUsuario(this.id)
    .subscribe((res:any)=>{
      this.loading=false;
      console.log(res);
      
      if(res.estado==true)
      {
        this.listFuncionalidad=res.funcion;
        this.listFuncionalidad.map((element, index) => (element.position = index + 1));
        
      }

      
    })
  }

  
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

  cambioEstado(event:any,id:number){
    this.loadingspinner=true;

    let json={
      data:{
        id:this.id,
        funcion_id:id,
        estado:event.value
      }
    }


    this.usuario.updateFucionalidadEstadoUsuario(json)
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
          title:res.mensaje,
          icon:'success'
        });
        this.loading=true;
        this.getFuncionalidad()
        

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
        return;
        
      }
    })
    
    

  }

  openDialogFuncionalidad()
  {
    const dialogRef1=this.dialog.open(AgregarPermisoComponent,{
      width:'500px',
      data:{titulo:'Escoger una funcionalidad',objeto:{id_funcion:""}}
    });

    dialogRef1.afterClosed().subscribe((result)=>{
        if(result!=null)
        {
          if(result.objeto.id_funcion.length==0)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title:'Debe escoger una opcion de la Funcionalidad',
              icon:'warning'
            });
            return;
          }

          let json={
            data:{
              id:this.id,
              funcion_id:result.objeto.id_funcion
            }
          }

          this.usuario.agregarFuncionalidadUsuario(json)
          .subscribe((res:any)=>{
            if(res.estado==true)
            {
              Swal.fire({
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                title:res.mensaje,
                icon:'success'
              });
              this.loading=true;
              this.getFuncionalidad();
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
    });



  }



}
