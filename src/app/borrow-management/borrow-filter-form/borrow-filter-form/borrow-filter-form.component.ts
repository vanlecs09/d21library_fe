import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paginator } from 'app/_shared/models/book-paginator.model';
import { BorrowSearchForm } from 'app/_shared/models/borrow-search-form.model';
import { Borrow } from 'app/_shared/models/borrow.model';
import { BorrowRequestFetchService } from 'app/_shared/services/borrow-request-fetch.service';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { BorrowSearchService } from 'app/_shared/services/borrow-search.service';

@Component({
  selector: 'app-borrow-filter-form',
  templateUrl: './borrow-filter-form.component.html',
  styleUrls: ['./borrow-filter-form.component.css']
})
export class BorrowFilterFormComponent implements OnInit {

  private borrowSearchForm: BorrowSearchForm = new BorrowSearchForm();

  constructor(
    private borrowApiService: BorrowRestApiService,
    private borrowFetchService: BorrowRequestFetchService,
    private borrowSearchService: BorrowSearchService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSearchFormChange() {
  }

  onSearchClicked() {
    const self = this;
    self.borrowSearchService.SearchByFilter(self.borrowSearchForm);
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
