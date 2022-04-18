import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogborrarfilesbecas',
  templateUrl: './dialogborrarfilesbecas.component.html',
  styleUrls: ['./dialogborrarfilesbecas.component.css']
})
export class DialogborrarfilesbecasComponent implements OnInit {

  constructor(
    public dialoRef:MatDialogRef<DialogborrarfilesbecasComponent>,
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
      this.data.objeto.carta_aceptacion="";
      this.data.objeto.borrar1=true;
      
    }
    else if(numero==2){
      this.data.objeto.titulo="";
      this.data.objeto.borrar2=true;
    }
    
  }
}
