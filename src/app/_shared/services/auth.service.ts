import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiServiceBase } from './rest-api-base.service';
import { ServiceResponseBase } from './service-response-base';
import { ServiceResponseWithoutDataBase } from './service-response-without-data-base';
import { Observable, of } from 'rxjs';
import { LoginDto } from '../dtos/Logindto';
import { ServiceLoginResponse } from './service-login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestApiServiceBase {
  usernames = ["admin", "manager", "pec_staff"];
  passwords = ["@dm1n", "m@nage4", "passionenglish"];

  isLoggedIn: boolean;
  isManager: boolean;
  isAdmin: boolean;
  token: string = "";
  expiration: string = "";


  constructor(private http: HttpClient) { super(http) }

  login(username: string, password: string): Observable<ServiceLoginResponse> {
    let url = this.hostUrl + "api/authenticate/login";
    let loginDto = new LoginDto();
    loginDto.password = password;
    loginDto.username = username;
    return this.http.post<ServiceLoginResponse>(url, loginDto);
  }

  isAuthenticated() {
    return this.token != "";
  }

  currentRole(): string {
    if (this.isLoggedIn && this.isAdmin) {
      return "admin";
    }

    if (this.isLoggedIn && this.isManager) {
      return "manager";
    }

    return null;
  }
}
