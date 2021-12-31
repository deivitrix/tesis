import { Usuario } from './../../models/usuario/usuario_model';
import { HttpClient } from '@angular/common/http';
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
  


  //Login obtener el usuario
  login(data:any)
  {
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

  
}
