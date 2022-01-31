import { GeneralService } from 'src/app/services/generalget/general.service';
import { ImagenModel } from './../../../models/imagen';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-galeria-interfaz',
  templateUrl: './galeria-interfaz.component.html',
  styleUrls: ['./galeria-interfaz.component.css']
})
export class GaleriaInterfazComponent implements OnInit {

  // lista

  lista:ImagenModel[]=[];
  listaaux:ImagenModel[]=[];

  //loading
  loading=true;



  constructor(
    public dialoRef:MatDialogRef<GaleriaInterfazComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private convenios:ConveniosServicesService,
    private _general:GeneralService
  ) { }

  ngOnInit(): void {
    this.getimagenes()
  }
  onNoClick(){
    this.dialoRef.close();
  }

  getimagenes(){
    this._general.getimagenesinterfaz()
    .subscribe((res:any)=>{
      this.listaaux=res;
      this.loading=false;
      this.separarlista(this.listaaux);
    })
  }

  separarlista(original:ImagenModel[])
  {
    original.forEach((item:ImagenModel)=>{
      if(item.estado=="A")
      {
        this.lista.push(item);

      }
    })

  }

  agregar(url:string,id:number)
  {
    this.data.url.url_escoger=url;
    this.data.url.id=id;
    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title:'Imagen escogida con exito',
      icon:'success'
    });

    //this.dialoRef.close();
      // <button mat-button  color="primary" [mat-dialog-close]="data.clausula" cdkFocusInitial>Guardar</button>
  }

}
