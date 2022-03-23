import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialogborrarfiles',
  templateUrl: './dialogborrarfiles.component.html',
  styleUrls: ['./dialogborrarfiles.component.css']
})
export class DialogborrarfilesComponent implements OnInit {

  constructor(
    public dialoRef:MatDialogRef<DialogborrarfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialoRef.close();
  }
  ondelete(numero:number)
  {
    if(numero==1)
    {
      this.data.objeto.certificado="";
      this.data.objeto.borrar1=true;
      
    }
    else if(numero==2){
      this.data.objeto.copia="";
      this.data.objeto.borrar2=true;
    }
    else if(numero==3){
      this.data.objeto.solicitud="";
      this.data.objeto.borrar3=true;
    }
    else if(numero==4){
      this.data.objeto.cartas="";
      this.data.objeto.borrar4=true;
    }
    else if(numero==5){
      this.data.objeto.no_sancion="";
      this.data.objeto.borrar5=true;
    }
    else if(numero==6){
      this.data.objeto.fotos="";
      this.data.objeto.borrar6=true;
    }
    else if(numero==7){
      this.data.objeto.seguro="";
      this.data.objeto.borrar7=true;
    }
    else if(numero==8){
      this.data.objeto.examen="";
      this.data.objeto.borrar8=true;
    }
    else if(numero==9){
      this.data.objeto.dominio="";
      this.data.objeto.borrar9=true;
    }
    else if(numero==10){
      this.data.objeto.documento="";
      this.data.objeto.borrar10=true;

    }
    else if(numero==11){
      this.data.objeto.comprobante="";
      this.data.objeto.borrar11=true;
    }
  }
}
