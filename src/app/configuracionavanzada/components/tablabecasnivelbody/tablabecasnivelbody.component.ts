import { DialogingresarbecasbodyComponent } from './../dialogingresarbecasbody/dialogingresarbecasbody.component';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BecasNivelBody } from 'src/app/models/becasnivelbody';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-tablabecasnivelbody',
  templateUrl: './tablabecasnivelbody.component.html',
  styleUrls: ['./tablabecasnivelbody.component.css']
})
export class TablabecasnivelbodyComponent implements OnInit {
  //id_becas
  id_becas="";
  tipo="";

  // usuario
  cedula:string;

  loading=true;

  //listas
  listabecasbody:any[]=[];
  lista:any[]=[];

  //datos para dialog becas
  data={
    nombre:'',
    pais:'',
    idioma:'',
    area_estudio:'',
    fecha_postulacion:'',
    url:'',
    modalidad:'',
    requisitos:'',
    reconomiento:'',
    pdf:'',
    tipo:'',
    id_becas_nivels:"",
  };
  editadata={
    id:"",
    nombre:'',
    pais:'',
    idioma:'',
    area_estudio:'',
    fecha_postulacion:'',
    url:'',
    modalidad:'',
    requisitos:'',
    reconomiento:'',
    pdf:'',
    tipo:''
  }

  // boleano
  verificar=false;

  //botones
  botoneditar=false;
  botoneliminar=false;
  botonagregar=false;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public pageSize: number = 10;
  public pageNumber: number = 1;

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

