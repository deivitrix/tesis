import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensajeconvenios',
  templateUrl: './mensajeconvenios.component.html',
  styleUrls: ['./mensajeconvenios.component.css']
})
export class MensajeconveniosComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
