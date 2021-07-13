import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowRequestFetchService {

  public borrowSubject = new BehaviorSubject<Borrow[]>([]);
  constructor() { }
}
