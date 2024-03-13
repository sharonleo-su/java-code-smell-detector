import { Component } from '@angular/core';
import { CodeAnalyzerService, FunctionsReport } from '../code-analyzer.service';
import { DuplicateFinderService } from '../duplicate-finder.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codeSmellDetected = false;
  codeAnalysed: boolean = false;
  selectedFile: File | null = null;
  fileContent: string = '';
  longFunctionReports: FunctionsReport[] = [];
  longParameterReports: FunctionsReport[] = [];
  duplicateMethodsAndFunctions: FunctionsReport[][] = [];

  constructor(private codeAnalyzerService: CodeAnalyzerService, 
              private duplicateFinderService: DuplicateFinderService,
              private sanitizer: DomSanitizer,
              private router: Router
    ) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files || event.srcElement.files;
    this.selectedFile = files.item(0);
  }

  getCodeLines(): string[] {
    return this.fileContent.trim().split('\n');
  }


  analyzeCode(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        this.fileContent = e.target?.result as string;
        const longFunctionReports = this.analyzeCodeForLongFunctions(this.fileContent);
        const longParameterReports = this.analyzeCodeForLongParameters(this.fileContent);
        this.updateAnalysisResults(longFunctionReports, longParameterReports);
      };

      fileReader.readAsText(this.selectedFile);
    }
    this.codeAnalysed = true;
  }

  private analyzeCodeForLongFunctions(fileContent: string): FunctionsReport[] {
    return this.codeAnalyzerService.filterLongFunctions(fileContent);
  }

  private analyzeCodeForLongParameters(fileContent: string): FunctionsReport[] {
    return this.codeAnalyzerService.filterLongParameters(fileContent);
  }

  private updateAnalysisResults(longFunctionReports: FunctionsReport[], longParameterReports: FunctionsReport[]): void {
    this.longFunctionReports = longFunctionReports;
    this.longParameterReports = longParameterReports;
    this.codeSmellDetected = this.longFunctionReports.length > 0 || this.longParameterReports.length > 0;
  }

  findDuplicateMethodsAndFunctions(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();
  
      fileReader.onload = (e) => {
        this.fileContent = e.target?.result as string;
        this.duplicateMethodsAndFunctions = this.duplicateFinderService.findDuplicates(this.fileContent);
  
        this.router.navigate(['/duplicate-finder'], { queryParams: { duplicates: JSON.stringify(this.duplicateMethodsAndFunctions) } });
      };
  
      fileReader.readAsText(this.selectedFile);
    }
  }  

  isLineHighlighted(lineIndex: number): boolean {
    const isLongFunction = this.longFunctionReports.some(
      (report) => report.lineNumbers.includes(lineIndex + 1) 
    );

    const isLongParameter = this.longParameterReports.some(
      (report) => report.lineNumbers.includes(lineIndex + 1)
    );

    return isLongFunction || isLongParameter;
  }


  highlightCode(): (string | { line: string, isHighlighted: boolean })[] {
    const codeLines = this.getCodeLines();
    const highlightedLines: (string | { line: string, isHighlighted: boolean })[] = [];
  
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i];
      const isHighlighted = this.isLineHighlighted(i);
  
      if (isHighlighted) {
        highlightedLines.push({line, isHighlighted});
      } else {
        highlightedLines.push(line);
      }
    }
  
    return highlightedLines;
  }
  
  isLineObject(line: string | { line: string, isHighlighted: boolean }): line is { line: string, isHighlighted: boolean } {
    return typeof line === 'object';
  }
  
  
}
