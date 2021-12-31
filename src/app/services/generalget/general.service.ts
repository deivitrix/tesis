import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }

  getTipoPagina(pagina:string):Observable<any>{
    let url:string = this._base.getUrlApi() + 'interfaz/contenido/'+pagina;
    return this.http.get<Interfaz_contenido[]>(url);
  }
}
