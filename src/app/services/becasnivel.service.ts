import { BaseUrlService } from './base/base-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecasNivel } from '../models/becasnivel';

@Injectable({
  providedIn: 'root'
})
export class BecasnivelService {
  
 
 
  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
    ) { }
  
  getBecas():Observable<any>{
    let url:string = this._base.getUrlApi() + 'becas2'
    return this.http.get<any>(url);
  }


  //becas por nivel
  getBecasv2(tipo:string):Observable<any>{
    let url:string = this._base.getUrlApi() + 'beca-v2/'+tipo
    return this.http.get<any>(url);
  }
  
  getBecasNivelbody():Observable<any>{
    let url:string = this._base.getUrlApi() + 'becas_body2'; 
    return this.http.get<any>(url);
  }

  //agregar categoria becas
  addcategoriabecas(data:any)
  {
    let url:string = this._base.getUrlApi() + 'pagina-becas/add';
    return this.http.post(url,data);
  }

  updatecategoriabecasestado(data:any){
    let url:string = this._base.getUrlApi() + 'pagina-becas/update/estado';
    return this.http.put(url,data);
  }
  updatecategoriabecasNombre(data:any){
    let url:string = this._base.getUrlApi() + 'pagina-becas/update';
    return this.http.put(url,data);
  }

  //becas nivel body 
  getBecasNivelBodyId(id:string):Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas-body/get/'+id; 
    return this.http.get<any>(url);
  }

  //ftp 
  documentoftpCapacitaciones(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/Capacitaciones'; 
    return this.http.post(url,data);
  }
  documentoftpPregrado(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/Pregrado'; 
    return this.http.post(url,data);
  }
  documentoftpInvestigacion(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/Investigacion'; 
    return this.http.post(url,data);
  }
  documentoftpMaestria(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/Maestria'; 
    return this.http.post(url,data);
  }
  documentoftpDoctorado(data:any){
    let url:string = this._base.getUrlLocalApi() + 'documento/Doctorado'; 
    return this.http.post(url,data);
  }






  //creacion
  addBecasNivelBody(data:any){
    let url:string = this._base.getUrlApi() + 'pagina-becas-body/add'; 
    return this.http.post(url,data);
  }

  //modificar
  updateBecasNivelBody(data:any)
  {
    let url:string = this._base.getUrlApi() + 'pagina-becas-body/update'; 
    return this.http.put(url,data);
  }
}
