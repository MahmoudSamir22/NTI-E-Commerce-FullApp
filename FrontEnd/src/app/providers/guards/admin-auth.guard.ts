import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _router:Router, private _global:GlobalService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(localStorage.getItem('userToken') && localStorage.getItem('role') == 'Admin'){
        return true
      }else {
        alert('u cant go here')
        this._router.navigateByUrl('/')
        return false
      }
  }
  
}
