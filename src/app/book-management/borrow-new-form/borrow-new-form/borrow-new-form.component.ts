import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Borrow } from 'app/_shared/models/borrow.model';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { BorrowService } from 'app/_shared/services/borrow.service';

@Component({
  selector: 'app-borrow-new-form',
  templateUrl: './borrow-new-form.component.html',
  styleUrls: ['./borrow-new-form.component.css']
})
export class BorrowNewFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BorrowNewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Borrow,
    private borrowService: BorrowService,
    private borrowApiService: BorrowRestApiService,
    private snackBar: MatSnackBar) {
      console.log(data);

  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.data || !this.data.name) {
      this.openSnackBar("Vui lòng nhập nhan đề mượn", "Đóng");
      return;
    }
    this.dialogRef.close(this.data);
  }

  cancel() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
