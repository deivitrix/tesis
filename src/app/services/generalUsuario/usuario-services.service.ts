import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServicesService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }

  updateusuarioimagen(data:any)
  {
    let url:string = this._base.getUrlApi() + 'usuario/upload-image';
    return this.http.post(url,data);
  }

  updatepassword(data:any){
    let url:string = this._base.getUrlApi() + 'usuario/update-password';
    return this.http.post(url,data);
  }

  updateusuario(data:any)
  {
    let url:string = this._base.getUrlApi() + 'usuario/update';
    return this.http.put(url,data);
  }
}
