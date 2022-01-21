import { ConveniosServicesService } from './../../../services/generalConvenios/convenios-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-convenio-pdf',
  templateUrl: './mostrar-convenio-pdf.component.html',
  styleUrls: ['./mostrar-convenio-pdf.component.css']
})
export class MostrarConvenioPDFComponent implements OnInit {
   // id del convenio traigo por el url
   id="";

   // tipo de convenio
   tipocon="";


   // titulo
   titulo="";
   //loading
   loading=true;


   //datos convenios aprobados
   datosAprobados:any=[];


   //variable PDF
   pdfconvenio="";

   cambio="http://3.15.185.2/Contenido/ConveniosGuardados/AcuerdosGuardados/ACUERDO%20DE%20COLABORACI%C3%93N%20ENTRE%20LA%20UNIVERSIDAD%20DE%20KANSAS%20Y%20LA%20UTM.pdf";

  constructor(private rutaActiva: ActivatedRoute, private convenios:ConveniosServicesService) { 
    this.id=rutaActiva.snapshot.params.id as string;
    this.tipocon=rutaActiva.snapshot.params.tipocon as string;
  }

  ngOnInit(): void {
    this.tipoconvenio();
  }

  tipoconvenio()
  {
    if(this.tipocon=="A")
    {
      this.getconvenio();
      this.titulo="Mostrar Convenio Aprobado";
    }
    else if(this.tipocon=="G")
    {
      this.getdatosconvenio();
      this.titulo="Mostrar Convenio Guardado";
    }
    else if(this.tipocon=="P")
    {
      this.getdatosconvenio();
      this.titulo="Mostrar Convenio Plantilla";
    }
  }
  getconvenio(){
    this.convenios.serachconveniotabla(this.id)
    .subscribe((res:any)=>{
      this.datosAprobados=res;
      this.loading=false;
      this.pdfconvenio=this.datosAprobados.convenio.PDF;
      console.log(this.pdfconvenio);
    });

  }

  getdatosconvenio(){

  }

}