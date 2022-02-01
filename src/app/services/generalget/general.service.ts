import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }
  /// Interfaces Get
  getTipoPagina(pagina:string):Observable<any>{
    let url:string = this._base.getUrlApi() + 'interfaz/contenido/'+pagina;
    return this.http.get<Interfaz_contenido[]>(url);
  }

  subirImagenCarroselftp(data:any){
    let url:string = this._base.getUrlLocalApi() + 'imagen-carrusel';
    return this.http.post(url,data);
  }

  getimagenesinterfaz():Observable<any>{
    let url:string=this._base.getUrlApi()+'imagen-interfaces';
    return this.http.get<any>(url);
  }

  updateCarrosel(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'update/carrosel';
    return this.http.post(url,data);
  }

  deleteCarrosel(data:any){
    let url:string = this._base.getUrlApi() + 'delete/carrosel';
    return this.http.put(url,data);
  }

 // mandar a la base de datos
  addimagenesinterfaz(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'imagen-interfaces/subir';
    return this.http.post(url,data);
  }


}
