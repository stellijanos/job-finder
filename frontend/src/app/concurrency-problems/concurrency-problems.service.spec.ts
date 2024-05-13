import { TestBed } from '@angular/core/testing';

import { ConcurrencyProblemsService } from './concurrency-problems.service';

describe('ConcurrencyProblemsService', () => {
  let service: ConcurrencyProblemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcurrencyProblemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
