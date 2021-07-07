import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BorrowDTO } from 'app/_shared/dtos/borrow.dto';
import { Borrow } from 'app/_shared/models/borrow.model';
import { BorrowRequestFetchService } from 'app/_shared/services/borrow-request-fetch.service';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';

@Component({
  selector: 'app-borrow-management',
  templateUrl: './borrow-management.component.html',
  styleUrls: ['./borrow-management.component.css']
})
export class BorrowManagementComponent implements OnInit {
  private borrows: Borrow[];

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private borrowApiService: BorrowRestApiService,
    private borrowFetchService: BorrowRequestFetchService
  ) {
    const self = this;
    this.borrowFetchService.borrowSubject.subscribe((borrows: Borrow[]) => {
      self.borrows = borrows;
    });
    this.FetchBorrow();
  }

  ngOnInit(): void {
  }


  FetchBorrow() {
    const self = this;
    this.borrowApiService.GetRequestBorrows().subscribe(
      (resp: ServiceResponseBase<BorrowDTO[]>) => {
        if (resp.resultCode == 1) {
          let borrows = resp.data.map(b => new Borrow(b));
          self.borrowFetchService.borrowSubject.next(borrows);
        } else {
          this.openSnackBar(resp.message, "Đóng");
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
