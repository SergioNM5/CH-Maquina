import { TestBed } from '@angular/core/testing';

import { RunStepToStepService } from './run-step-to-step.service';

describe('RunStepToStepService', () => {
  let service: RunStepToStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunStepToStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
