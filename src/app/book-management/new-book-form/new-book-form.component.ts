import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { BookGenre } from 'app/components/chip-input/chip-input.component';
import { BookDTO } from 'app/_shared/dtos/book.dto';
import { BookGenre } from 'app/_shared/models/book-genre';
import { Book } from 'app/_shared/models/book.model';
import { BookRestApiService } from 'app/_shared/services/book-rest-api.service';
import { ServiceResponseBase } from 'app/_shared/services/service-response-base';

@Component({
    selector: 'app-new-book-form',
    templateUrl: './new-book-form.component.html',
    styleUrls: ['./new-book-form.component.styl']
})
export class NewBookFormComponent implements OnInit {
    bookGenres: BookGenre[] = [];
    constructor(public dialogRef: MatDialogRef<NewBookFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Book,
        private snackBar: MatSnackBar,
        private bookApiService: BookRestApiService
    ) {
        this.bookGenres = this.bookApiService.bookGenres.map(g => new BookGenre(g.name, false));
    }

    ngOnInit(): void {
    }

    cancel() {
        this.dialogRef.close();
    }

    onSelectGenre(bookGenres: BookGenre[]) {
        const self = this;
        self.data.genre = "";
        bookGenres.forEach(genre => self.data.genre += genre.name + " & ");
        self.data.genre = self.data.genre.slice(0, -3);
        console.log(self.data.genre);
    }

    submit() {
        if (!this.data || !this.data.title) {
            this.openSnackBar("Vui lòng nhập tên sách", "Đóng");
            return;
        }


        if (!this.data || !this.data.authorName) {
            this.openSnackBar("Vui lòng nhập tên tác giả", "Đóng");
            return;
        }

        if(!this.data || !this.data.genre) {
            this.openSnackBar("Vui lòng nhập the loai sach", "Đóng");
            return;
        }


        if (!!this.data.isbn) {
            this.data.isbn = this.data.isbn.split("-").join('');
        }


        let bookDTO = new BookDTO(this.data);
        this.dialogRef.close(bookDTO);
    }

    autoFill() {
        const self = this;
        this.bookApiService.FetchBook(this.data.isbn).subscribe((resp: ServiceResponseBase<BookDTO>) => {
            if (resp.resultCode != 1) return;
            self.data = new Book(resp.data);
        }, (error) => {
            self.openSnackBar(error, "Dong");
        });
    }


    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 10000,
        });
    }

    onBookUpdated() {
        if (!this.data.isbn) this.data.isbn = "";
        if (!this.data.authorName) this.data.authorName = "";
        if (!this.data.shelf) this.data.shelf = "";
        if (!this.data.title) this.data.title = "";

        console.log(this.data);

        this.data.isbn = this.data.isbn.split("-").join('');
    }
}
