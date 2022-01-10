import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-ingresarfirmaemisor',
  templateUrl: './ingresarfirmaemisor.component.html',
  styleUrls: ['./ingresarfirmaemisor.component.css']
})
export class IngresarfirmaemisorComponent implements OnInit {
  pathavatarperfil="";
  constructor(
    public dialoRef:MatDialogRef<IngresarfirmaemisorComponent>,
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
