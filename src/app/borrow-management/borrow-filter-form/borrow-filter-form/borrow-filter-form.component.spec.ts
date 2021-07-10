import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowFilterFormComponent } from './borrow-filter-form.component';

describe('BorrowFilterFormComponent', () => {
  let component: BorrowFilterFormComponent;
  let fixture: ComponentFixture<BorrowFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
