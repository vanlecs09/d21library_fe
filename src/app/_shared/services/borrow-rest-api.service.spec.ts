import { TestBed } from '@angular/core/testing';

import { BorrowRestApiService } from './borrow-rest-api.service';

describe('BorrowRestApiService', () => {
  let service: BorrowRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
