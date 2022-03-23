import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialogcedula',
  templateUrl: './dialogcedula.component.html',
  styleUrls: ['./dialogcedula.component.css']
})
export class DialogcedulaComponent implements OnInit {
  constructor(
    public dialoRef:MatDialogRef<DialogcedulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialoRef.close();
  }

}
