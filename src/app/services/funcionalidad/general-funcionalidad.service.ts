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

  getfuncionalidad(id:string){
    let url:string = this._base.getUrlLocalApi() + 'usuario/funcionalidad/'+id;
    return this.http.get<any>(url);
  }
}
