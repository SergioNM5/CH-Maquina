import { TestBed } from '@angular/core/testing';

import { RunRoundRobinService } from './run-round-robin.service';

describe('RunRoundRobinService', () => {
  let service: RunRoundRobinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunRoundRobinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
