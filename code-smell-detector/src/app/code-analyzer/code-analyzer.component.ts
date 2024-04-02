import { Component } from '@angular/core';
import { CodeAnalyzerService } from '../code-analyzer.service';

@Component({
  selector: 'app-code-analyzer',
  templateUrl: './code-analyzer.component.html',
  styleUrls: ['./code-analyzer.component.css']
})
export class CodeAnalyzerComponent {
  constructor(private codeAnalyzerService: CodeAnalyzerService) {}

  // Example usage
  analyzeCodeSnippet(code: string): void {
    const hasCodeSmells = this.codeAnalyzerService.detectFunctions(code);

    if (hasCodeSmells) {
      console.log('Long functions detected!');
      // Perform additional actions or display messages
    } else {
      console.log('Code is clean!');
    }
  }
}
