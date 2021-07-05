import { Book } from "../models/book.model";
import { AuthorDTO } from "./author.dto";
import { BookGenreDTO } from "./bookGenre.dto";

export class BookDTO {
    public bookId: string = "";
    public isbn: string = "";
    public title: string = "";
    public genres: BookGenreDTO[] = [];
    public shelf: string = "";
    public authors: AuthorDTO[] = [];

    constructor(book: Book) {
        this.bookId = book.id;
        this.shelf = book.shelf;
        this.genres = book.genre.split(" & ").map(name => new BookGenreDTO(name));
        this.isbn = book.isbn;
        this.title = book.title;
        this.authors = book.authorName.split(" & ").map(name => new AuthorDTO(name))
    }
}