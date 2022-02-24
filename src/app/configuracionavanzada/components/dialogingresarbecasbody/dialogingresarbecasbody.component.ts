import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//editor de texto 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { BecasnivelService } from 'src/app/services/becasnivel.service';

@Component({
  selector: 'app-dialogingresarbecasbody',
  templateUrl: './dialogingresarbecasbody.component.html',
  styleUrls: ['./dialogingresarbecasbody.component.css']
})
export class DialogingresarbecasbodyComponent implements OnInit {
  public Editor = ClassicEditor;
  botonsubir=false;
  botoncancelar=false;
  botonguardar=false;

  //
  nombre="";

  archivo:File=new File([""],"");

  constructor(
    public dialoRef:MatDialogRef<DialogingresarbecasbodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private becas:BecasnivelService
  ) { 

  }

  ngOnInit(): void {
    this.separarPDF()
  }

  onNoClick(){
    this.dialoRef.close();
  }

  separarPDF(){
    if(this.data.objeto.pdf==null)
    {
      this.nombre="";

    }
    else if(this.data.objeto.pdf.length==0)
    {
      this.nombre="";
      
    }
    else{
      var separar=this.data.objeto.pdf.split('/');
      this.nombre=separar[separar.length-1];
    }
    
    
  }

  fileEvent(event:any){
    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: 'Esta seguro que desea Subir el archivo...??',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
     
    }).then(result=>{
      if(result.isConfirmed)
      {
        this.botonsubir=true;
        this.botoncancelar=true;
        this.botonguardar=true;
        const archivoCapturado=event.target.files[0];
        this.archivo=archivoCapturado;
        if(this.archivo.type=="application/pdf"){
          const formData = new FormData();
          formData.append('document', this.archivo);
          if(this.data.objeto.tipo=="C")
          { 
            this.becas.documentoftpCapacitaciones(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                this.data.objeto.pdf=res.documento;
                var separar=res.documento.split('/');
                this.nombre=separar[separar.length-1];
                
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
              }
              this.botonsubir=false;
              this.botoncancelar=false;
              this.botonguardar=false;
            })

          }
          else if(this.data.objeto.tipo=="P")
          { 
            this.becas.documentoftpPregrado(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                this.data.objeto.pdf=res.documento;
                var separar=res.documento.split('/');
                this.nombre=separar[separar.length-1];
                
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
              }
              this.botonsubir=false;
              this.botoncancelar=false;
              this.botonguardar=false;
            })           

          }
          else if(this.data.objeto.tipo=="I")
          { 
            this.becas.documentoftpInvestigacion(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                this.data.objeto.pdf=res.documento;
                var separar=res.documento.split('/');
                this.nombre=separar[separar.length-1];
                
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
              }
              this.botonsubir=false;
              this.botoncancelar=false;
              this.botonguardar=false;
            })           

          }
          else if(this.data.objeto.tipo=="M")
          { 
            this.becas.documentoftpMaestria(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                this.data.objeto.pdf=res.documento;
                var separar=res.documento.split('/');
                this.nombre=separar[separar.length-1];
                
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
              }
              this.botonsubir=false;
              this.botoncancelar=false;
              this.botonguardar=false;
            })           

          }
          else if(this.data.objeto.tipo=="D")
          { 
            this.becas.documentoftpDoctorado(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                this.data.objeto.pdf=res.documento;
                var separar=res.documento.split('/');
                this.nombre=separar[separar.length-1];
                
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
              }
              this.botonsubir=false;
              this.botoncancelar=false;
              this.botonguardar=false;
            })           

          }

         }else{
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Error.. Solo se puede subir archivos PDF',
            icon:'warning'
          });
          this.botonsubir=false;
          this.botoncancelar=false;
          this.botonguardar=false;
          return;
         }


      }
    });

  }
}
