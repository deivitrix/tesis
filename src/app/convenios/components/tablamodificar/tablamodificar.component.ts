import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';

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
      console.log(event.value);
      
      this.convenios.getconveniostipo(event.value).subscribe((res: any) => {
        this.tabla = true;
        this.loading=false;
        console.log(res);
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

    }
    else if(this.selector.get('conveniostipo')?.value=='P'|| this.selector.get('conveniostipo')?.value=='G')
    {
      var g=this.selector.get('conveniostipo')?.value;
      this.router.navigate(['/utmricb/convenios/editcon/'+id+'/'+'modificar'+'/'+g]);

    }


  }

}
