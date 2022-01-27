import { Component, OnInit } from '@angular/core';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

@Component({
  selector: 'app-nosotrospaginaprincipalmodificar',
  templateUrl: './nosotrospaginaprincipalmodificar.component.html',
  styleUrls: ['./nosotrospaginaprincipalmodificar.component.css']
})
export class NosotrospaginaprincipalmodificarComponent implements OnInit {
  loading=true;
  
  //listaInterfaz
  objetivo:Interfaz_contenido[]=[];
  mision:Interfaz_contenido[]=[];
  vision:Interfaz_contenido[]=[];
  masInformacion:Interfaz_contenido[]=[];
  listainterfaz:Interfaz_contenido[]=[];

  //id
  id=0;

   //usuario
   cedula:string;
   usuario_id:string="";

  constructor(private _general:GeneralService,private _login:GeneralLoginService) { 
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
  }

  ngOnInit(): void {
    this.getusuario()
    this.getPaginas()
  }
  getusuario(){
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
      //this.loading=false;
      // console.log(res);
      this.usuario_id=res.usuario.id;   
    });
  }
  getPaginas(){
    this._general.getTipoPagina("Nosotros")
    .subscribe((res:any) => {
    this.objetivo=[];
    this.mision=[];
    this.vision=[];
    this.masInformacion=[];
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
      if(item.interfaz.nombre=="Objetivo General")
      {
        if(item.estado=="A")
        {
          this.objetivo.push(item);
        } 
      }

      if(item.interfaz.nombre=="Mision")
      {
        if(item.estado=="A")
        {
          this.mision.push(item);
        } 
      }
      if(item.interfaz.nombre=="Vision")
      {
        if(item.estado=="A")
        {
          this.vision.push(item);
        } 
      }
      if(item.interfaz.nombre=="Mas Informacion")
      {
        if(item.estado=="A")
        {
          this.masInformacion.push(item);
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

}
