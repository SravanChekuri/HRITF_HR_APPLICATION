import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBackendDataSettingsComponent } from './employee-backend-data-settings.component';

describe('EmployeeBackendDataSettingsComponent', () => {
  let component: EmployeeBackendDataSettingsComponent;
  let fixture: ComponentFixture<EmployeeBackendDataSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeBackendDataSettingsComponent]
    });
    fixture = TestBed.createComponent(EmployeeBackendDataSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
