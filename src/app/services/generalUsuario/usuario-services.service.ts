import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    let url:string = this._base.getUrlLocalApi() + 'usuario/upload-image';
    return this.http.post(url,data);
  }

  updatepassword(data:any){
    let url:string = this._base.getUrlLocalApi() + 'usuario/update-password';
    return this.http.post(url,data);
  }

  updateusuario(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'usuario/update';
    return this.http.put(url,data);
  }
  getusuariosearch(id:string):Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'usuario/search/'+id;
    return this.http.get<any>(url);
  }
}
