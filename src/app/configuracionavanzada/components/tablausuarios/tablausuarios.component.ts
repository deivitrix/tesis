import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogusuariosComponent } from '../dialogusuarios/dialogusuarios.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-tablausuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablausuariosComponent implements OnInit {
 
  loading = true;
  loadingspinner=false;

  listaUsuarios: any[] = [];
  //cedula
  cedula="";


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  constructor(private usuario:UsuarioServicesService,public dialog: MatDialog) { }

  ngOnInit():void {
    this.getUsuarios();
  }

getUsuarios(){
  this.usuario.getUsuariosDRICB()
  .subscribe((res:any)=>{
    if(res.estado==true){
      this.loading=false;
      this.listaUsuarios=[];
      this.listaUsuarios=res.datos;

      this.listaUsuarios.map((element, index) => (element.position = index + 1));
    }
  } )

}

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }


  //agregar usuario
  opendialogUsuario(){
    const dialogRef1=this.dialog.open(DialogusuariosComponent,{
      width:'500px',
      data:{titulo:'Ingresar Cedula Persona',objeto:{tipo:"B",cedula:""}}
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if(result!=null)
      {
        
        if(result.objeto.cedula.length==0)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Se debe ingresar un N° cedula correcto!!!',
            icon:'warning'
          });
          return;

        }
        else if(result.objeto.cedula.length<10 || result.objeto.cedula.length>10)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Ingresar los numeros correctos del N° cedula ',
            icon:'warning'
          });
          return;
        }
        this.cedula=result.objeto.cedula;

        this.usuario.getusuarioconsulta(this.cedula)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {
            
                var nombres=res.datos.nombres+" "+res.datos.apellido1+" "+res.datos.apellido2;
                const dialogRef2=this.dialog.open(DialogusuariosComponent,{
                  width:'500px',
                  data:{titulo:'Usuario Datos Personales',objeto:{tipo:"G",nombres:nombres,cargo_id:""}}
                });
                dialogRef2.afterClosed().subscribe(result2 => {
                  console.log('The dialog was closed');
      
                  if(result2!=null)
                  {
                    if(result2.objeto.cargo_id.length==0)
                    {
                      Swal.fire({
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        },
                        title:'Seleccionar un cargo para el usuario',
                        icon:'warning'
                      });
                      return;

                    }

                    let json={
                      data:{
                        idpersonal:res.datos.idpersonal,
                        idcargos:result2.objeto.cargo_id
                      }
                    }

                    this.usuario.addusuariosistema(json)
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
                          title:'Se ingreso correctamente el usuario al sistema!!!',
                          icon:'success'
                        });
                        this.getUsuarios()
                      }

                    });




                  }

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
            return;
          }
        })





        


      }
     
      
    });
  }

}
