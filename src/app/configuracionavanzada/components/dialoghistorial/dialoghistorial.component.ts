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

  listaHistorial!: any;

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
  //console.log(this.data.objeto);
  this.usuario.getDatosHistorialxid(this.data.objeto)
  //this.usuario.getHistorial()
  .subscribe((res:any)=>{
    this.loading=false;
    console.log(res);
    
    if(res.estado==true){
      this.listaHistorial={};
      this.listaHistorial=res.datos;
      this.listaHistorial.dato_viejo=JSON.parse(this.listaHistorial.dato_viejo);
      this.listaHistorial.dato_nuevo=JSON.parse(this.listaHistorial.dato_nuevo);

      
      // this.listaHistorial.forEach((item:any)=>{
      //  item.dato_viejo=JSON.parse(item.dato_viejo);
      // } );
      console.log(this.listaHistorial);
       
    }
  } )

}



}
