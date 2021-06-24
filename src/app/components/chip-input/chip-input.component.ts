import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChip, MatChipInputEvent, MatChipSelectionChange } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BookRestApiService } from 'app/_shared/services/book-rest-api.service';
import { BookGenre } from 'app/_shared/models/book-genre';

export class BookGenreModel {
    name: string;
    isSelected: boolean

    constructor(name, isSelected) {
        this.name = name;
        this.isSelected = isSelected;
    }
}


@Component({
    selector: 'app-chip-input',
    templateUrl: './chip-input.component.html',
    styleUrls: ['./chip-input.component.css']
})
export class ChipInputComponent implements OnInit, AfterViewInit {
   
    // public bookList: BookGenre[] = [];
    removable = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    @Input("book-genres")
    bookGenres: BookGenre[] = [];

    @Output()
    onSelectGenre = new EventEmitter<BookGenre[]>();

    constructor(
        private bookService: BookRestApiService
    ) { }

    ngAfterViewInit(): void {
        // this.bookGenres = this.bookService.bookGenres.map(genre => new BookGenre(genre.name, false));
    }

    ngOnInit(): void {
        // this.bookGenres = this.bookService.bookGenres.map(genre => new BookGenre(genre.name, false));
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.bookGenres.push(new BookGenre(value, true));
            this.onSelectGenre.emit(this.bookGenres.filter(genre => genre.isSelected == true));
        }
        event.input.value = "";
    }

    remove(bookGenre: BookGenre): void {
        const index = this.bookGenres.indexOf(bookGenre);
        if (index >= 0) {
            this.bookGenres.splice(index, 1);
            this.onSelectGenre.emit(this.bookGenres.filter(genre => genre.isSelected == true));
        }
    }

    toggleSelection(chip: MatChip, bookGenre) {
        var foundGerne = this.bookGenres.find(genre => genre.name == bookGenre.name);
        if(!foundGerne) return;
        foundGerne.isSelected = !foundGerne.isSelected;
        this.onSelectGenre.emit(this.bookGenres.filter(genre => genre.isSelected == true));
    }
}
