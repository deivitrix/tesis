import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExistSesionGuardGuard implements CanActivate {

  constructor( private router:Router){  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let cedula = localStorage.getItem('id_personal');
      //let tipo=localStorage.getItem('tipo');
      if(cedula){
        // if(tipo=="I")
        // {
        //   return true;
        // }
        // this.router.navigateByUrl('/auth');
        return true;
        
      }else{
        this.router.navigateByUrl('/auth');
        return false;
      }
  }
  
}
