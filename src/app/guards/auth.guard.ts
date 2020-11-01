import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private route:Router,
    private _auth:AuthService
  ){

  }
  canActivate(): boolean {
    if(this._auth.isAuth()){
        if(this._auth.profile=='1'){
          return true;
        }else{
          this.route.navigateByUrl('');
          return false;
        }
    }else{
      this.route.navigateByUrl('');
      return false;
    }
  }
  
}
