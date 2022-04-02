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
    let url:string = this._base.getUrlLocalApi() + 'becas2'
    return this.http.get<any>(url);
  }


  //becas por nivel
  getBecasv2(tipo:string):Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'beca-v2/'+tipo
    return this.http.get<any>(url);
  }
  
  getBecasNivelbody():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'becas_body2'; 
    return this.http.get<any>(url);
  }

  //agregar categoria becas
  addcategoriabecas(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas/add';
    return this.http.post(url,data);
  }

  updatecategoriabecasestado(data:any){
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas/update/estado';
    return this.http.put(url,data);
  }
  updatecategoriabecasNombre(data:any){
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas/update';
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
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas-body/add'; 
    return this.http.post(url,data);
  }

  //modificar
  updateBecasNivelBody(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas-body/update'; 
    return this.http.put(url,data);
  }

  //updateEstado NIvel Becas Body
  updateEstadoBecasNivelBody(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas-body/update/estado'; 
    return this.http.put(url,data);
  }


  //verificar la beca para el personal de UTM
  getBecasDocente(cedula:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'consulta-becas/'+cedula; 
    return this.http.get(url);
  }
  //modalidad 
  getserviciomodalidad(tipo:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'modalidad/'+tipo;
    return this.http.get(url);
    
  }

  // universidades
  getserviciouniversidades(){
    let url:string = this._base.getUrlLocalApi() + 'universidades';
    return this.http.get(url);
  }

  //naturaleza
  getservicionaturaleza(tipo:string){
    let url:string = this._base.getUrlLocalApi() + 'naturaleza/'+tipo;
    return this.http.get(url);
  }

  //apoyo
  getservicioapoyo(tipo:string){
    let url:string = this._base.getUrlLocalApi() + 'apoyo/'+tipo;
    return this.http.get(url);
  }

  //monto
  getserviciomonto(tipo:string){
    let url:string = this._base.getUrlLocalApi() + 'monto/'+tipo;
    return this.http.get(url);
  }

  //alergias
  getservicioalergias(){
    let url:string = this._base.getUrlLocalApi() + 'alergias';
    return this.http.get(url);
  }

  // beneficios
  getserviciobeneficio(id:number)
  {
    let url:string = this._base.getUrlLocalApi() + 'beneficios/'+id;
    return this.http.get(url);
  }

  //subir solicitudes de Becas
  addftpsolicitudbecas(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'documento/becas';
    return this.http.post(url,data);
  }

  // agregar solicitud becas
  addsolicitudbecas(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'becas-new';
    return this.http.post(url,data); 
  }

  //obtener las solicitudes consultados por cedula
  getsolicitudbecas(cedula:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'solicitud-beca/'+cedula;
    return this.http.get(url);
  }

   // obtener los datos de movilidad por el estado de la solicitud
   getEstadoSolicitudMovilidad(tipo:string)
   {
     //consultar/solicitudes/{tipo}/{estado}
     let url:string = this._base.getUrlLocalApi() + 'becas/solicitudes/B/'+tipo;
     return this.http.get(url);
   }

   //obtener la informacion de la solicitud
  getsolicitudid(id:number)
  { 
    let url:string = this._base.getUrlLocalApi() + 'solicitud/becas/'+id;
    return this.http.get(url);
  }

  //update solicitud estado_solicitud
  updateSolicitudEstadoBecas(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'updatebecas/solicitud';
    return this.http.put(url,data);
  }

  ///tabla aprobado movilidad
  getablaaprobadosSolicitud(){
    let url:string = this._base.getUrlLocalApi() + 'becas/s-aprobada/A';
    return this.http.get(url);
  }

   //subir documento final
   addsolicitudfinalftp(data:any)
   {
     let url:string = this._base.getUrlLocalApi() + 'subir/pdfsolicitudes';
     return this.http.post(url,data);
 
   }



  

}
