import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';

@Component({
  selector: 'app-conveniospaginaprincipalmodificar',
  templateUrl: './conveniospaginaprincipalmodificar.component.html',
  styleUrls: ['./conveniospaginaprincipalmodificar.component.css']
})
export class ConveniospaginaprincipalmodificarComponent implements OnInit {
 loading=true;
 //id
 id=0;

 //usuario
 usuario_id:string="";

  //listaInterfaz
listainterfaz:Interfaz_contenido[]=[];
listainterfazaux:Interfaz_contenido[]=[];

 // 
 myform:FormGroup;

 //guardar
 botonguardar=false;

 //cancelar
 botoneliminar=false;
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _login:GeneralLoginService,public snackBar:MatSnackBar) {   
    var id;
    id=localStorage.getItem("id_personal") as string;  
    this.usuario_id=id;
    this.myform=this.ingresar.group({
      id_usuario:0,
      id_marco:0,
      marco:['',Validators.required],
      id_marcoInt:0,
      marcoInt:['',Validators.required],
      id_especifico:0,
      especifico:['',Validators.required],
      id_reglamento:0,
      reglamento:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getPaginas()

  }


   getPaginas(){
    this._general.getTipoPagina("Convenios")
    .subscribe((res:any) => {
    this.listainterfaz=[];
    this.listainterfaz=res;
    //console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
     this.separarcarosel(this.listainterfaz);
    });
  }
  separarcarosel(original:Interfaz_contenido[])
  {

    original.forEach((item:Interfaz_contenido)=>{

      if(item.nombre=="Etiqueta Especificos")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_especifico:item.id,
             especifico:item.descripcion,
          })
        } 
      }

      if(item.nombre=="Etiqueta Marco")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_marco:item.id,
            marco:item.descripcion,
          })
         
        } 
      }
      if(item.nombre=="Etiqueta Marco Internacional")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_marcoInt:item.id,
             marcoInt:item.descripcion,
          })
          
        } 
      }
      if(item.nombre=="Etiqueta Reglamento")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_reglamento:item.id,
            reglamento:item.descripcion
          })
          
        } 
      }
    });
    this.loading=false;
    
    

    // if(this.listacarrosel.length==0)
    // {
    //   this.verificar=false;

    // }
    // else
    // {
    //   this.listacarrosel.forEach((item:Interfaz_contenido)=>{
    //       const imagen_publi=this.ingresar.group({
    //       id:item.id,
    //       id_interfaz:item.interfaz.id,
    //       usuario_id:this.usuario_id,
    //        nombre:[item.nombre,Validators.required],
    //        descripcion:[item.descripcion,Validators.required],
    //        urlimagen:item.urlimagen,
    //        file:new File([""],""),
    //        verificar:false
    //       });
    //       this.imagen.push(imagen_publi);
    //   });
    // }

  }

  //boton

  guardar(){
    if(this.myform.get('marco')?.value.length==0 || this.myform.get('marcoInt')?.value.length==0 || this.myform.get('especifico')?.value.length==0 || this.myform.get('reglamento')?.value.length==0)
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
    return;
   }
   Swal.fire({
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    title: 'Esta seguro que desea Guardar...??',
    icon: 'warning',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    denyButtonText: `No guardar`,
   
  }).then((result)=>{

    if(result.isConfirmed)
    {
      this.botonguardar=true;
      this.botoneliminar=true;
      let json={data:this.myform.value}
      this._general.updatePaginaConvenio(json)
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
          this.botonguardar=false;
          this.botoneliminar=false;
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
            icon:'success'
          });
          this.botonguardar=false;
          this.botoneliminar=false;
        }
      });
    }

  });

  }
  cancelar(){
    Swal.fire({
      title:'Cancelacion de Ingreso Plantilla',
      text:'Desea cancelar el proceso de la pagina',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cancelar'
    }).then((result)=>{
      if (result.value) {
        Swal.fire({
          title:'La operacion queda cancelada',
          text:'',
          icon:'warning',
        });
        this.getPaginas();
       }
    });


  }
}
