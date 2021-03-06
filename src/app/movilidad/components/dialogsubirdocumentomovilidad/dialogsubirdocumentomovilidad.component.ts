import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-dialogsubirdocumentomovilidad',
  templateUrl: './dialogsubirdocumentomovilidad.component.html',
  styleUrls: ['./dialogsubirdocumentomovilidad.component.css']
})
export class DialogsubirdocumentomovilidadComponent implements OnInit {

  nombre_archivo="";

  constructor(public dialoRef:MatDialogRef<DialogsubirdocumentomovilidadComponent>,
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
