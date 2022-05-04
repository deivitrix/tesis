import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';
import { GalleriaComponent } from '../galleria/galleria.component';

@Component({
  selector: 'app-generarreporteconvenio',
  templateUrl: './generarreporteconvenio.component.html',
  styleUrls: ['./generarreporteconvenio.component.css']
})
export class GenerarreporteconvenioComponent implements OnInit {
   
  
  constructor(
    public dialoRef:MatDialogRef<GenerarreporteconvenioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialoRef.close();
  }

}
