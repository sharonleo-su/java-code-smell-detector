import { Component } from '@angular/core';
import { CodeAnalyzerService, LongFunctionReport } from '../code-analyzer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codeSmellDetected = false;
  codeAnalysed: boolean = false;
  selectedFile: File | null = null;
  longFunctionReports: LongFunctionReport[] = [];

  constructor(private codeAnalyzerService: CodeAnalyzerService) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files || event.srcElement.files;
    this.selectedFile = files.item(0);
  }

  analyzeCode(): void {
    console.log('Button clicked!');

    if (this.selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const fileContent = e.target?.result as string;

        console.log('File Content:', fileContent);

        try {
          const longFunctionReports = this.codeAnalyzerService.detectLongFunctions(fileContent);
          console.log('Long Functions Report:', longFunctionReports);

          this.longFunctionReports = longFunctionReports; // Update the component property
          this.codeSmellDetected = this.longFunctionReports.length > 0;
          console.log('Code Smell Detected:', this.codeSmellDetected);
        } catch (error) {
          console.error('Error analyzing code:', error);
        }
      };

      fileReader.readAsText(this.selectedFile);
    }
    this.codeAnalysed = true;
  }
}
