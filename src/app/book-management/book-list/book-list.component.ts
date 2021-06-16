import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookDTO } from 'app/_shared/dtos/book.dto';
import { Book } from 'app/_shared/models/book.model';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.styl']
})
export class BookListComponent implements OnInit {
  @Input("book-list")
  public bookList: Book[] = [];

  @Output()
  onDelete = new EventEmitter<BookDTO>();

  @Output()
  onDetail = new EventEmitter<BookDTO>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClicked(event, book: Book) {
    let bookDTO = new BookDTO(book);
    this.onDelete.emit(bookDTO);
  }

  onDetailClicked(event, book: Book) {
    let bookDTO = new BookDTO(book);
    this.onDetail.emit(bookDTO);
  }
}