  constructor(private rutaActiva: ActivatedRoute,private router:Router,private _becas:BecasnivelService,public dialog: MatDialog, public snackBar:MatSnackBar) { 
    this.id_becas=rutaActiva.snapshot.params.id;
    this.tipo=rutaActiva.snapshot.params.tipo;
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
        this.loading=false;
        this.listabecasbody=[];
        this.listabecasbody=res.becas;
        this.listabecasbody.forEach((item:any)=>{
          var etiqueta1="";
          etiqueta1=item.nombre.replace("<p>"," ");
           var etiqueta2=etiqueta1.replace("</p>","");
           var etiqueta3=etiqueta2.replace("<i>","");
           var etiqueta4=etiqueta3.replace("</i>","");
           var etiqueta5=etiqueta4.replace("<strong>","");
           var etiqueta6=etiqueta5.replace("</strong>","");
           var etiqueta7=etiqueta6.replace("&nbsp;"," ");
           item.nombre=etiqueta7;
           
           //pais
           var etiqueta1="";
           etiqueta1=item.pais.replace("<p>","");
           var etiqueta2=etiqueta1.replace("</p>","");
           var etiqueta3=etiqueta2.replace("<i>","");
           var etiqueta4=etiqueta3.replace("</i>","");
           var etiqueta5=etiqueta4.replace("<strong>","");
           var etiqueta6=etiqueta5.replace("</strong>","");
           var etiqueta7=etiqueta6.replace("&nbsp;"," ");
           item.pais=etiqueta7;
           
           //idioma
           var etiqueta1="";
           etiqueta1=item.idioma.replace("<p>","");
           var etiqueta2=etiqueta1.replace("</p>","");
           var etiqueta3=etiqueta2.replace("<i>","");
           var etiqueta4=etiqueta3.replace("</i>","");
           var etiqueta5=etiqueta4.replace("<strong>","");
           var etiqueta6=etiqueta5.replace("</strong>","");
           var etiqueta7=etiqueta6.replace("&nbsp;"," ");
           item.idioma=etiqueta7;

        });
        this.listabecasbody.map((element, index) => (element.position = index + 1));        
      }
    })
  }

  DialogBecas()
  {
    if(this.verificar==false)
    {
      this.data={ 
        nombre:"",
        pais:"",
        idioma:"",
        area_estudio:"",
        fecha_postulacion:"",
        url:"",
        modalidad:"",
        requisitos:"",
        reconomiento:"",
        pdf:"",
        tipo:this.tipo,
        id_becas_nivels:this.id_becas,
      }
    }
    
    const dialogRef=this.dialog.open(DialogingresarbecasbodyComponent,{
      width:'700px',
      data:{titulo:'Agregar Becas',objeto:this.data}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
          this.data=result.objeto;
         // console.log(this.data);
          
          if(this.data.nombre.length==0 || this.data.pais.length==0 || this.data.idioma.length==0 || this.data.fecha_postulacion.length==0)
          {
            this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
              data:{
                titulo:'Error.....',
                mensaje:'Datos Faltantes......!!!',
               buttonText:'',
               icon:'warning'
              },
              duration:1000,
              horizontalPosition:'end',
              verticalPosition:'bottom',
              panelClass:'error'     
            });
            this.verificar=true;
            return;
          }
           if(result.objeto.reconomiento==undefined)
            {
              this.data.reconomiento="";
            }

         let json={
           data:{
            nombre:this.data.nombre,
            pais:this.data.pais,
            idioma:this.data.idioma,
            area_estudio:this.data.area_estudio,
            fecha_postulacion:this.data.fecha_postulacion,
            url:this.data.url,
            modalidad:this.data.modalidad,
            requisitos:this.data.requisitos,
            reconocimiento:this.data.reconomiento,
            pdf:this.data.pdf,
            id_becas_nivels:this.id_becas,
           }
         }   
          this._becas.addBecasNivelBody(json)
          .subscribe((res:any)=>{
            if(res.estado==true)
            {
              this.verificar=false;
              Swal.fire({
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                title:'Se ingreso correctamente la Beca',
                icon:'success'
              });
              this.loading=true;
              this.getBecasNivelBody();

            }
          })

      }
      else{
        this.verificar=false;
      }
     
      
    });



  }

  editar(id:string){
    this.editadata={
      id:id,
      nombre:'',
      pais:'',
      idioma:'',
      area_estudio:'',
      fecha_postulacion:'',
      url:'',
      modalidad:'',
      requisitos:'',
      reconomiento:'',
      pdf:'',
      tipo:this.tipo
    }
    this.botoneditar=true;
    this.botoneliminar=true;
    this.botonagregar=true;
    this._becas.getBecasNivelBodyId(this.id_becas)
    .subscribe((res:any)=>{
      if(res.estado==true)
      {
        this.lista=[];
        this.lista=res.becas;
        this.lista.forEach((item:any)=>{
          if(item.id==id)
          {
            this.editadata.nombre=item.nombre;
            this.editadata.pais=item.pais;
            this.editadata.idioma=item.idioma;
            this.editadata.area_estudio=item.area_estudio;
            this.editadata.fecha_postulacion=item.fecha_postulacion;
            this.editadata.url=item.url;
            this.editadata.modalidad=item.modalidad;
            this.editadata.requisitos=item.requisitos;
            this.editadata.reconomiento=item.reconocimiento_titulo;
            this.editadata.pdf=item.pdf;

            const dialogRef=this.dialog.open(DialogingresarbecasbodyComponent,{
              width:'700px',
              data:{titulo:'Modificar Becas',objeto:this.editadata}
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');

              if(result!=null)
              {
                
                  this.editadata=result.objeto;

                  console.log(this.editadata);
                  if(this.editadata.nombre.length==0 || this.editadata.pais.length==0 || this.editadata.idioma.length==0 || this.editadata.fecha_postulacion.length==0)
                  {
                    this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
                      data:{
                        titulo:'Error.....',
                        mensaje:'Datos Faltantes......!!!',
                       buttonText:'',
                       icon:'warning'
                      },
                      duration:1000,
                      horizontalPosition:'end',
                      verticalPosition:'bottom',
                      panelClass:'error'     
                    });
                    this.botoneditar=false;
                    this.botoneliminar=false;
                    this.botonagregar=false;
                    return;
                  }

                  if(result.objeto.reconomiento==undefined)
                  {
                    this.editadata.reconomiento="";
                  }
                 let json={
                   data:{
                     id:this.editadata.id,
                    nombre:this.editadata.nombre,
                    pais:this.editadata.pais,
                    idioma:this.editadata.idioma,
                    area_estudio:this.editadata.area_estudio,
                    fecha_postulacion:this.editadata.fecha_postulacion,
                    url:this.editadata.url,
                    modalidad:this.editadata.modalidad,
                    requisitos:this.editadata.requisitos,
                    reconocimiento:this.editadata.reconomiento,
                    pdf:this.editadata.pdf,
                    id_becas_nivels:this.id_becas,
                   }
                 }
                
                 this._becas.updateBecasNivelBody(json)
                 .subscribe((res:any)=>{
                    if(res.estado==true)
                    {
                      Swal.fire({
                              showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                              },
                              hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                              },
                              title:'Se actualizo correctamente.......!!!',
                              icon:'success'
                      });
                      this.loading=true;
                      this.getBecasNivelBody()
                    }
                    this.botoneditar=false;
                    this.botoneliminar=false;
                    this.botonagregar=false;
                 });
              }
              this.botoneditar=false;
              this.botoneliminar=false;
              this.botonagregar=false;
            });



          }

        });



      }
      this.botoneditar=false;
      this.botoneliminar=false;
      this.botonagregar=false;
    })


  }

}
