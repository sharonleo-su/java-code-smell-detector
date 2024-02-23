import { Component } from '@angular/core';
import { CodeAnalyzerService, FunctionsReport } from '../code-analyzer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codeSmellDetected = false;
  codeAnalysed: boolean = false;
  selectedFile: File | null = null;
  longFunctionReports: FunctionsReport[] = [];
  longParameterReports: FunctionsReport[] = [];

  constructor(private codeAnalyzerService: CodeAnalyzerService) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files || event.srcElement.files;
    this.selectedFile = files.item(0);
  }

  analyzeCode(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const fileContent = e.target?.result as string;
        const longFunctionReports = this.analyzeCodeForLongFunctions(fileContent);
        const longParameterReports = this.analyzeCodeForLongParameters(fileContent);
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
}
