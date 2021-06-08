import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiServiceBase } from './rest-api-base.service';
import { ServiceResponseBase } from './service-response-base';
import { ServiceResponseWithoutDataBase } from './service-response-without-data-base';
import { Observable, of } from 'rxjs';
import { LoginDto } from '../dtos/Logindto';
import { ServiceLoginResponse } from './service-login-response';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestApiServiceBase {
  usernames = ["admin", "manager", "pec_staff"];
  passwords = ["@dm1n", "m@nage4", "passionenglish"];

  // isLoggedIn: boolean;
  // isManager: boolean;
  // isAdmin: boolean;
  // expiration: string = "";


  constructor(
    private http: HttpClient,
    private cookieService: CookieService) {
    super(http);
  }

  public login(username: string, password: string): Observable<ServiceLoginResponse> {
    let url = this.hostUrl + "api/authenticate/login";
    let loginDto = new LoginDto();
    loginDto.password = password;
    loginDto.username = username;
    const self = this;
    // Ham nay chua set token?

    // Có cách nào await response luôn trong đây ko?
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

  public isAuthenticated() {
    console.log(this.getExpiration());
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    if (!this.cookieService.check("expires_at")) return moment();
    const expiration = this.cookieService.get("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getToken(): string {
    return this.cookieService.get("token");;
  }
  

  // currentRole(): string {
  //   if (this.isLoggedIn && this.isAdmin) {
  //     return "admin";
  //   }

  //   if (this.isLoggedIn && this.isManager) {
  //     return "manager";
  //   }

  //   return null;
  // }
}
