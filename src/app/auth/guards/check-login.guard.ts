
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private _login:GeneralLoginService){

  }
  canActivate(): Observable<boolean>{
    return this._login.isLogged.pipe(
      take(1),
      map((isLogged:boolean)=> isLogged)
    );
  }
  
}
