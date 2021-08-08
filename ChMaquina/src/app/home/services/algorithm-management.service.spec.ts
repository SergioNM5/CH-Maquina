import { TestBed } from '@angular/core/testing';

import { AlgorithmManagementService } from './algorithm-management.service';

describe('AlgorithmManagementService', () => {
  let service: AlgorithmManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
