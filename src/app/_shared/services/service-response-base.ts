export class ServiceResponseBase<T> {
  public resultCode: number = -1;
  public message: string = "";
  //@ts-ignore
  public data: T;
}