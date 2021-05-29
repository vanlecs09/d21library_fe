import { TestBed } from '@angular/core/testing';

import { BookRestApiService } from './book-rest-api.service';

describe('BookRestApiService', () => {
  let service: BookRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
