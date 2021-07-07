import { Component, Input, OnInit } from '@angular/core';
import { RegisterBorrowDTO } from 'app/_shared/dtos/borrow-register.dto';
import { Book } from 'app/_shared/models/book.model';
import { BorrowRestApiService } from 'app/_shared/services/borrow-rest-api.service';
import { BorrowService } from 'app/_shared/services/borrow.service';

@Component({
  selector: 'app-book-borrow',
  templateUrl: './book-borrow.component.html',
  styleUrls: ['./book-borrow.component.css']
})
export class BookBorrowComponent implements OnInit {
  @Input("books-borrow")
  public books: Book[] = [];
  constructor(
    private borrowService: BorrowService,
    private borrowApiService: BorrowRestApiService
  ) {
    this.borrowService.books.subscribe((books: Book[]) => {
      this.books = books
    });
  }

  ngOnInit(): void {
  }

  onDeleteClicked(event, book: Book) {
    this.borrowService.Remove(book);
  }

  onBorrow(event) {
    const self  = this;
    let books = this.borrowService.GetBooks();
    if(books.length == 0) return;
    let borrow = new RegisterBorrowDTO();
    borrow.bookIDs = books.map(book => book.id);
    borrow.name = "";
    this.borrowApiService.Add(borrow).subscribe((result) => {
      self.borrowService.Reset();
    });
  }
}
