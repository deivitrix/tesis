import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  private url1:string = '';
  private urlBase:string = '';

  constructor() { 
    this.urlBase = 'https://utmdricb.herokuapp.com/';
    this.url1 = this.urlBase + 'api/';
  }

  getUrlBase(){
    return this.urlBase;
  }

  getUrlApi(){
    return this.url1;
  }
}
