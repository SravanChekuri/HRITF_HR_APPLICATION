import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNewroleComponent } from './employee-newrole.component';

describe('EmployeeNewroleComponent', () => {
  let component: EmployeeNewroleComponent;
  let fixture: ComponentFixture<EmployeeNewroleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeNewroleComponent]
    });
    fixture = TestBed.createComponent(EmployeeNewroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
