import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDTO } from 'app/_shared/dtos/book.dto';
import { Book } from 'app/_shared/models/book.model';
import { BookRestApiService } from 'app/_shared/services/book-rest-api.service';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrls: ['./new-book-form.component.styl']
})
export class NewBookFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewBookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book, private snackBar: MatSnackBar, private bookApiService: BookRestApiService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.data || !this.data.title) {
      this.openSnackBar("Vui lòng nhập tên sách", "Đóng");
      return;
    }

    if (!this.data || !this.data.isbn) {
      this.openSnackBar("Vui lòng không để trống mã isbn", "Đóng");
      return;
    }

    if (!this.data || !this.data.authorName) {
      this.openSnackBar("Vui lòng nhập tên tác giả", "Đóng");
      return;
    }
    console.log(this.data);
    let bookDTO = new BookDTO(this.data);
    this.dialogRef.close(bookDTO);
  }

  autoFill() {
    const self = this;
    this.bookApiService.FetchBook(this.data.isbn).subscribe((resp: ServiceResponseBase<BookDTO>) => {
      if (resp.resultCode != 1) return;
      self.data = new Book(resp.data);
    }, (error) => {
      self.openSnackBar(error,"Dong");
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onBookUpdated() {
    if (!this.data.bookId) {
      this.data.bookId = "";
    }
  }
}
