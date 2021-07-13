import { TestBed } from '@angular/core/testing';

import { BorrowSearchService } from './borrow-search.service';

describe('BorrowSearchService', () => {
  let service: BorrowSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
