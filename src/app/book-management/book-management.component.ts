import { Component, OnInit } from '@angular/core';
import { BookDTO } from '../_shared/dtos/book.dto';
import { BookRestApiService } from '../_shared/services/book-rest-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NewBookFormComponent } from './new-book-form/new-book-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';
import { ServiceResponseWithoutDataBase } from 'app/_shared/services/service-response-without-data-base';
import { BookSearchForm } from 'app/_shared/models/book-search-form.model';
import { AuthService } from 'app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { Book } from 'app/_shared/models/book.model';
import { BookFetch } from 'app/_shared/models/book-fetch.model';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.styl']
})
export class BookManagementComponent implements OnInit {
  bookDtos: Book[] = [];

  constructor(
    private bookApiService: BookRestApiService,
    private authenService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.bookApiService.getAllBook(new BookFetch())
      .pipe(
        catchError(this.handleError<ServiceResponseBase<BookDTO[]>>('getBook', new ServiceResponseBase<BookDTO[]>()))
      )
      .subscribe((resp: ServiceResponseBase<BookDTO[]>) => {
        if (resp.resultCode == 1) {
          this.bookDtos = resp.data.map(bookDto => new Book(bookDto));
        } else {
          this.openSnackBar(resp.message, "Đóng");
        }
      });
  }

  async onBookSelected(book: BookDTO) {

  }

  onTouchAddBook() {
    this.openAddBookDialog();
  }

  openAddBookDialog() {
    const dialogRef = this.dialog.open(NewBookFormComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
      }
    });

    dialogRef.afterClosed()
      .subscribe(async result => {
        this.bookApiService.AddBook(result)
          .pipe(
            catchError(this.handleError<ServiceResponseWithoutDataBase>('getBook', new ServiceResponseWithoutDataBase()))
          )
          .subscribe((resp: ServiceResponseWithoutDataBase) => {
            console.log(resp.resultCode);
            if (resp.resultCode == 1) {
              this.openSnackBar(resp.message, "Đóng");
            } else {
              this.openSnackBar(resp.message, "Đóng");
            }
          });
      });
  }

  openBookDetailDialog(bookDTO: BookDTO) {
    const dialogRef = this.dialog.open(BookDetailComponent, {
      disableClose: true,
      autoFocus: true,
      data: new Book(bookDTO)
    });

    dialogRef.afterClosed()
      .subscribe(async result => {
        this.bookApiService.Update(result)
          .subscribe(
            (resp: ServiceResponseWithoutDataBase) => {
              if (resp.resultCode == 1) {
                this.openSnackBar(resp.message, "Đóng");
              } else {
                this.openSnackBar(resp.message, "Đóng");
              }
            },
            (error) => {
              this.openSnackBar(error.message, "Đóng");
            });
      });

  }

  onSearch(bookSearchForm: BookSearchForm) {
    this.bookApiService.SearchBook(bookSearchForm)
      .pipe(
        catchError(this.handleError<ServiceResponseBase<BookDTO[]>>('searchBook', new ServiceResponseBase<BookDTO[]>()))
      )
      .subscribe((resp: ServiceResponseBase<BookDTO[]>) => {
        if (resp.resultCode == 1) {
          this.bookDtos = resp.data.map(bookDto => new Book(bookDto));
        } else {
          this.openSnackBar(resp.message, "Đóng");
        }
      });
  }

  onDelete(bookDto: BookDTO) {
    this.bookApiService.DeleteBook(bookDto.isbn.toString())
      .pipe(
        catchError(this.handleError<ServiceResponseWithoutDataBase>('searchBook', new ServiceResponseWithoutDataBase()))
      )
      .subscribe((resp: ServiceResponseWithoutDataBase) => {
        console.log(resp.resultCode);
        if (resp.resultCode == 1) {
          this.openSnackBar(resp.message, "Đóng");
        } else {
          this.openSnackBar(resp.message, "Đóng");
        }
      });
  }

  onDetail(bookDTO: BookDTO) {
    this.openBookDetailDialog(bookDTO);
  }

  onUpdate(bookDto: BookDTO) {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.openSnackBar(error.message, "Đóng");
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
