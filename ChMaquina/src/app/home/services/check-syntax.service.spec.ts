import { TestBed } from '@angular/core/testing';

import { CheckSyntaxService } from './check-syntax.service';

describe('CheckSyntaxService', () => {
  let service: CheckSyntaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckSyntaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
