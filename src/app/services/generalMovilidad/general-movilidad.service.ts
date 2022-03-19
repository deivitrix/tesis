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

  getserviciomodalidad(tipo:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'modalidad/'+tipo;
    return this.http.get(url);
    
  }
}
