import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookDTO } from '../dtos/book.dto';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { RestApiServiceBase } from './rest-api-base.service';
import { ServiceResponseBase } from './service-response-base';
import { ServiceResponseWithoutDataBase } from './service-response-without-data-base';
import { BookSearchForm } from '../models/book-search-form.model';
import { AuthService } from './auth.service';
import { BookFetchDto } from '../dtos/bookFetch.dto';
import { BookGenreDTO } from '../dtos/bookGenre.dto';
import { MemberDTO } from '../dtos/member.dto';

@Injectable({
    providedIn: 'root'
})
export class MemberRestApiService extends RestApiServiceBase {
    constructor(
        private http: HttpClient,
        private authenService: AuthService
    ) { super(http) }

    public getAllMembers(): Observable<ServiceResponseBase<MemberDTO[]>> {
        let url = this.hostUrl + "Members/GetAll";
        return this.http.post<ServiceResponseBase<MemberDTO[]>>(url, {}, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.authenService.getToken())
        })
    }

    public Add(memberDto: MemberDTO): Observable<ServiceResponseWithoutDataBase> {
        let url = this.hostUrl + "Members/Add";
        return this.http.post<ServiceResponseWithoutDataBase>(url, memberDto, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.authenService.getToken())
        });
    }

    public Delete(memberDto: MemberDTO): Observable<ServiceResponseWithoutDataBase> {
        let url = this.hostUrl + "Members/Remove";
        return this.http.post<ServiceResponseWithoutDataBase>(url, memberDto, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.authenService.getToken())
        });
    }

}
