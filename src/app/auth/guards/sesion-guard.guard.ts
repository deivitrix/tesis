import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionGuardGuard implements CanActivate {

  constructor( private router:Router){  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let cedula = localStorage.getItem('cedula');

      if(cedula){
        this.router.navigateByUrl('/utmricb');
       
        return false;
      }else{
        return true;
      }

  } 
}
