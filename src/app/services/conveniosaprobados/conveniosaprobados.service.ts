import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlService } from '../base/base-url.service';
@Injectable({
  providedIn: 'root'
})
export class ConveniosaprobadosService {
  anio:number;
  tipo_convenio:string;
  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { 
    this.anio=0;
    this.tipo_convenio="";
  }

  getConveniosAprobados():Observable<any>{
    let url:string = this._base.getUrlLocalApi() + 'tipocon2'
    return this.http.get<any>(url);
  }
}
