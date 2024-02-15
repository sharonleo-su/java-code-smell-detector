import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAnalyzerComponent } from './code-analyzer.component';

describe('CodeAnalyzerComponent', () => {
  let component: CodeAnalyzerComponent;
  let fixture: ComponentFixture<CodeAnalyzerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeAnalyzerComponent]
    });
    fixture = TestBed.createComponent(CodeAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
