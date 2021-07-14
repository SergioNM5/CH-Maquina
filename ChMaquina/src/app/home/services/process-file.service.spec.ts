import { TestBed } from '@angular/core/testing';

import { ProcessFileService } from './process-file.service';

describe('ProcessFileService', () => {
  let service: ProcessFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
