import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogusuariosComponent } from '../dialogusuarios/dialogusuarios.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-funcionalidades-usuarios',
  templateUrl: './funcionalidades-usuarios.component.html',
  styleUrls: ['./funcionalidades-usuarios.component.css']
})
export class FuncionalidadesUsuariosComponent implements OnInit {
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

  constructor(private usuario:UsuarioServicesService,public dialog: MatDialog) { 
   
  }

  ngOnInit():void {
    this.getUsuarios();

  }

getUsuarios(){
  this.usuario.getUsuarios()
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


}
