import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-ingresarclausula',
  templateUrl: './ingresarclausula.component.html',
  styleUrls: ['./ingresarclausula.component.css']
})
export class IngresarclausulaComponent implements OnInit {

  constructor(
    public dialoRef:MatDialogRef<IngresarclausulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }
  onNoClick(){
    this.dialoRef.close();
  }

}
