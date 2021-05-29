import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookDTO } from 'app/_shared/dtos/book.dto';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.styl']
})
export class BookListComponent implements OnInit {
  @Input("book-list")
  public bookList: BookDTO[] = [];

  @Output()
  onDelete = new EventEmitter<BookDTO>();
  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClicked(event, bookDTO: BookDTO) {
    this.onDelete.emit(bookDTO);
  }
}
