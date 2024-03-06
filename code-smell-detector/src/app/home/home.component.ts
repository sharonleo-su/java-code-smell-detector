import { Component } from '@angular/core';
import { CodeAnalyzerService, FunctionsReport } from '../code-analyzer.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  constructor(private codeAnalyzerService: CodeAnalyzerService, private sanitizer: DomSanitizer) {}

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

  isLineHighlighted(lineIndex: number): boolean {
    const isLongFunction = this.longFunctionReports.some(
      (report) => report.lineNumbers.includes(lineIndex + 1) // line numbers are 1-based
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
        highlightedLines.push({ line, isHighlighted });
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
