import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-ingresarfirma',
  templateUrl: './ingresarfirma.component.html',
  styleUrls: ['./ingresarfirma.component.css']
})
export class IngresarfirmaComponent implements OnInit {

  pathavatarperfil="";
  constructor(
    public dialoRef:MatDialogRef<IngresarfirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _path:PathImagenesService
  ) {
    this.pathavatarperfil=this._path.pathavatarperfil;
   }

  ngOnInit(): void {
  }
  onNoClick(){
    this.dialoRef.close();
  }
}
