import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogusuariosComponent } from '../dialogusuarios/dialogusuarios.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { DialoghistorialComponent } from '../dialoghistorial/dialoghistorial.component';


@Component({
  selector: 'app-tablahistorial',
  templateUrl: './tablahistorial.component.html',
  styleUrls: ['./tablahistorial.component.css']
})
export class TablahistorialComponent implements OnInit {
  loading = true;
  loadingspinner=false;

  listaHistorial: any[] = [];

  //cedula
  cedula="";

  // cedula del usuario
  //id:string;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  constructor(private usuario:UsuarioServicesService,public dialog: MatDialog) { 
   
  }

  ngOnInit():void {
    this.getUsuarios();

  }

getUsuarios(){
  this.usuario.getHistorial()
  .subscribe((res:any)=>{
    this.loading=false;
    if(res.estado==true){
      this.listaHistorial=[];
      this.listaHistorial=res.datos;
      this.listaHistorial.map((element, index) => (element.position = index + 1));
    }
  } )

}



  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }


  opendialogInformacio(id:number)
  {
    const dialogRef1=this.dialog.open(DialoghistorialComponent,{
      width:'1300px',
      data:{titulo:'Datos Historial',objeto:id}
    });
    

  }

  
}
