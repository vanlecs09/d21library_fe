import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BorrowNewFormComponent } from 'app/book-management/borrow-new-form/borrow-new-form/borrow-new-form.component';
import { RegisterBorrowDTO } from 'app/_shared/dtos/borrow-register.dto';
import { Book } from 'app/_shared/models/book.model';
import { Borrow } from 'app/_shared/models/borrow.model';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { BorrowService } from 'app/_shared/services/borrow.service';

@Component({
  selector: 'app-book-borrow',
  templateUrl: './book-borrow.component.html',
  styleUrls: ['./book-borrow.component.css']
})
export class BookBorrowComponent implements OnInit {
  @Input("books-borrow")
  public books: Book[] = [];
  constructor(
    private borrowService: BorrowService,
    private dialog: MatDialog,
    private borrowApiService: BorrowRestApiService,
    private snackBar: MatSnackBar
  ) {
    this.borrowService.books.subscribe((books: Book[]) => {
      this.books = books
    });
  }

  ngOnInit(): void {
  }

  onCancelClicked(event, book: Book) {
    if (this.borrowService.GetBooks().length == 0) {
      this.openSnackBar("Bạn chưa mượn cuốn sách nào", "Đóng");
      return;
    }
    this.borrowService.Remove(book);
  }

  onBorrowClicked(event) {
    const self = this;
    if (this.borrowService.GetBooks().length == 0) {
      this.openSnackBar("Bạn chưa mượn cuốn sách nào", "Đóng");
      return;
    }

    const dialogRef = this.dialog.open(BorrowNewFormComponent, {
      disableClose: true,
      autoFocus: true,
      data: new Borrow()
    });



    dialogRef.afterClosed()
      .subscribe(async result => {
        if (!result) return;
        let books = this.borrowService.GetBooks();
        if (books.length == 0) return;
        let borrow = new RegisterBorrowDTO();
        borrow.bookIDs = books.map(book => book.id);
        borrow.name = result.note;
        borrow.note = result.note;
        this.borrowApiService.Add(borrow).subscribe((result) => {
          self.borrowService.Reset();
        });
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
