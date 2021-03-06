import { DialogsolicitudmovilidadComponent } from './../dialogsolicitudmovilidad/dialogsolicitudmovilidad.component';
import { Router } from '@angular/router';
import { GeneralMovilidadService } from './../../../services/generalMovilidad/general-movilidad.service';
import { DialogcedulaComponent } from './../dialogcedula/dialogcedula.component';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { MatDialog } from '@angular/material/dialog';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-movilidad-informacion',
  templateUrl: './movilidad-informacion.component.html',
  styleUrls: ['./movilidad-informacion.component.css']
})
export class MovilidadInformacionComponent implements OnInit {
  pathmovilidad:string;
  loading=true;
  listainterfaz:Interfaz_contenido[]=[];
  listaobjetivo:Interfaz_contenido[]=[];
  listaprograma:Interfaz_contenido[]=[];
  listabeneficios:Interfaz_contenido[]=[];
  listainformacion:Interfaz_contenido[]=[];


  //cedula
  cedula:string="";

  //cedula consultar
  cedula_consultar:string="";

  constructor(private path:PathImagenesService, private _general:GeneralService,public dialog: MatDialog
    ,private movilidad:GeneralMovilidadService,private router:Router) { 
    this.pathmovilidad=path.pathimagenmovilidad;

  }

  ngOnInit(): void {
    this.getPaginas();
  }

  getPaginas(){
    this._general.getTipoPagina("Movilidad")
    .subscribe((res:any) => {
      this.listainterfaz=res;
      this.loading=false;
      this.separarObjetivo(this.listainterfaz);
      this.separarBeneficios(this.listainterfaz);
     
    })
  }

  separarObjetivo(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Objetivo-Programa"){
         if(item.nombre=="Objetivo General")
         {
           if(item.estado=="A"){
            this.listaobjetivo.push(item);
           }
         }
         if(item.nombre=="Programa de movilidad academica")
         {
          if(item.estado=="A"){ 
            this.listaprograma.push(item);
          }
         }
      }
    });
  }

  separarBeneficios(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Beneficios-Informacion"){
    if(item.nombre=="Beneficios")
    {
      if(item.estado=="A"){
        this.listabeneficios.push(item)
      }
    }
    if(item.nombre=="Mas Informacion")
    {
      
      if(item.estado=="A"){
        this.listainformacion.push(item)
      
      }
    }
    
  }
    });
  }

  //buscar la cedula solicitud 
  openDialog(){
    const dialogRef=this.dialog.open(DialogcedulaComponent,{
      width:'400px',
      data:{titulo:'Ingresar Cedula',objeto:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if(result!=null)
      {
        if(result.length==0)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Se debe ingresar un N?? cedula correcto!!!',
            icon:'warning'
          });
          return;

        }
        else if(result.length<10 || result.length>10)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Ingresar los numeros correctos del N?? cedula ',
            icon:'warning'
          });
          return;
        }
        this.cedula=result;

        this.movilidad.getMovilidadEstudiante(this.cedula)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {
             this.router.navigate(['/principal/formulario/'+this.cedula]);
          }
          else{
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title:res.mensaje,
              icon:'warning'
            });

          }
        })



        


      }
     
      
    });
  

  }

  dialogconsultar(){

    const dialogRef1=this.dialog.open(DialogcedulaComponent,{
      width:'400px',
      data:{titulo:'Ingresar Cedula a Consultar Solicitud',objeto:""}
    });

    dialogRef1.afterClosed().subscribe(result1=> {
      console.log('The dialog was closed');
      
      if(result1!=null)
      {
        if(result1.length==0)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Se debe ingresar un N?? cedula correcto!!!!',
            icon:'warning'
          });
          return;

        }
        else if(result1.length<10 || result1.length>10)
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Ingresar los numeros correctos del N?? cedula ',
            icon:'warning'
          });
          return;
        }
        this.cedula_consultar=result1;
        this.movilidad.getsolicitudmovilidad(this.cedula_consultar)
        .subscribe((res:any)=>{

          if(res.estado==true)
          { 
            const dialogRef1=this.dialog.open(DialogsolicitudmovilidadComponent,{
              width:'1700px',
              data:{titulo:'Consultar Solicitudes Movilidad',objeto:res.datos}
            });

          }
          else
          {
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              title:res.mensaje,
              icon:'warning'
            });


          }



        });

      }
     
      
    });
  

  }
}
