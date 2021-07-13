import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNewFormComponent } from './member-new-form.component';

describe('MemberNewFormComponent', () => {
  let component: MemberNewFormComponent;
  let fixture: ComponentFixture<MemberNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberNewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
