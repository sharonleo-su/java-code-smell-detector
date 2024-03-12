// duplicate-finder.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsReport } from '../code-analyzer.service';
import { DuplicateFinderService } from '../duplicate-finder.service';

@Component({
  selector: 'app-duplicate-finder',
  templateUrl: './duplicate-finder.component.html',
  styleUrls: ['./duplicate-finder.component.css']
})
export class DuplicateFinderComponent implements OnInit {
  duplicateMethodsAndFunctions: FunctionsReport[][] = [];
  duplicatesDetected: boolean = false;
  fileContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private duplicateFinderService: DuplicateFinderService
  ) {}

  ngOnInit(): void {
    // Retrieve duplicates array from the query parameters
    this.fileContent = this.duplicateFinderService.getFileContent();
    this.route.queryParams.subscribe(params => {
      this.duplicateMethodsAndFunctions = JSON.parse(params['duplicates'] || '[]');
    });
    if (this.duplicateMethodsAndFunctions.length > 0) {
      this.duplicatesDetected = true;
    }
  }

  getGroupClass(index: number): string {
    // You can define your own logic for generating class names based on the index
    // For example, using a predefined list of colors
    const colors = ['group-color-1', 'group-color-2', 'group-color-3'];
    return colors[index % colors.length];
  }

  getCodeLines(): string[] {
    return this.fileContent.trim().split('\n');
  }

  highlightCode(): (string | { line: string; isHighlighted: boolean })[] {
    const codeLines = this.getCodeLines();
    const highlightedLines: (string | { line: string; isHighlighted: boolean })[] = [];
  
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i];
      const isHighlighted = this.isLineHighlighted(i);
  
      if (isHighlighted) {
        highlightedLines.push({ line, isHighlighted });
      } else {
        highlightedLines.push(line);
      }
    }
  
    return highlightedLines;
  }
  
  isLineHighlighted(lineIndex: number): boolean {
    const isDuplicate = this.duplicateMethodsAndFunctions.some(
      (report) => report.some(({ lineNumbers }) => lineNumbers.includes(lineIndex + 1))
    );
  
    return isDuplicate;
  }

  isLineObject(line: string | { line: string; isHighlighted: boolean }): line is { line: string; isHighlighted: boolean } {
    return typeof line === 'object' && 'line' in line && 'isHighlighted' in line;
  }

}
