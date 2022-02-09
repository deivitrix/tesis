import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogingresarbecas',
  templateUrl: './dialogingresarbecas.component.html',
  styleUrls: ['./dialogingresarbecas.component.css']
})
export class DialogingresarbecasComponent implements OnInit {

  constructor(
    public dialoRef:MatDialogRef<DialogingresarbecasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialoRef.close();
  }
}
