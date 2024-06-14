import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLettersComponent } from './employee-letters.component';

describe('EmployeeLettersComponent', () => {
  let component: EmployeeLettersComponent;
  let fixture: ComponentFixture<EmployeeLettersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLettersComponent]
    });
    fixture = TestBed.createComponent(EmployeeLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
