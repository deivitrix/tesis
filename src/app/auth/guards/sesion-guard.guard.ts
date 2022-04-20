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
    
      let cedula = localStorage.getItem('id_personal');
      let tipo=localStorage.getItem('tipo');
      if(cedula && tipo=='I'){

        this.router.navigateByUrl('/utmricb');
        return false;
      }
      else if(cedula && tipo=='B'){
        this.router.navigateByUrl('/becas');
          return false;
      }
      else if(cedula && tipo=='M'){
        this.router.navigateByUrl('/movilidad');
          return false;
      }
      else{
        return true;
      }

  } 
}
