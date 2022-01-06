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
    let url:string = this._base.getUrlApi() + 'convenio-especifico/get';
    return this.http.get<any>(url);
  }

  addconveniosEspecificos(data:any)
  {
    let url:string = this._base.getUrlApi() + 'convenio-especifico/crear';
    return this.http.post(url,data);
  }
}
