import { BorrowDTO, MemberBorrow } from "../dtos/borrow.dto";

export class Borrow {
  id: string = "";
  name: string = "";
  bookTitles: string = "";
  member: MemberBorrow;
  status: string = "";

  public constructor(borrowDto: BorrowDTO) {
    this.id = borrowDto.id;
    borrowDto.books.forEach(b => this.bookTitles += b.title + "\n");
    this.bookTitles.slice(0, -1);
    this.member = borrowDto.member;
    this.status = borrowDto.status;
    this.name = borrowDto.name;
  }
}

