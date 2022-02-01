import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-conveniospaginaprincipalmodificar',
  templateUrl: './conveniospaginaprincipalmodificar.component.html',
  styleUrls: ['./conveniospaginaprincipalmodificar.component.css']
})
export class ConveniospaginaprincipalmodificarComponent implements OnInit {
 loading=false;
 //id
 id=0;

 //usuario
 cedula:string;
 usuario_id:string="";

  //listaInterfaz
listainterfaz:Interfaz_contenido[]=[];
listainterfazaux:Interfaz_contenido[]=[];

 // 
 myform:FormGroup;

 //guardar
 botonguardar=false;
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _login:GeneralLoginService) {   
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
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
    this.getusuario()
    this.getPaginas()

  }

  getusuario(){
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
      this.usuario_id=res.usuario.id;
      this.myform.patchValue({
       id_usuario:res.usuario.id
      });   
    });
  }

   getPaginas(){
    this._general.getTipoPagina("Convenios")
    .subscribe((res:any) => {
    this.listainterfaz=[];
    this.listainterfaz=res;
    //console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
     this.loading=false;
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
  cancelar(){
    Swal.fire({
      title:'Cancelacion de Ingreso Plantilla',
      text:'Desea salir de la pagina',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo salir'
    }).then((result)=>{
      if (result.value) {
        Swal.fire({
          title:'La operacion queda cancelada',
          text:'',
          icon:'success',
        });
        this.getPaginas();
       }
    });


  }
}
