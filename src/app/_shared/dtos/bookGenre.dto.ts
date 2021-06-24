import { Book } from "../models/book.model";
import { AuthorDTO } from "./author.dto";

export class BookGenreDTO {
    name: string = "";
    constructor(name: string) {
        this.name = name;
    }
}