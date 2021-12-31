import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mensajeconfiguracion',
  templateUrl: './mensajeconfiguracion.component.html',
  styleUrls: ['./mensajeconfiguracion.component.css']
})
export class MensajeconfiguracionComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
