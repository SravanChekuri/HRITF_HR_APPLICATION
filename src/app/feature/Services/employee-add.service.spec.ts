import { TestBed } from '@angular/core/testing';

import { EmployeeAddService } from './employee-add.service';

describe('EmployeeAddService', () => {
  let service: EmployeeAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
