import { Injectable } from '@angular/core';
import { BaseUrlService } from '../base/base-url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
    ) { }


    //Obtener todas las imagenes de la tabla imagenes_solicitudes
    getimagenesconvenios():Observable<any>{
      let url:string=this._base.getUrlLocalApi()+'imagen-convenios';
      return this.http.get<any>(url);
    }
    
    //Obtener los datos de la tabla imagen_solicitudes
    getimagensolicitudes():Observable<any>{
      let url:string=this._base.getUrlLocalApi()+'imagen-solicitudes';
      return this.http.get<any>(url);
    }

    //Actualizar la imagen 
    updatelogo(data:any)
    {
      let url:string = this._base.getUrlLocalApi() + 'update/imagen-solicitudes';
      return this.http.post(url,data);
    }
  
    //Eliminar la imagen
    deletelogo(data:any){
      let url:string = this._base.getUrlLocalApi() + 'delete/imagen-solicitudes';
      return this.http.put(url,data);
    }
  
   //Mandar a la base de datos
    addimageneslogo(data:any)
    {
      let url:string = this._base.getUrlLocalApi() + 'imagen-solicitudes/subir';
      return this.http.post(url,data);
    }

}
