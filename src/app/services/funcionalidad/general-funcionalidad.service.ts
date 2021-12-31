import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralFuncionalidadService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }

  getfuncionalidad(cedula:string){
    let url:string = this._base.getUrlApi() + 'usuario/funcionalidad/'+cedula;
    return this.http.get<any>(url);
  }
}
