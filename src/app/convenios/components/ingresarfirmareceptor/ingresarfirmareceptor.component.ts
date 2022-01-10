import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-ingresarfirmareceptor',
  templateUrl: './ingresarfirmareceptor.component.html',
  styleUrls: ['./ingresarfirmareceptor.component.css']
})
export class IngresarfirmareceptorComponent implements OnInit {
  pathavatarperfil="";
  constructor(
    public dialoRef:MatDialogRef<IngresarfirmareceptorComponent>,
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
