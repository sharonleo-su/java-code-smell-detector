// code-analyser.component.ts
import { Component } from '@angular/core';
import { CodeAnalyzerService } from '../code-analyzer.service';

@Component({
  selector: 'app-code-analyser',
  templateUrl: './code-analyser.component.html',
  styleUrls: ['./code-analyser.component.css']
})
export class CodeAnalyserComponent {
  constructor(private codeAnalyserService: CodeAnalyzerService) {}

  // Example usage
  analyzeCodeSnippet(code: string): void {
    const hasCodeSmells = this.codeAnalyserService.detectLongFunctions(code);

    if (hasCodeSmells) {
      console.log('Long functions detected!');
      // Perform additional actions or display messages
    } else {
      console.log('Code is clean!');
    }
  }
}
