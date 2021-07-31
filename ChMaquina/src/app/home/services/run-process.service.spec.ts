import { TestBed } from '@angular/core/testing';

import { RunProcessService } from './run-process.service';

describe('RunProcessService', () => {
  let service: RunProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
