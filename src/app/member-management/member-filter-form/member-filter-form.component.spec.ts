import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFilterFormComponent } from './member-filter-form.component';

describe('MemberFilterFormComponent', () => {
  let component: MemberFilterFormComponent;
  let fixture: ComponentFixture<MemberFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
