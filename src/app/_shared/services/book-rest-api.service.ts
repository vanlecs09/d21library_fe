import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookDTO } from '../dtos/book.dto';
import { catchError, map, tap } from 'rxjs/operators';
import { RestApiServiceBase } from './rest-api-base.service';
import { ServiceResponseBase } from './service-response-base';
import { ServiceResponseWithoutDataBase } from './service-response-without-data-base';
import { BookSearchForm } from '../models/book-search-form.model';
import { AuthService } from './auth.service';
import { BookFetch } from '../models/book-fetch.model';

@Injectable({
  providedIn: 'root'
})
export class BookRestApiService extends RestApiServiceBase {

  constructor(
    private http: HttpClient,
    private authenService: AuthService
  ) { super(http) }

  public getAllBook(bookFetch: BookFetch): Observable<ServiceResponseBase<BookDTO[]>> {
    let url = this.hostUrl + "Books/GetAll";
    return this.http.post<ServiceResponseBase<BookDTO[]>>(url, bookFetch, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
  }

  public AddBook(bookDto: BookDTO): Observable<ServiceResponseWithoutDataBase> {
    let url = this.hostUrl + "Books/Add";
    return this.http.post<ServiceResponseWithoutDataBase>(url, bookDto, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    });
  }

  public Update(bookDto: BookDTO): Observable<ServiceResponseWithoutDataBase> {
    let url = this.hostUrl + "Books/Update";
    return this.http.post<ServiceResponseWithoutDataBase>(url, bookDto, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    });
  }

  public SearchBook(bookSearchForm: BookSearchForm): Observable<ServiceResponseBase<BookDTO[]>> {
    let url = this.hostUrl + "Books/Search";
    return this.http.post<ServiceResponseBase<BookDTO[]>>(url, bookSearchForm, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
  }

  public DeleteBook(bookISBN: string): Observable<ServiceResponseWithoutDataBase> {
    let url = this.hostUrl + "Books/Remove";
    const body = new HttpParams()
      .set('bookISBN', bookISBN)

    return this.http.delete<ServiceResponseWithoutDataBase>(url, {
      params: body,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
  }

  public FetchBook(bookISBN: string): Observable<ServiceResponseBase<BookDTO>> {
    let url = this.hostUrl + "Books/Fetch";
    // const body = new HttpParams()
    //   .set('isbn', bookISBN)
    var isbnObject = {
      "isbn": bookISBN
    }

    return this.http.post<ServiceResponseBase<BookDTO>>(url, isbnObject, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
