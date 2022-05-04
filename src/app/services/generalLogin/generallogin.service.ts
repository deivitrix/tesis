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
  
  

  // utm api
  loginUTM(data:any)
  {
    let url:string = this._base.getUrlLocalApi() + 'login-UTM';
    return this.http.post(url,data);
  }


  //Login obtener el usuario
  login(personal_id:string)
  {
    let url:string = this._base.getUrlLocalApi() + 'usuario/login/'+personal_id;
    return this.http.get(url);
  }

  // login2(data:any){
  //   let url:string = this._base.getUrlApi() + 'usuario/login';
  //   return this.http.post(url,data);
  // }

  get isLogged():Observable<boolean>{
    return this.loggedId.asObservable();
  }

  logout(){
    localStorage.removeItem("id_personal");
    localStorage.clear();
    this.loggedId.next(false);
  }

  // buscar usuario

  getusuariosearch(id:string):Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'usuario/search/'+id;
    return this.http.get<any>(url);
  }

  //enviar correo al usuario para la recuperacion del password
  // emailsearch(data:any)
  // {
  //   let url:string = this._base.getUrlLocalApi() + 'email/forget-password';
  //   return this.http.post(url,data);
  // }

  // recuperacionPassword(data:any)
  // {
  //   let url:string = this._base.getUrlLocalApi() + 'usuario/reset-password';
  //   return this.http.put(url,data);
  // }

  
}
