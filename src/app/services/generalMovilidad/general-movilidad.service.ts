import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralMovilidadService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }

  //buscar que sea un Estudiante
  getMovilidadEstudiante(cedula:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'consulta-movilidad/'+cedula;
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

  //Documentos movilidad
  addftpmovilidad(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'documentos/movilidad';
    return this.http.post(url,data);
  }

  //agregar solicitud
  addsolicitud(data:any){
    let url:string = this._base.getUrlLocalApi() + 'movilidad-new';
    return this.http.post(url,data);

  }

  //Documento movilidad (uno a uno ) para la solicitud 
  addftpmovilidad_v2(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'documento/movilidad';
    return this.http.post(url,data);
  }

  //obtener las solicitudes consultados por cedula
  getsolicitudmovilidad(cedula:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'solicitud-movilidad/'+cedula;
    return this.http.get(url);
  }

  // obtener los datos de movilidad por el estado de la solicitud
  getEstadoSolicitudMovilidad(tipo:string)
  {
    //consultar/solicitudes/{tipo}/{estado}
    let url:string = this._base.getUrlLocalApi() + 'consultar/solicitudes/M/'+tipo;
    return this.http.get(url);
  }
  //obtener la informacion de la solicitud
  getsolicitudid(id:number)
  {
    let url:string = this._base.getUrlLocalApi() + 'solicitud/movilidad/'+id;
    return this.http.get(url);
  }

  //update solicitud estado_solicitud
  updateSolicitudEstadoMovilidad(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'updatemovilidad/solicitud';
    return this.http.put(url,data);
  }

  ///tabla aprobado movilidad
  getablaaprobadosSolicitud(){
    let url:string = this._base.getUrlLocalApi() + 'movilidad/s-aprobada/A';
    return this.http.get(url);
  }


  //subir documento final
  addsolicitudfinalftp(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'subir/pdfsolicitudes';
    return this.http.post(url,data);
  }

  // actualizar estado documento final 
  updateEstadoSubirDocumento(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'actualizar/informe/s_aprobadas';
    return this.http.put(url,data);
  }

}
