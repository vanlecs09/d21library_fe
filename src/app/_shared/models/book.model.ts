import { BookDTO } from "../dtos/book.dto";

export class Book {
  public id: string = "";
  public isbn: string = "";
  public title: string = "";
  public genre: string = "";
  public shelf: string = "";
  public authorName: string = "";
  public quantity: number = 0;
  public disabled: boolean = false;
  public borrowed: boolean = false;

  constructor(bookDto: BookDTO) {
    this.id = bookDto.bookId;
    this.isbn = bookDto.isbn;
    this.title = bookDto.title;
    bookDto.genres.forEach(genre => this.genre += genre.name + " & ");
    this.genre = this.genre.slice(0, -3);
    this.shelf = bookDto.shelf;
    bookDto.authors.forEach(author => this.authorName += author.name + " & ");
    this.authorName = this.authorName.slice(0, -3);
    this.quantity = bookDto.quantity;
    this.disabled = this.quantity == 0;
  }
}