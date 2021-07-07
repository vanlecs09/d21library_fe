import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  // private currentBorrow: Borrow = new Borrow();
  private _books: Book[] = [];
  public books = new BehaviorSubject<Book[]>([]);
  constructor() { }

  public CreateBorrow() {
    this._books = [];
  }

  public AddBook(book: Book) {
    this._books.push(book);
    this.books.next(this._books);
  }

  public Reset() {
    this._books = [];
    this.books.next(this._books);
  }

  public Remove(book: Book) {
    this._books = this._books.filter(b => b.id != book.id);
    this.books.next(this._books);
  }

  public GetBooks() {
    return this._books;
  }
}
