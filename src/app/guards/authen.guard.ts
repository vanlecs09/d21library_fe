import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'app/_shared/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.isAuthenticated()) {
      alert("Is logged in!");
      return true;
    }

    // navigate to login page
    this._router.navigate(['/login']); // Ko can dong nay, cai AuthGuard chi can return true hay false no tu redirect
    // you can save redirect url so after authing we can move them back to the page they requested
      alert("Is not logged in!");
    return false;
  }

}
