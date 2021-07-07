export class BorrowDTO {
  id: string = "";
  name: string = "";
  books: BookBorrow[] = [];
  member: MemberBorrow;
  status: string = "";
}



export class BookBorrow {
  refId: string = "";
  isbn: string = "";
  title: string = "";
}

export class MemberBorrow {
  refId: string = "";
  name: string = "";
  telePhoneNumber: string = "";
  title: string = "";
}