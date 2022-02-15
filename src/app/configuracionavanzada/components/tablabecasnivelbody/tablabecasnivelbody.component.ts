import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BecasNivelBody } from 'src/app/models/becasnivelbody';

@Component({
  selector: 'app-tablabecasnivelbody',
  templateUrl: './tablabecasnivelbody.component.html',
  styleUrls: ['./tablabecasnivelbody.component.css']
})
export class TablabecasnivelbodyComponent implements OnInit {
  //id_becas
  id_becas="";

  // usuario
  cedula:string;

  loading=true;

  //listas
  listabecasbody:BecasNivelBody[]=[];

  constructor(private rutaActiva: ActivatedRoute,private router:Router,private _becas:BecasnivelService) { 
    this.id_becas=rutaActiva.snapshot.params.id;
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
  }

  ngOnInit(): void {
    this.getBecasNivelBody()
  }

  getBecasNivelBody()
  {
    this._becas.getBecasNivelBodyId(this.id_becas)
    .subscribe((res:any)=>{
      if(res.estado==true)
      {
        console.log(res.becas);
        this.listabecasbody=res.becas;


        

      }
    })


  }

}
