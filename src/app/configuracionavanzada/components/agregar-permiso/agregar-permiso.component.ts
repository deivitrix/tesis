import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';

@Component({
  selector: 'app-agregar-permiso',
  templateUrl: './agregar-permiso.component.html',
  styleUrls: ['./agregar-permiso.component.css']
})
export class AgregarPermisoComponent implements OnInit {

  public listFuncionalidad:any[]=[];

  constructor(
    public dialoRef:MatDialogRef<AgregarPermisoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private usuario:UsuarioServicesService
  ) { }

  ngOnInit(): void {
    this.getFuncionalidad()
  }

  onNoClick(){
    this.dialoRef.close();
  }

  getFuncionalidad(){
    this.usuario.getFuncionalidadNombre()
    .subscribe((res:any)=>{
      
      if(res.estado)
      {
       this.listFuncionalidad=[];
      this.listFuncionalidad=res.datos;

      }
      
      
    })
    
  }



}
