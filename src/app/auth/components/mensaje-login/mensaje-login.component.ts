import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mensaje-login',
  templateUrl: './mensaje-login.component.html',
  styleUrls: ['./mensaje-login.component.css']
})
export class MensajeLoginComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
