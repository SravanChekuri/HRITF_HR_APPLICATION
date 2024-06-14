import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMainComponent } from './employee-main.component';

describe('EmployeeMainComponent', () => {
  let component: EmployeeMainComponent;
  let fixture: ComponentFixture<EmployeeMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeMainComponent]
    });
    fixture = TestBed.createComponent(EmployeeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
