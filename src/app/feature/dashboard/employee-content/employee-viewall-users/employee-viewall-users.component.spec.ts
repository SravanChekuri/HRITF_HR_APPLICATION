import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewallUsersComponent } from './employee-viewall-users.component';

describe('EmployeeViewallUsersComponent', () => {
  let component: EmployeeViewallUsersComponent;
  let fixture: ComponentFixture<EmployeeViewallUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeViewallUsersComponent]
    });
    fixture = TestBed.createComponent(EmployeeViewallUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
