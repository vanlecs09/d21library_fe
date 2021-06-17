import { Book } from "../models/book.model";
import { AuthorDTO } from "./author.dto";

export class BookDTO {
    public bookId: string = "";
    public isbn: string = "";
    public title: string = "";
    public genre: string = "";
    public shelf: string = "";
    public authors: AuthorDTO[] = [];

    constructor(book: Book) {
        this.bookId = book.bookId;
        this.shelf = book.shelf;
        this.genre = book.genre;
        this.isbn = book.isbn;
        this.title = book.title;
        this.authors = book.authorName.split(" & ").map(name => new AuthorDTO(name))
    }
}