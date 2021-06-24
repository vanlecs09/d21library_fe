import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { BookGenre } from 'app/components/chip-input/chip-input.component';
import { BookDTO } from 'app/_shared/dtos/book.dto';
import { BookGenre } from 'app/_shared/models/book-genre';
import { Book } from 'app/_shared/models/book.model';
import { BookRestApiService } from 'app/_shared/services/book-rest-api.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
    bookGenres: BookGenre[] = [];
    constructor(public dialogRef: MatDialogRef<BookDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Book, private snackBar: MatSnackBar, private bookApiService: BookRestApiService) { 
            let bookGenres = this.bookApiService.bookGenres.map(g => new BookGenre(g.name, false));
            let selectedBookGenres = data.genre.split(" & ").map(g => new BookGenre(g, true));
            bookGenres.forEach(genre => {
                if(selectedBookGenres.find(selected => selected.name == genre.name))
                {
                    genre.isSelected = true;
                }
            })
            this.bookGenres = bookGenres;
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

        if (!this.data || !this.data.isbn) {
            this.openSnackBar("Vui lòng không để trống mã isbn", "Đóng");
            return;
        }
        
        let bookDTO = new BookDTO(this.data);
        this.dialogRef.close(bookDTO);
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
