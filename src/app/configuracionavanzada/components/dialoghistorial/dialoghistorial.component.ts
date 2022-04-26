import { Component, OnInit,Inject } from '@angular/core';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialoghistorial',
  templateUrl: './dialoghistorial.component.html',
  styleUrls: ['./dialoghistorial.component.css']
})
export class DialoghistorialComponent implements OnInit {

  //loading
  loading=true;
  
  loadingspinner=false;

  listaHistorial: any[] = [];

  // cedula del usuario
  //id:string;


  constructor(private usuario:UsuarioServicesService,public dialog: MatDialog,
    public dialoRef:MatDialogRef<DialoghistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
   
  }

  ngOnInit():void {
    this.getHistorial();

  }

  getHistorial(){
  console.log(this.data.objeto);
  this.usuario.getHistorialxid(this.data.objeto)
  //this.usuario.getHistorial()
  .subscribe((res:any)=>{
    this.loading=false;
    if(res.estado==true){
      this.listaHistorial=[];
      this.listaHistorial=res.datos;
    }
  } )

}

}
