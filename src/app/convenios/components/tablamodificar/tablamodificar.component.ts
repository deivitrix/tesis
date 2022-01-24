import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-tablamodificar',
  templateUrl: './tablamodificar.component.html',
  styleUrls: ['./tablamodificar.component.css']
})
export class TablamodificarComponent implements OnInit {


  // formGroup
  selector: FormGroup;
  //listado de la tabla 
  listaConv: any[] = [];
  listaConvaux:any[]=[];
  // tabla de convenios
  loading=true;
  tabla = false;

  //filtro
  public filtro: string = '';

  //boton eliminar
  botoneliminar=false; 


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  constructor(private convenios: ConveniosServicesService,
    private mostrar: FormBuilder,
    public dialog: MatDialog,
    public snackBar:MatSnackBar,
    public router:Router) {
      this.selector = mostrar.group({
        conveniostipo: ['', Validators.required],
      });
    }
    applyFilter(event: any) {
      this.filtro = event.target.value;
    }
    cambioConveniosTipos(event: any) {
      this.convenios.getconveniostipo(event.value).subscribe((res: any) => {
        this.tabla = true;
        this.loading=false;
        this.listaConvaux=[];
        this.listaConv=[];
        this.listaConvaux=res;
        this.loading=false;
        if(this.listaConvaux.length!=0)
        {
          for(var i=0;i<this.listaConvaux.length;i++){
            if(this.listaConvaux[i].estado=="A")
            {
              this.listaConv.push(this.listaConvaux[i]);
            }
          }
          this.listaConv.map((element, index) => (element.position = index + 1));
          this.listaConv.map(
            (element) =>
              (element.fecha_creacion = element.f_creaciondoc.split(' ')[0])
          );
          //console.log(this.listaConv);
        
        }
      });
    }

  ngOnInit(): void {
  }

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }


  editarconvenio(id:string)
  {
    if(this.selector.get('conveniostipo')?.value=='A'){
     
      this.router.navigate(['/utmricb/convenios/editarconveniosaprovados/'+id]);

    }
    else if(this.selector.get('conveniostipo')?.value=='P'|| this.selector.get('conveniostipo')?.value=='G')
    {
      var g=this.selector.get('conveniostipo')?.value;
      this.router.navigate(['/utmricb/convenios/editcon/'+id+'/'+'modificar'+'/'+g]);

    }
  }
  //eliminar
  eliminarconvenio(id:string, tipo:string)
  {
    this.botoneliminar=true; 
    var titulo="";
    if(tipo=='P')
    {
      titulo="Esta seguro que desea Eliminar la Plantilla?";

    }
    if(tipo=='A'||tipo=='G'){

      titulo="Esta seguro que desea Eliminar el Convenio? ";
    }

    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: titulo,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No eliminar`,
     
    }).then((result)=>{
      if(result.isConfirmed)
      { 
        let json={data:{
          id_convenio:id,
          estado:"D"
        }};

        console.log(json);
        
        this.convenios.eliminarconvenio(json)
        .subscribe((res:any)=>{
          console.log(res);
          

          if(res.estado==true)
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title:'Eliminacion exitosa......!!',
              icon:'success'
            });
           
            this.convenios.getconveniostipo(this.selector.get('conveniostipo')?.value).subscribe((res: any) => {
              this.tabla = true;
              this.loading=false;
              this.listaConvaux=[];
              this.listaConv=[];
              this.listaConvaux=res;
              this.loading=false;
              if(this.listaConvaux.length!=0)
              {
                for(var i=0;i<this.listaConvaux.length;i++){
                  if(this.listaConvaux[i].estado=="A")
                  {
                    this.listaConv.push(this.listaConvaux[i]);
                  }
                }
                this.listaConv.map((element, index) => (element.position = index + 1));
                this.listaConv.map(
                  (element) =>
                    (element.fecha_creacion = element.f_creaciondoc.split(' ')[0])
                );
                //console.log(this.listaConv);
              
              }
            });
            this.botoneliminar=false;

            
            //window.location.reload();
          }
        })

      }
      else if(result.isDenied)
      {
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title:'Se cancelo la operacion',
          icon:'warning'
        })
        this.botoneliminar=false;
      }
    })


  }

}
