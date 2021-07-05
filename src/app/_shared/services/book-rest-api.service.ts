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

@Injectable({
  providedIn: 'root'
})
export class BookRestApiService extends RestApiServiceBase {
  bookGenres: BookGenreDTO[] = [];
  constructor(
    private http: HttpClient,
    private authenService: AuthService
  ) { super(http) }

  public getAllBook(bookFetch: BookFetchDto): Observable<ServiceResponseBase<BookDTO[]>> {
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

  public DeleteBook(bookId: string): Observable<ServiceResponseWithoutDataBase> {
    let url = this.hostUrl + "Books/Remove";
    const body = new HttpParams()
      .set('bookId', bookId)

    return this.http.delete<ServiceResponseWithoutDataBase>(url, {
      params: body,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
  }

  public FetchBook(bookISBN: string): Observable<ServiceResponseBase<BookDTO>> {
    let url = this.hostUrl + "Books/Fetch";
    var isbnObject = {
      "isbn": bookISBN
    }

    return this.http.post<ServiceResponseBase<BookDTO>>(url, isbnObject, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
  }

  public GetAllBookGenres(): Observable<ServiceResponseBase<BookGenreDTO[]>> {
    let url = this.hostUrl + "Books/GetAllGenres";
    let request = this.http.post<ServiceResponseBase<BookGenreDTO[]>>(url, {}, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.authenService.getToken())
    })
    const self = this;
    let req2 = request.
      pipe(
        switchMap((resp) => {
          self.bookGenres = resp.data;
          return of(resp);
        }));
    return req2;
  }
}
