import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiServiceBase } from './rest-api-base.service';
import { Observable, of } from 'rxjs';
import { LoginDto } from '../dtos/Logindto';
import { ServiceLoginResponse } from './service-login-response';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestApiServiceBase {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private _router: Router) {
    super(http);
  }

  public login(username: string, password: string): Observable<ServiceLoginResponse> {
    let url = this.hostUrl + "api/authenticate/login";
    let loginDto = new LoginDto();
    loginDto.password = password;
    loginDto.username = username;
    const self = this;

    let request = this.http.post<ServiceLoginResponse>(url, loginDto);
    let req2 = request.
      pipe(
        switchMap((resp) => {
          self.cookieService.set('token', resp.token);
          self.cookieService.set("expires_at", JSON.stringify(resp.expiration.valueOf()));
          return of(resp);
        }));
    return req2;
  }

  public signOut() {
    this.cookieService.set('token', "");
    this.cookieService.set("expires_at", "");
    this._router.navigate(['/login']);
  }

  public isAuthenticated() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    if (!this.cookieService.check("expires_at")) return moment();
    const expiration = this.cookieService.get("expires_at");
    console.log("getExpiration");
    if (expiration == "") return moment().subtract(1, "day");
    console.log("here");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getToken(): string {
    return this.cookieService.get("token");;
  }
}
