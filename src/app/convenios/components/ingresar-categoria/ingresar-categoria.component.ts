import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-ingresar-categoria',
  templateUrl: './ingresar-categoria.component.html',
  styleUrls: ['./ingresar-categoria.component.css']
})
export class IngresarCategoriaComponent implements OnInit {
  categoria="";
  constructor(
    public dialoRef:MatDialogRef<IngresarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialoRef.close();
  }

}
