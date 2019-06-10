import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})                                            /*, CanActivateChild, CanLoad*/
export class AuthGuard implements CanActivate  {
  constructor( private auth: AuthService,
               private router: Router) {}
  canActivate(): boolean {
    console.log('guard');
    if ( this.auth.estaAutenticado() ){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  /*
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  */
}
