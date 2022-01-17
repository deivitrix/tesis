import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  private url1:string = '';
  private urlBase:string = '';
  private urlLocal:string='';
  private urlapi:string='';

  constructor() { 
    this.urlBase = 'https://utmdricb.herokuapp.com/';
    this.url1 = this.urlBase + 'api/';

    this.urlLocal="http://localhost:8000/";
    this.urlapi=this.urlLocal+ 'api/';

  }

  getUrlBase(){
    return this.urlBase;
  }

  getUrlApi(){
    return this.url1;
  }

  //base local 
  getUrlLocal(){
    return this.urlLocal;
  }

  getUrlLocalApi(){
    return this.urlapi;
  }

}
