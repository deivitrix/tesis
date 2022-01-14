import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NombreTipoConveniosModel } from 'src/app/models/convenios/nombretipoconvenios';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { ConveniosEspecificosModel } from 'src/app/models/convenios/conveniosEspecificos';

@Component({
  selector: 'app-ingresarconveniosbody2',
  templateUrl: './ingresarconveniosbody2.component.html',
  styleUrls: ['./ingresarconveniosbody2.component.css']
})
export class Ingresarconveniosbody2Component implements OnInit {
  id="";

  // selector 
  selector:FormGroup;

  //nombreconvenios
  nombretipoconvenios:NombreTipoConveniosModel[]=[];

  // convenios especificos
  convenioEspecificosAux:ConveniosEspecificosModel[]=[];
  convenioEspecificos:ConveniosEspecificosModel[]=[];

  constructor(private rutaActiva: ActivatedRoute, private ingresar:FormBuilder, private convenios:ConveniosServicesService) {
    this.id=rutaActiva.snapshot.params.id;
    this.selector=ingresar.group({
      convenio:['',Validators.required],
      especifico:['',Validators.required],

    });
   }

  ngOnInit(): void {
    this.getnombretipoconvenio();
  }


  /// selector

  getnombretipoconvenio(){
    this.convenios.getnombretipoconvenios()
    .subscribe((res:any)=>{
      this.nombretipoconvenios=res;

    });
  }

  cambioConvenio()
  {

  }
  agregarcategoria()
  {

  }

  

}
