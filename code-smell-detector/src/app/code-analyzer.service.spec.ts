import { TestBed } from '@angular/core/testing';

import { CodeAnalyzerService } from './code-analyzer.service';

describe('CodeAnalyzerService', () => {
  let service: CodeAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
