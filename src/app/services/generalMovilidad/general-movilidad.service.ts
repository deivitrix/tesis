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

}
