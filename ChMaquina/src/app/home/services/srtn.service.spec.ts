import { TestBed } from '@angular/core/testing';

import { SrtnService } from './srtn.service';

describe('SrtnService', () => {
  let service: SrtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
