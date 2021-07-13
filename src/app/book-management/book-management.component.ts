import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookDTO } from '../_shared/dtos/book.dto';
import { BookRestApiService } from '../_shared/services/book-rest-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NewBookFormComponent } from './new-book-form/new-book-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';;
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';
import { ServiceResponseWithoutDataBase } from 'app/_shared/services/service-response-without-data-base';
import { BookSearchForm } from 'app/_shared/models/book-search-form.model';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { Book } from 'app/_shared/models/book.model';
import {  Paginator } from 'app/_shared/models/book-paginator.model';
import { BookFetchDto } from 'app/_shared/dtos/bookFetch.dto';
import { PageEvent } from '@angular/material/paginator';
import { DialogConfirmComponent } from 'app/components/dialog-confirm/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from 'app/_shared/models/dialog-confirm.model';
import { BorrowService } from 'app/_shared/services/borrow.service';
import { BookSearchService } from 'app/_shared/services/book-search.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.styl']
})
export class BookManagementComponent implements OnInit, OnDestroy {
  bookDtos: Book[] = [];
  // borrwedBooks: Book[] = [];
  bookPanigator: Paginator = new Paginator();
  constructor(
    private bookApiService: BookRestApiService,
    private bookSearchService: BookSearchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private borrowService: BorrowService
  ) { 
    const self = this;
    this.borrowService.booksBorrowSubject.subscribe((books: Book[]) => {
      self.bookDtos.forEach(book => book.disabled = books.filter(borrowBook => borrowBook.id == book.id).length > 0 || book.quantity == 0);
    });
    self.bookSearchService.booksSubject.subscribe((books: Book[]) => {
      self.bookDtos = books;
      let borrowedBooks = self.borrowService.GetBooks();
      self.bookDtos.forEach(book => book.disabled = borrowedBooks.filter(borrowBook => borrowBook.id == book.id).length > 0 || book.quantity == 0);
    });
  }

  ngOnInit(): void {
    this.bookApiService.GetAllBookGenres().subscribe();
    this.fetchBooks();
  }

  ngOnDestroy(): void {
    console.log("on destroy");
    this.borrowService.Reset();
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
    const self = this;
    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        self.bookApiService.AddBook(result)
          .subscribe((resp: ServiceResponseWithoutDataBase) => {
            if (resp.resultCode == 1) {
              self.fetchBooks();
              self.bookApiService.GetAllBookGenres().subscribe();
              self.openSnackBar(resp.message, "Đóng");
            } else {
              self.openSnackBar(resp.message, "Đóng");
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
    const self = this;
    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        self.bookApiService.Update(result)
          .subscribe(
            (resp: ServiceResponseWithoutDataBase) => {
              if (resp.resultCode == 1) {
                self.fetchBooks();
                self.bookApiService.GetAllBookGenres().subscribe();
                self.openSnackBar(resp.message, "Đóng");
              } else {
                self.openSnackBar(resp.message, "Đóng");
              }
            },
            (error) => {
              self.openSnackBar(error.message, "Đóng");
            });
      });

  }

  onDelete(bookDto: BookDTO) {
    const self = this;
    var dialogConfirm = new DialogConfirm();
    dialogConfirm.title = "Xác nhận";
    dialogConfirm.content = "Bạn có chắc muốn xóa sách ra khỏi thư viện không";
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      autoFocus: true,
      data: dialogConfirm
    });
    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        self.bookApiService.DeleteBook(bookDto.bookId.toString())
          .subscribe((resp: ServiceResponseWithoutDataBase) => {
            if (resp.resultCode == 1) {
              self.bookApiService.GetAllBookGenres().subscribe();
              this.openSnackBar(resp.message, "Đóng");
            } else {
              this.openSnackBar(resp.message, "Đóng");
            }
          });
      })
  }

  onDetail(bookDTO: BookDTO) {
    this.openBookDetailDialog(bookDTO);
  }

  onBorrow(book: Book) {
    this.borrowService.AddBook(book);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onPageEvent(event: PageEvent) {
    this.bookPanigator.length = event.length;
    this.bookPanigator.pageSize = event.pageSize;
    this.bookPanigator.pageIndex = event.pageIndex;
    this.fetchBooks();
  }

  private fetchBooks() {
    let bookFetch = new BookFetchDto();
    bookFetch.itemPerPage = this.bookPanigator.pageSize;
    bookFetch.pageNumber = this.bookPanigator.pageIndex + 1;
    this.bookSearchService.SearchByPage(this.bookPanigator);
  }
}
