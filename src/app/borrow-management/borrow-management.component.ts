import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BorrowDTO } from 'app/_shared/dtos/borrow.dto';
import { Paginator } from 'app/_shared/models/book-paginator.model';
import { Borrow } from 'app/_shared/models/borrow.model';
import { BorrowRequestFetchService } from 'app/_shared/services/borrow-request-fetch.service';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { BorrowSearchService } from 'app/_shared/services/borrow-search.service';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';

@Component({
  selector: 'app-borrow-management',
  templateUrl: './borrow-management.component.html',
  styleUrls: ['./borrow-management.component.css']
})
export class BorrowManagementComponent implements OnInit {
  
  private borrows: Borrow[];
  private panigator: Paginator = new Paginator();

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    // private borrowApiService: BorrowRestApiService,
    private borrowSearchService: BorrowSearchService,
    private borrowFetchService: BorrowRequestFetchService
  ) {
    const self = this;
    this.borrowFetchService.borrowSubject.subscribe((borrows: Borrow[]) => {
      console.log(borrows);
      self.borrows = borrows;
    });
    this.FetchBorrow();
  }

  ngOnInit(): void {
  }


  FetchBorrow() {
    const self = this;
    this.borrowSearchService.SearchByPage(this.panigator);
    // this.borrowApiService.GetRequestBorrows().subscribe(
    //   (resp: ServiceResponseBase<BorrowDTO[]>) => {
    //     if (resp.resultCode == 1) {
    //       let borrows = resp.data.map(b => new Borrow(b));
    //       self.borrowFetchService.borrowSubject.next(borrows);
    //     } else {
    //       this.openSnackBar(resp.message, "Đóng");
    //     }
    //   });
  }

  onPageEvent(event: PageEvent) {
    this.panigator.length = event.length;
    this.panigator.pageSize = event.pageSize;
    this.panigator.pageIndex = event.pageIndex;
    this.FetchBorrow();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
