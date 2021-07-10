import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paginator } from '../models/book-paginator.model';
import { Book } from '../models/book.model';
import { BorrowSearchForm } from '../models/borrow-search-form.model';
import { Borrow } from '../models/borrow.model';
import { BorrowRequestFetchService } from './borrow-request-fetch.service';
import { BorrowRestApiService } from './borrow-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowSearchService {

  private paginator: Paginator = new Paginator();
  private borrowSearchForm: BorrowSearchForm = new BorrowSearchForm()

  constructor(
    private borrowApiService: BorrowRestApiService,
    private borrowFetchService: BorrowRequestFetchService
  ) { }

  public SearchByPage(paginator: Paginator) {
    this.paginator = paginator;
    this.Search();
  }

  public SearchByFilter(borrowSearchForm: BorrowSearchForm) {
    this.borrowSearchForm = borrowSearchForm;
    this.Search();
  }

  public Search() {
    const self = this;
    this.borrowSearchForm.itemPerPage = this.paginator.pageSize;
    this.borrowSearchForm.pageNumber = this.paginator.pageIndex + 1;
    this.borrowApiService.Search(this.borrowSearchForm).subscribe(
      (resp) => {
        if (resp.resultCode == 1) {
          let borrows = resp.data.map(b => new Borrow(b));
          self.borrowFetchService.borrowSubject.next(borrows);
        } else {
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
