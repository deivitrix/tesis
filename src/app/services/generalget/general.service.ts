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
    let url:string = this._base.getUrlLocalApi() + 'interfaz/contenido/'+pagina;
    return this.http.get<Interfaz_contenido[]>(url);
  }

  subirImagenCarroselftp(data:any){
    let url:string = this._base.getUrlLocalApi() + 'imagen-carrusel';
    return this.http.post(url,data);
  }

  getimagenesinterfaz():Observable<any>{
    let url:string=this._base.getUrlLocalApi()+'imagen-interfaces';
    return this.http.get<any>(url);
  }

  updateCarrosel(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'update/carrosel';
    return this.http.post(url,data);
  }

  deleteCarrosel(data:any){
    let url:string = this._base.getUrlLocalApi() + 'delete/carrosel';
    return this.http.put(url,data);
  }

 // mandar a la base de datos
  addimagenesinterfaz(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'imagen-interfaces/subir';
    return this.http.post(url,data);
  }

  //modificar la pagina Nosotros
  updatePaginaNosotros(data:any){
    let url:string = this._base.getUrlLocalApi() + 'pagina-nosotros/update';
    return this.http.put(url,data);
  }

  //subir archivo mas informacion
  masInformaciondocumento(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/mas-informacion';
    return this.http.post(url,data);
  }

  //modoficar la pagina Convenios
  updatePaginaConvenio(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'pagina-convenios/update';
    return this.http.put(url,data);
  }

  //subir archivo reglamento movilidad
  reglamentodocumento(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/reglamento';
    return this.http.post(url,data);
  }

  //modificar la pagina Movilidad
  updatePaginaMovilidad(data:any){
    let url:string = this._base.getUrlLocalApi() + 'pagina-movilidad/update';
    return this.http.put(url,data);
  }

  


}
