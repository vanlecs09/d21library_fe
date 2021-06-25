import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { BookGenre } from 'app/_shared/models/book-genre';
import { BookSearchForm } from 'app/_shared/models/book-search-form.model';
import { BookRestApiService } from 'app/_shared/services/book-rest-api.service';

@Component({
    selector: 'app-book-filter',
    templateUrl: './book-filter.component.html',
    styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
    bookGenres: BookGenre[] = [];
    @Output()
    onSearch = new EventEmitter<BookSearchForm>();
    constructor(
        private bookApiService: BookRestApiService
    ) {
        this.bookApiService.GetAllBookGenres().subscribe(
            () => {
                this.bookGenres = this.bookApiService.bookGenres.map(g => new BookGenre(g.name, false))
            }
        )
    }

    bookSearchForm: BookSearchForm = {
        bookName: '',
        bookISBN: '',
        authorName: '',
        bookGenres: []
    };


    ngOnInit(): void {
    }

    onSearchClicked() {
        this.onSearch.emit(this.bookSearchForm);
    }

    onSelectGenre(bookGenres: BookGenre[]) {
        this.bookSearchForm.bookGenres = bookGenres.map(g => g.name);
        console.log(this.bookSearchForm);
    }
}
