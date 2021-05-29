import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { BookSearchForm } from 'app/_shared/models/book-search-form.model';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  @Output()
  onSearch = new EventEmitter<BookSearchForm>();
  constructor() { }
  bookSearchForm: BookSearchForm = {
    bookName: '',
    bookISBN: '',
    authorName: '',
    bookGenre: ''
  };


  ngOnInit(): void {
  }

  onSearchClicked() {
    this.onSearch.emit(this.bookSearchForm);
  }
}
