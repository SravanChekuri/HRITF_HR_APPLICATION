import { TestBed } from '@angular/core/testing';

import { EmployeeDetailsService } from './employee-details.service';

describe('EmployeeDetailsService', () => {
  let service: EmployeeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
