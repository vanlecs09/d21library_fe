import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from 'app/components/dialog-confirm/dialog-confirm/dialog-confirm.component';
import { BorrowOperationDTO, BorrowStatus } from 'app/_shared/dtos/borrow-operation.dto';
import { BorrowDTO } from 'app/_shared/dtos/borrow.dto';
import { Borrow } from 'app/_shared/models/borrow.model';
import { DialogConfirm } from 'app/_shared/models/dialog-confirm.model';
import { BorrowRequestFetchService } from 'app/_shared/services/borrow-request-fetch.service';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';

@Component({
  selector: 'app-borrow-request-list',
  templateUrl: './borrow-request-list.component.html',
  styleUrls: ['./borrow-request-list.component.css']
})
export class BorrowRequestListComponent implements OnInit {
  @Input("borrow-requests")
  public borrows: Borrow[] = [];

  @Output()
  onDeny = new EventEmitter<Borrow>();

  @Output()
  onApprove = new EventEmitter<Borrow>();

  @Output()
  onClose = new EventEmitter<Borrow>();

  constructor(
    private borrowApiService: BorrowRestApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private borrowFetchService: BorrowRequestFetchService
  ) { 
    const self = this;
    this.borrowFetchService.borrowSubject.subscribe((borrows: Borrow[]) => {
      self.borrows = borrows;
    });
  }

  ngOnInit(): void {
  }

  onDenyClicked(event, borrow: Borrow) {
    const self = this;
    let dialogConfirm = new DialogConfirm();
    dialogConfirm.title = "Xác nhận";
    dialogConfirm.content = "Bạn có muốn từ chối lời đề nghị này?";
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      autoFocus: true,
      data: dialogConfirm
    });
    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        let borrowOperation = new BorrowOperationDTO();
        borrowOperation.status = BorrowStatus.FINISHED;
        borrowOperation.id = borrow.id;
        self.borrowApiService.AdminOperation(borrowOperation).subscribe((resp) => {
          if (resp.resultCode == 1) {
            self.FetchBorrow();
          } else {
            self.openSnackBar(resp.message, "Đóng");
          }
        })
      });
  }

  onApprovedClicked(event, borrow: Borrow) {
    const self = this;
    let dialogConfirm = new DialogConfirm();
    dialogConfirm.title = "Xác nhận";
    dialogConfirm.content = "Bạn có muốn xác nhận lời đề nghị này";
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      autoFocus: true,
      data: dialogConfirm
    });
    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        let borrowOperation = new BorrowOperationDTO();
        borrowOperation.status = BorrowStatus.APRROVED;
        borrowOperation.id = borrow.id;
        self.borrowApiService.AdminOperation(borrowOperation).subscribe((resp) => {
          if (resp.resultCode == 1) {
            self.FetchBorrow();
          } else {
            self.openSnackBar(resp.message, "Đóng");
          }
        })
      });
  }

  onCloseClicked(event, borrow: Borrow) {
    const self = this;
    let dialogConfirm = new DialogConfirm();
    dialogConfirm.title = "Xác nhận";
    dialogConfirm.content = "Sách đã được trả?";
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      autoFocus: true,
      data: dialogConfirm
    });

    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        let borrowOperation = new BorrowOperationDTO();
        borrowOperation.status = BorrowStatus.FINISHED;
        borrowOperation.id = borrow.id;
        self.borrowApiService.AdminOperation(borrowOperation).subscribe((resp) => {
          if (resp.resultCode == 1) {
            self.FetchBorrow();
          } else {
            self.openSnackBar(resp.message, "Đóng");
          }
        })
      });
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
