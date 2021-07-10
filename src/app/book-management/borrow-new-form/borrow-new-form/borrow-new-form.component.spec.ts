import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowNewFormComponent } from './borrow-new-form.component';

describe('BorrowNewFormComponent', () => {
  let component: BorrowNewFormComponent;
  let fixture: ComponentFixture<BorrowNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowNewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
