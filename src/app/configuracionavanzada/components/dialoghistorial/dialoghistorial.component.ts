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
  //console.log(this.data.objeto);
  this.usuario.getDatosHistorialxid(this.data.objeto)
  //this.usuario.getHistorial()
  .subscribe((res:any)=>{
    this.loading=false;
    if(res.estado==true){
      this.listaHistorial=[];
      this.listaHistorial=res.datos;
      

      this.listaHistorial.forEach((item:any)=>{
        const etiquetas=['<p>','</p>','<i>','</i>','<strong>','</strong>','<br>']
        var etiqueta1="";
        etiqueta1=item.dato_nuevo.replace("<p>"," ");
         var etiqueta2=etiqueta1.replace("</p>"," ");
         var etiqueta3=etiqueta2.replace("<i>"," ");
         var etiqueta4=etiqueta3.replace("</i>"," ");
         var etiqueta5=etiqueta4.replace("<strong>"," ");
         var etiqueta6=etiqueta5.replace("</strong>"," ");
         var etiqueta7=etiqueta6.replace("&nbsp;"," ");
         var etiqueta8=etiqueta7.replace("["," ");
         var etiqueta9=etiqueta8.replace("]"," ");
         var etiqueta10=etiqueta9.replace("{"," ");
         var etiqueta11=etiqueta10.replace("}"," ");
         var etiqueta12=etiqueta11.replace("[{"," ");
         var etiqueta13=etiqueta12.replace("}]"," ");
         var etiqueta14=etiqueta13.replace("}"," ");
         var etiqueta15=etiqueta14.replace(",","\n");
         item.dato_nuevo=etiqueta15;
      } ); 
    }
  } )

}

}
