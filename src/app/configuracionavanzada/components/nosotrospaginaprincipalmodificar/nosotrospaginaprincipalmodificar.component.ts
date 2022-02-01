import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-nosotrospaginaprincipalmodificar',
  templateUrl: './nosotrospaginaprincipalmodificar.component.html',
  styleUrls: ['./nosotrospaginaprincipalmodificar.component.css']
})
export class NosotrospaginaprincipalmodificarComponent implements OnInit {
  loading=true;
  
  //listaInterfaz
  listainterfaz:Interfaz_contenido[]=[];
  listainterfazaux:Interfaz_contenido[]=[];

  

  //id
  id=0;

   //usuario
   cedula:string;
   usuario_id:string="";

   // 
   myform:FormGroup;

   //guardar
   botonguardar=false;
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _login:GeneralLoginService) { 
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
    this.myform=ingresar.group({
      id_usuario:0,
      id_objetivo:0,
      objetivo:[''],
      id_mision:0,
      mision:[''],
      id_vision:0,
      vision:[''],
      id_masInformacion:0,
      masInformacion:[''],
      pdfmasinformacion:[''],
      id_objetivo_inicio:0,
      id_mision_inicio:0,
      id_vision_inicio:0,

      
     });
  }

  ngOnInit(): void {
    this.getusuario()
    this.getPaginas()
    this.getPaginasInicio()
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
    this._general.getTipoPagina("Nosotros")
    .subscribe((res:any) => {
    this.listainterfaz=[];
    this.listainterfaz=res;
   // console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
     this.loading=false;
     this.separarcarosel(this.listainterfaz);
    });
  }
  separarcarosel(original:Interfaz_contenido[])
  {

    original.forEach((item:Interfaz_contenido)=>{

      if(item.nombre=="Objetivo General")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_objetivo:item.id,
            objetivo:item.descripcion.substring(65),
          })
          
        } 
      }

      if(item.nombre=="Mision")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_mision:item.id,
            mision:item.descripcion.substring(65),
          })
         
        } 
      }
      if(item.nombre=="Vision")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_vision:item.id,
            vision:item.descripcion.substring(65),
          })
          
        } 
      }
      if(item.nombre=="Mas Informacion")
      {
        if(item.estado=="A")
        {
          this.myform.patchValue({
            id_masInformacion:item.id,
            masInformacion:item.descripcion,
            pdfmasinformacion:item.PDF,
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

  getPaginasInicio(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listainterfazaux=res;
      this.loading=false;
      this.separarlista(this.listainterfazaux);
    })
  }
  separarlista(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Quienes-Somos"){
         if(item.nombre=="Mision")
         {
           if(item.estado=="A"){
            this.myform.patchValue({
              id_mision_inicio:item.id,
            })
           }
          
         }

         if(item.nombre=="Objetivo General")
         {
          if(item.estado=="A"){ 
            this.myform.patchValue({
              id_objetivo_inicio:item.id,
            })
            
          }
         }
         if(item.nombre=="Vision")
         {
          if(item.estado=="A"){ 
            this.myform.patchValue({
              id_vision_inicio:item.id,
            })
            
          }
         }

      }
    });
    
    //  console.log(this.listaobjetivoaux);
    // console.log(this.listamisionaux[0].descripcion.length);
    // console.log(this.listavisionaux[0].descripcion.substring(0,65));



   
    



    
  }

  //mas informacion
  PDF(){
    let url1 = this.myform.get('pdfmasinformacion')?.value as string;
    let urlToOpen:string=url1;
   let url: string = '';
   if (!/^http[s]?:\/\//.test(urlToOpen)) {
     url += 'http://';
   }

   url += urlToOpen;
   window.open(url, '_blank');
  }

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
        this.getPaginasInicio(); 
       }
    });

  } 
}
