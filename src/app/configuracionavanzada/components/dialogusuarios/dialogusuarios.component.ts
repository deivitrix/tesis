import { UsuarioServicesService } from 'src/app/services/generalUsuario/usuario-services.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogusuarios',
  templateUrl: './dialogusuarios.component.html',
  styleUrls: ['./dialogusuarios.component.css']
})
export class DialogusuariosComponent implements OnInit {

  listcargos:any[]=[];

  constructor(
    public dialoRef:MatDialogRef<DialogusuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private usuario:UsuarioServicesService
  ) { }

  ngOnInit(): void {
    if(this.data.objeto.tipo=="G")
    {
      this.getcargos()
    }
    
  }

  onNoClick(){
    this.dialoRef.close();
  }

  getcargos()
  {
    this.usuario.getcargos()
    .subscribe((res:any)=>{
      this.listcargos=[];
      if(res.estado==true)
      {
        this.listcargos=res.datos;
      }
    })

  }


}
