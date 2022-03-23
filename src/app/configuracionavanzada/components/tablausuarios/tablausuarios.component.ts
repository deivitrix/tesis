import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';

@Component({
  selector: 'app-tablausuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablausuariosComponent implements OnInit {

  loading = true;

  listaUsuarios: any[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  public filtro: string = '';

  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  constructor(private usuario:UsuarioServicesService) { }

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

}
