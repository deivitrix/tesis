import { ConveniosServicesService } from './../../../services/generalConvenios/convenios-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { TablaConvenioModel } from 'src/app/models/convenios/tabla_convenios'

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
   pdfconvenio:SafeResourceUrl;

   ///lista convenio
   listaCon:TablaConvenioModel[]=[];
   datoAprobado:TablaConvenioModel={PDF:"",id:0,estado:"",f_creaciondoc:"",femisor_id:0,freceptor_id:0,tipo_documento:"",usuario_id:0,titulo_convenio:""};

   cambio_u="http://3.15.185.2/Contenido/ConveniosGuardados/AcuerdosGuardados/ACUERDO%20DE%20COLABORACI%C3%93N%20ENTRE%20LA%20UNIVERSIDAD%20DE%20KANSAS%20Y%20LA%20UTM.pdf";

  constructor(private rutaActiva: ActivatedRoute, private convenios:ConveniosServicesService, private url: DomSanitizer) { 
    this.id=rutaActiva.snapshot.params.id as string;
    this.tipocon=rutaActiva.snapshot.params.tipocon as string;
    this.pdfconvenio=this.url.bypassSecurityTrustResourceUrl("");
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
      this.datoAprobado=res.convenio;
      this.loading=false;
      this.listaCon=[];
      this.listaCon.push(this.datoAprobado);

      //this.pdfconvenio=this.url.bypassSecurityTrustResourceUrl(this.datosAprobados.convenio.PDF);
    });

  }

  getdatosconvenio(){

  }

}
