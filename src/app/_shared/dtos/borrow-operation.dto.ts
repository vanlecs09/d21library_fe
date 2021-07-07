export class BorrowOperationDTO {
  id: string = "";
  status: string = "";
}

export class BorrowStatus {
  public static FINISHED: string = "finished";
  public static APRROVED: string = "approved";
  public static NEW: string = "new";
}