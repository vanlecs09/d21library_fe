import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paginator } from '../models/book-paginator.model';
import { BookSearchForm } from '../models/book-search-form.model';
import { Book } from '../models/book.model';
import { BookRestApiService } from './book-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {
  public booksSubject = new BehaviorSubject<Book[]>([]);
  private paginator: Paginator = new Paginator();
  private bookSearchForm: BookSearchForm = new BookSearchForm()
  constructor(
    private bookApiService: BookRestApiService,
  ) { }

  public SearchByPage(paginator: Paginator) {
    this.paginator = paginator;
    this.Search();
  }

  public SearchByFilter(borrowSearchForm: BookSearchForm) {
    this.bookSearchForm = borrowSearchForm;
    this.Search();
  }

  public Search() {
    const self = this;
    this.bookSearchForm.itemPerPage = this.paginator.pageSize;
    this.bookSearchForm.pageNumber = this.paginator.pageIndex + 1;
    this.bookApiService.SearchBook(this.bookSearchForm).subscribe(
      (resp) => {
        if (resp.resultCode == 1) {
          let books = resp.data.map(bookDto => new Book(bookDto));
          self.booksSubject.next(books);
        } else {
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
