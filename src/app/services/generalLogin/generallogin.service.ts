import { Usuario } from './../../models/usuario/usuario_model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BaseUrlService } from '../base/base-url.service';
@Injectable({
  providedIn: 'root'
})
export class GeneralLoginService{

  public loggedId=new BehaviorSubject<boolean>(false);

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }
  
  // header
  HeadersUTM(){
    let headers=new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "X-Api-Key":this._base.getApikey()
    })
    return headers;
  }
  
  // utm api
  loginUTM(data:any)
  {
    let option=this.HeadersUTM();
    let url:string = this._base.getUrlUTMApi() + 'publico/IniciaSesion';
    return this.http.post(url,data,{headers:option});
    // return fetch(url)

  }


  //Login obtener el usuario
  login(cedula:string)
  {
    let url:string = this._base.getUrlApi() + 'usuario/login'+cedula;
    return this.http.get(url);
  }

  login2(data:any){
    let url:string = this._base.getUrlApi() + 'usuario/login';
    return this.http.post(url,data);
  }

  get isLogged():Observable<boolean>{
    return this.loggedId.asObservable();
  }

  logout(){
    localStorage.removeItem("cedula");
    this.loggedId.next(false);
  }

  // buscar usuario

  getusuariosearch(cedula:string):Observable<any>
  {
    let url:string = this._base.getUrlApi() + 'usuario/search/'+cedula;
    return this.http.get<any>(url);
  }

  //enviar correo al usuario para la recuperacion del password

  emailsearch(data:any)
  {
    let url:string = this._base.getUrlApi() + 'email/forget-password';
    return this.http.post(url,data);
  }

  recuperacionPassword(data:any)
  {
    let url:string = this._base.getUrlApi() + 'usuario/reset-password';
    return this.http.put(url,data);
  }

  
}
