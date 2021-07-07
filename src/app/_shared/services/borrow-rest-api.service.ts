import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BorrowOperationDTO } from '../dtos/borrow-operation.dto';
import { RegisterBorrowDTO } from '../dtos/borrow-register.dto';
import { BorrowDTO } from '../dtos/borrow.dto';
import { AuthService } from './auth.service';
import { RestApiServiceBase } from './rest-api-base.service';
import { ServiceResponseBase } from './service-response-base';
import { ServiceResponseWithoutDataBase } from './service-response-without-data-base';

@Injectable({
  providedIn: 'root'
})
export class BorrowRestApiService extends RestApiServiceBase {

  constructor(
    private http: HttpClient,
    private authenService: AuthService
  ) { super(http) }

  public Add(borrow: RegisterBorrowDTO): Observable<ServiceResponseWithoutDataBase> {
    let url = this.hostUrl + "Borrows/Add";
    return this.http.post<ServiceResponseWithoutDataBase>(url, borrow, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    });
  }

  public GetRequestBorrows(): Observable<ServiceResponseBase<BorrowDTO[]>> {
    let url = this.hostUrl + "Borrows/GetAll";
    return this.http.post<ServiceResponseBase<BorrowDTO[]>>(url, {}, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    });
  }

  public AdminOperation(borrowOperation : BorrowOperationDTO): Observable<ServiceResponseWithoutDataBase> {
    let url = this.hostUrl + "Borrows/AdminOperate";
    return this.http.post<ServiceResponseWithoutDataBase>(url, borrowOperation, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    });
  }
}
