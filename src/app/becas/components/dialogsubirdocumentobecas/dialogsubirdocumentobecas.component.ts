import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-dialogsubirdocumentobecas',
  templateUrl: './dialogsubirdocumentobecas.component.html',
  styleUrls: ['./dialogsubirdocumentobecas.component.css']
})
export class DialogsubirdocumentobecasComponent implements OnInit {

  nombre_archivo="";

  constructor(public dialoRef:MatDialogRef<DialogsubirdocumentobecasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialoRef.close();
  }

  fileEvent(event:any){
    this.nombre_archivo="";
    const archivoCapturado=event.target.files[0];
    
    if(archivoCapturado.type=="application/pdf")
    {
      this.nombre_archivo=archivoCapturado.name;
      this.data.objeto=archivoCapturado;
      this.data.subir=true;
    }else{
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        title:'Error.. Solo se puede subir archivos PDF',
        icon:'warning'
      });
      return;

    }


  }


}
