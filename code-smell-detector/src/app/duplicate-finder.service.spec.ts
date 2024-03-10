import { TestBed } from '@angular/core/testing';

import { DuplicateFinderService } from './duplicate-finder.service';

describe('DuplicateFinderService', () => {
  let service: DuplicateFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuplicateFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
