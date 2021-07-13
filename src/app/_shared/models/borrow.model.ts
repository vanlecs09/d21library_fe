import { BorrowDTO, MemberBorrow } from "../dtos/borrow.dto";

export class Borrow {
  id: string = "";
  name: string = "";
  bookTitles: string = "";
  member: MemberBorrow;
  status: string = "";
  note: string = "";
  dateBorrow: Date = new Date();
  dateReturn: Date = new Date();

  public constructor(borrowDto?: BorrowDTO) {
    if(!borrowDto) return;
    this.id = borrowDto.id;
    borrowDto.books.forEach(b => this.bookTitles += b.title + "\n");
    this.bookTitles.slice(0, -1);
    this.member = borrowDto.member;
    this.status = borrowDto.status;
    this.name = borrowDto.name;
    this.note = borrowDto.note;
    this.dateBorrow = new Date(borrowDto.dateBorrow);
    this.dateReturn = new Date(borrowDto.dateReturn);
  }
}

