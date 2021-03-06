import { DialogingresarbecasComponent } from './../dialogingresarbecas/dialogingresarbecas.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { BecasNivel } from 'src/app/models/becasnivel';
import { BecasnivelService } from 'src/app/services/becasnivel.service';
import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';

import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-ingresarbecas',
  templateUrl: './ingresarbecas.component.html',
  styleUrls: ['./ingresarbecas.component.css']
})
export class IngresarbecasComponent implements OnInit {
  tipo="";
  
  //listado
  listabecasnivel:BecasNivel[]=[];
  listabecasnivelaux:BecasNivel[]=[];
  listatipo:any[]=[];
  loading=true;

  titulo="";

  // usuario
  usuario_id:string;

  //ingresar categoria
  data:any={nombre:'',tipo:''}


  // editar categoria
  editardata:any={nombre:'',tipo:''}

  //myform
  myform:FormGroup;
  public filtro: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  applyFilter(event: any) {
    this.filtro = event.target.value;
  }

  public pageSize: number = 10;
  public pageNumber: number = 1;

  handlePagePending(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

  //boton categoria
  botoncategoria=false;

  //estado
  botonestado=false;

  constructor(private rutaActiva: ActivatedRoute,private router:Router,private _becasnivel:BecasnivelService,private usuario:UsuarioServicesService
    ,private ingresar:FormBuilder,public dialog: MatDialog) { 
    this.tipo=rutaActiva.snapshot.params.tipo;
    var id;
    id=localStorage.getItem("id_personal") as string;  
    this.usuario_id=id;

    this.myform=ingresar.group({
      id_usuario:['']
    })
  }

  ngOnInit(): void {
    this.getbecas()
    this.getusuario()
    this.encabezado()
  }

  encabezado(){
    if(this.tipo=='C')
    {
      this.titulo='Becas por Capacitaciones';
    }
    else if(this.tipo=='P'){
      this.titulo='Becas por Movilidad';
    }
    else if(this.tipo=='I'){
      this.titulo='Becas por Investigacion';
    }
    else if(this.tipo=='M'){
      this.titulo='Becas por Maestria';
    }
    else if(this.tipo=='D'){
      this.titulo='Becas por Doctorado';
    }

  }
  getusuario(){
    this.myform.patchValue({
      id_usuario:this.usuario_id
    });
  }

  getbecas(){
    this._becasnivel.getBecas()
    .subscribe((res:any)=>{
      this.listabecasnivel=[];
      this.listatipo=[];
      this.listabecasnivel=res;
      this.loading=false;
      this.separarListatipo(this.listabecasnivel);
    })

  }
  separarListatipo(original:BecasNivel[])
  {
     original.forEach((item:BecasNivel)=>{
       if(item.tipo==this.tipo)
       {
          this.listatipo.push(item);
       }
     })

     this.listatipo.map((element, index) => (element.position = index + 1));
  }

  //dialog 
  addBecasnivel(){
   this.data={nombre:'', tipo:'I'};
    const dialogRef=this.dialog.open(DialogingresarbecasComponent,{
      width:'500px',
      data:{titulo:'Agregar Categoria Becas',objeto:this.data}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null)
      {
        
        if(result.objeto.tipo=="I")
        {
          if(result.objeto.nombre.length!=0)
          {
            this.botoncategoria=true;
            this.botonestado=true;
        let json={data:{id_usuario:this.myform.get('id_usuario')?.value,nombre:result.objeto.nombre,tipo:this.tipo}}
        this._becasnivel.addcategoriabecas(json)
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
              title:res.mensaje,
              icon:'success'
            });
            this.loading=true;
            this.getbecas();
            this.botoncategoria=false;
            this.botonestado=false;
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
            this.botoncategoria=false;
            this.botonestado=false;

           }
        });
            

          }

        }
        
        
        
      }
     
      
    });
  }

  actualizar(event:any,id:number){
    this.botonestado=true;
    var estado=event.value;
   let json={data:{id:id,estado:estado}}
   this._becasnivel.updatecategoriabecasestado(json)
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
        title:res.mensaje,
        icon:'success'
      });
      this.botonestado=false;
      this.loading=true;
      this.getbecas();
    }
   });
    
    
  }
  //editar categoria
  editarcategoria(id:number){
    this.editardata={nombre:"",tipo:"M"};
    this._becasnivel.getBecas()
    .subscribe((res:any)=>{
     this.listabecasnivelaux=res;
     this.listabecasnivelaux.forEach((item:BecasNivel)=>{
       if(item.id==id)
       {
         this.editardata.nombre=item.nombre;
         this.editardata.tipo="M";
         const dialogRef=this.dialog.open(DialogingresarbecasComponent,{
          width:'500px',
          data:{titulo:'Modificar la categoria Becas',objeto:this.editardata}
        });
        dialogRef.afterClosed().subscribe(result=>{
          console.log('The dialog was closed');
          if(result!=null)
          {
            if(result.objeto.tipo=="M")
            {
              if(result.objeto.nombre.length!=0)
              {
                this.botoncategoria=true;
                this.botonestado=true;
                let json={data:{id:id,nombre:result.objeto.nombre}};
                this._becasnivel.updatecategoriabecasNombre(json)
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
                      title:res.mensaje,
                      icon:'success'
                    });
                    this.loading=true;
                    this.getbecas();
                    this.botoncategoria=false;
                    this.botonestado=false;
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
                    this.botoncategoria=false;
                    this.botonestado=false;

                  }
                });
              }
              else{
                Swal.fire({
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  title:"No se puede actulizar el nombre",
                  icon:'warning'
                });

              }

            }
            
          }
        })
       }
     })
    });
  }

  agregarBecasNivelBody(id:number,nombre:string)
  {
    this.router.navigate(['/utmricb/configuracionavanzada/becasnivelbody/'+id+'/'+this.tipo+'/'+nombre]);
  }

}
