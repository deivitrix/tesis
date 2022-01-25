import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';

@Component({
  selector: 'app-iniciopaginaprincipalmodificar',
  templateUrl: './iniciopaginaprincipalmodificar.component.html',
  styleUrls: ['./iniciopaginaprincipalmodificar.component.css']
})
export class IniciopaginaprincipalmodificarComponent implements OnInit {
  // formGroup
  myform:FormGroup;

  //listaInterfaz
  listacarrosel:Interfaz_contenido[]=[];
  listainterfaz:Interfaz_contenido[]=[];

  loading=true;
  verificar=true;

  //path imagen
  pathimagendefecto="";
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _pathimagenes:PathImagenesService) { 
    this.myform=ingresar.group({
      imagen:ingresar.array([]),
      eliminar:ingresar.array([])
    });
    this.pathimagendefecto=_pathimagenes.pathimagendefecto;
  }

  ngOnInit(): void {
    this.getPaginas()
  }
  getPaginas(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listainterfaz=res;
     //console.log(this.listainterfaz);
     
     this.loading=false;
     this.separarcarosel(this.listainterfaz);
    });
  }
  separarcarosel(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Carrusel")
      {
        if(item.estado=="A")
        {
          this.listacarrosel.push(item);
        } 
      }
    });
    console.log(this.listacarrosel);
    

    if(this.listacarrosel.length==0)
    {
      this.verificar=false;

    }
    else
    {
      this.listacarrosel.forEach((item:Interfaz_contenido)=>{
          const imagen_publi=this.ingresar.group({
           id:item.id,
           nombre:item.nombre,
           descripcion:item.descripcion,
           urlimagen:item.urlimagen,
           file:new File([""],""),
           verficar:false
          });
          this.imagen.push(imagen_publi);
      });

      console.log(this.myform.get('imagen')?.value[0]);
    }

  }
  //modelo
  get imagen(){
    return this.myform.get('imagen') as FormArray;
  }
  getImagen(index:number)
  {
    var url=this.imagen.controls[index].value.urlimagen;
    return url;

  }

  agregarCarrosel(){
    this.verificar=true;
    const imagen_iniciO=this.ingresar.group({
     id:0,
     nombre:['',Validators.required],
     descripcion:['',Validators.required],
     urlimagen:this.pathimagendefecto,
     file:new File([""],""),
     verficar:false
    });

    this.imagen.push(imagen_iniciO);
  }

  fileEvent(event:any,id:number)
  {



  }
  toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

}
