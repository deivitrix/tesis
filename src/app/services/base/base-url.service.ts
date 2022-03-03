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

  //utm
  private utm="";
  private urlapiutm="";

  private apikey="";

  constructor() { 
    this.urlBase = 'https://utmdricb.herokuapp.com/';
    this.url1 = this.urlBase + 'api/';

    this.urlLocal="http://localhost:8000/";
    this.urlapi=this.urlLocal+ 'api/';

    this.utm="https://app.utm.edu.ec/becas/";
    this.urlapiutm=this.utm+'api/';

    this.apikey="3ecbcb4e62a00d2bc58080218a4376f24a8079e1";



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

  //UTM
  getUrlUTM(){
    return this.utm;
  }

  getUrlUTMApi(){
    return this.urlapiutm;
  }

  getApikey(){
    return this.apikey;
  }

}
