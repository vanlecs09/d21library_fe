import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberDTO } from 'app/_shared/dtos/member.dto';
import { BookGenre } from 'app/_shared/models/book-genre';
import { MemberRestApiService } from 'app/_shared/services/member-rest-api-service';

@Component({
  selector: 'app-member-new-form',
  templateUrl: './member-new-form.component.html',
  styleUrls: ['./member-new-form.component.css']
})
export class MemberNewFormComponent implements OnInit {

    // bookGenres: BookGenre[] = [];
    constructor(public dialogRef: MatDialogRef<MemberNewFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MemberDTO,
        private snackBar: MatSnackBar,
        private bookApiService: MemberRestApiService
    ) {
        // this.bookGenres = this.bookApiService.bookGenres.map(g => new BookGenre(g.name, false));
    }

    ngOnInit(): void {
    }

    cancel() {
        this.dialogRef.close();
    }


    submit() {
        console.log(this.data);
        if (!this.data || !this.data.name) {
            this.openSnackBar("Vui lòng nhập tên member", "Đóng");
            return;
        }

        if (!this.data || !this.data.telePhoneNumber) {
            this.openSnackBar("Vui lòng không để trống số điện thoại", "Đóng");
            return;
        }

        if (!this.data || !this.data.email) {
            this.openSnackBar("Vui lòng nhập email", "Đóng");
            return;
        }
     
        // this.data.isbn = this.data.isbn.split("-").join('');

        // let bookDTO = new BookDTO(this.data);
        this.dialogRef.close(this.data);
    }


    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 10000,
        });
    }

    onBookUpdated() {
      
    }

}
