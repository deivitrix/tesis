import { DialogsolicitudbecasComponent } from './../dialogsolicitudbecas/dialogsolicitudbecas.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BecasNivel } from 'src/app/models/becasnivel';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { MatDialog } from '@angular/material/dialog';
import { DialogcedulaComponent } from '../dialogcedula/dialogcedula.component';

@Component({
  selector: 'app-becasnivel',
  templateUrl: './becasnivel.component.html',
  styleUrls: ['./becasnivel.component.css']
})
export class BecasnivelComponent implements OnInit {

  // @Input() lista:any[]=[];
  pathBiblioteca:string;
  pathCapacitaciones:string;
  pathPregrado:string;
  pathInvestigacion:string;
  pathMaestria:string;
  pathDoctorado:string;
  listabecanivel:BecasNivel[]=[];
  
  loading=true;

  //
  listabecasnivel:BecasNivel[]=[];

  listaC:BecasNivel[] = [];
  listaP:BecasNivel[] = [];
  listaI:BecasNivel[] = [];
  listaM:BecasNivel[] = [];
  listaD:BecasNivel[] = [];


   //auxiliares
   auxc=0;
   auxp=0;
   auxi=0;
   auxm=0;
   auxd=0;
  

   //contar
   auxdatos=0;


   //cedula
   cedula="";

   // consultar cedula para solicitud
   cedula_consultar:string="";
   
  constructor(private _pathimagenes:PathImagenesService,private _becasnivel:BecasnivelService, private router:Router
    ,public dialog: MatDialog) { 
    this.pathBiblioteca=this._pathimagenes.pathbiblioteca;
    this.pathCapacitaciones=this._pathimagenes.pathcapacitaciones;
    this.pathPregrado=this._pathimagenes.pathpregrado;
    this.pathInvestigacion=this._pathimagenes.pathinvestigacion;
    this.pathMaestria=this._pathimagenes.pathmaestria;
    this.pathDoctorado=this._pathimagenes.pathdoctorado;
    // console.log("lista"+this.lista);
  }

  ngOnInit(): void {
    this.getbecasnivel();
    
  }
  getbecasnivel(){
    this._becasnivel.getBecas()
   .subscribe((res:any) => {
    this.listabecasnivel = res;
    this.separarListas(this.listabecasnivel);
    this.loading=false;

   })
  }
  separarListas(original:BecasNivel[]){
    this.auxc=0;
    this.auxp=0;
    this.auxi=0;
    this.auxm=0;
    this.auxd=0;
    original.forEach((item:BecasNivel, indice) => {
      let opcion:string = item.tipo.toLowerCase();

      if(opcion =='c')
      {
        if(this.auxc<3){
          if(item.estado=="A"){
            this.listaC.push(item);
            this.auxc++;
          }
          
        }
      }
      else if(opcion=='p'){
        if(this.auxp<3)
        {
          if(item.estado=="A")
          {
            this.listaP.push(item);
            this.auxp++;
          }
          
        }
        
      }
      else if(opcion=='i'){
        if(this.auxi<3){
          if(item.estado=="A")
          {
           this.listaI.push(item);
           this.auxi++;

          }
          
        }
      }
      else if(opcion=='m'){
        if(this.auxm<3){
          if(item.estado=="A")
          {
            this.listaM.push(item);
            this.auxm++;

          }
         
        }
        
      }
      else if(opcion=='d'){
        if(this.auxd<3)
        {
          if(item.estado=="A")
          {
            this.listaD.push(item);
            this.auxd++;
          }
         
        }
       
      }
    });
   
   this.auxc=this.listaC.length;
   this.auxp=this.listaP.length;
   this.auxi=this.listaI.length;
   this.auxm=this.listaM.length;
   this.auxd=this.listaD.length;
 
  }
 
  
  opcion_seleccionado(opcion:string)
  {
    if(opcion=="Bibliotecavirtual")
    {
     this.router.navigate(['/principal/bibliotecavirtual']);

    }
    if(opcion=="Capacitaciones"){
      this.router.navigate(['/principal/capacitacion']);
    }
    if(opcion=="Pregrado")
    {  
      this.router.navigate(['/principal/pregrado']);
    }
    if(opcion=="Investigacion")
    {
      this.router.navigate(['/principal/investigacion']);
    }
    if(opcion=="Maestrias")
    {
      this.router.navigate(['/principal/maestria']);
    }
    if(opcion=="Doctorados")
    {
      this.router.navigate(['/principal/doctorado']);
    }
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

        this._becasnivel.getBecasDocente(this.cedula)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {
             this.router.navigate(['/principal/formulario-becas/'+this.cedula]);
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

  //buscar cedula para consultar solicitud
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
            title:'Se debe ingresar un N° cedula correcto!!!!',
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
            title:'Ingresar los numeros correctos del N° cedula ',
            icon:'warning'
          });
          return;
        }
        this.cedula_consultar=result1;

        this._becasnivel.getsolicitudbecas(this.cedula_consultar)
        .subscribe((res:any)=>{
          if(res.estado==true)
          {  
            const dialogRef1=this.dialog.open(DialogsolicitudbecasComponent,{
              width:'1700px',
              data:{titulo:'Consultar Solicitudes Becas',objeto:res.datos}
            });

          }else{
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
