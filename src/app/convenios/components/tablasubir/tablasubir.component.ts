import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';

@Component({
  selector: 'app-tablasubir',
  templateUrl: './tablasubir.component.html',
  styleUrls: ['./tablasubir.component.css']
})
export class TablasubirComponent implements OnInit {
  //listado de la tabla 
  listaConv: any[] = [];
  listaConvaux:any[]=[];
  // tabla de convenios
  loading=true;
  tabla = false;

  //filtro
  public filtro: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;


  constructor(private convenios: ConveniosServicesService,
    public dialog: MatDialog,
    public snackBar:MatSnackBar,
    public router:Router) {


     }

  ngOnInit(): void {
    this.getconveniosaprobados()
  }
  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  getconveniosaprobados(){
    this.convenios.getconveniostipo('G').subscribe((res: any) => {
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
  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

  subir(id:string){
    this.router.navigate(['/utmricb/convenios/subirconvenios/'+id+'/G']);
    //subirconvenios/:id/:tipo
  }


}
