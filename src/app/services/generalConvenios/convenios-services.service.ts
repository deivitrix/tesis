import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ConveniosServicesService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }

  getconveniosEspecificos():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'convenio-especifico/get';
    return this.http.get<any>(url);
  }

  addconveniosEspecificos(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio-especifico/crear';
    return this.http.post(url,data);
  }

  getclausulas():Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'clausulas-new';
    return this.http.get<any>(url);
  }

  addclausulas(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'clausulas-new';
    return this.http.post(url,data);
  }

  getconveniostipo(tipo:string):Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'convenio-new/'+tipo;
    return this.http.get<any>(url);
  }


  getfirmaEmisor():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'firma-emisor-new';
    return this.http.get<any>(url);
  }

  addfirmaEmisor(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'firma-emisor-new';
    return this.http.post(url,data);

  }

  addfirmaReceptor(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'firma-receptor-new';
    return this.http.post(url,data);
  }

  getfirmaReceptor():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'firma-receptor-new';
    return this.http.get<any>(url);
  }

  getnombretipoconvenios():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'nombre-tipo-convenio';
    return this.http.get<any>(url);
  }

  GuardarVistaPDFconvenios(data:any)
  {
    let url:string=this._base.getUrlLocalApi()+'pdf/convenio';
    return this.http.post(url,data);
  }

  VistaPDFconvenios(nombre:string){
    let url:string=this._base.getUrlLocalApi()+'archivo/convenios/'+nombre;
    return url;
  }

  getfirmaconvenio():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'firma-new';
    return this.http.get<any>(url);
  }

  addfirmaconvenios(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'firma-new';
    return this.http.post(url,data);
  }

  // agregar convenios plantilla
  addconveniosplantilla(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio-new';
    return this.http.post(url,data);
  }
  

  // search convenio
  searchconvenio(id:string):Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio-new/get/'+id;
    return this.http.get<any>(url);
  }

  //guardar convenios guardados
  addconveniosguardado(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio-new-guardado';
    return this.http.post(url,data);
  }

  //search convenio de la tabla convenio
  serachconveniotabla(id:string):Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio/get/'+id;
    return this.http.get<any>(url);
  }

  //eliminar archivos del servidor
  eliminarpdf():Observable<any>{
    let url:string=this._base.getUrlLocalApi()+'eliminar-archivo';
    return this.http.get<any>(url);
  }

  //eliminar convenios
  eliminarconvenio(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio/eliminar';
    return this.http.put(url,data);
  }

  //ftp modificar
  ftparchivoPDF(file:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'documento/upload-document';
    return this.http.post(url,file); 
  }

  //modificar el convenio aprobados
  modificarconveniosaprobados(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio/update/aprobado';
    return this.http.put(url,data);
  }

  //modificar convenios Guardados a Aprobados
  modificarconveniosguardados(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'convenio/update/pdf';
    return this.http.put(url,data);

  }

  // obtener imagenes convenio
  getimagenesconvenios():Observable<any>{
    let url:string=this._base.getUrlLocalApi()+'imagen-convenio';
    return this.http.get<any>(url);
  }

  //subir ftp imagen convenio
  subirImagenConveniosftp(data:any){
    let url:string = this._base.getUrlLocalApi() + 'imagen-carrusel';
    return this.http.post(url,data);
  }

  //agregar una imagen
  addimagenconvenio(data:any)
  {
    let url:string=this._base.getUrlLocalApi()+'imagen-convenio/subir';
    return this.http.post(url,data); 
  }

  // modificar convenio
  updateconvenio(data:any){
    //convenio/all/update
    let url:string=this._base.getUrlLocalApi()+'convenio/all/update';
    return this.http.put(url,data); 

  }
  
}
