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
  listareglamento:Interfaz_contenido[]=[];


  //cedula
  cedula:string="";

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
      if(item.interfaz.nombre=="Beneficios-Reglamento"){
    if(item.nombre=="Beneficios")
    {
      if(item.estado=="A"){
        this.listabeneficios.push(item)
      }
    }
    if(item.nombre=="Reglamento")
    {
      
      if(item.estado=="A"){
        this.listareglamento.push(item)
      
      }
    }
    
  }
    });
  }

  //buscar la cedula
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
            title:'Se debe ingresar un N° cedula ',
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
            title:'Ingresar los numeros correctos del N° cedula ',
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
}
