import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDTO } from 'app/_shared/dtos/book.dto';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrls: ['./new-book-form.component.styl']
})
export class NewBookFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewBookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookDTO, private snackBar: MatSnackBar) { }

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

    this.dialogRef.close(this.data);

    console.log(this.data);
  }
  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onBookUpdated() {
    if(!this.data.authorAffliation) {
      this.data.authorAffliation = "";
    }

    if(!this.data.authorEmail) {
      this.data.authorEmail = "";
    }

    if(!this.data.bookId) {
      this.data.bookId = "";
    }

    if(!this.data.authorId) {
      this.data.authorId = "";
    }
  }
}
