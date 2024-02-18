import { Component } from '@angular/core';
import { CodeAnalyzerService } from '../code-analyzer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codeSmellDetected = false;
  selectedFile: File | null = null;  // Variable to store the selected file

  constructor(private codeAnalyzerService: CodeAnalyzerService) {}  // Inject the CodeAnalyzerService

  onFileSelected(event: any): void {
    const files: FileList = event.target.files || event.srcElement.files;
    this.selectedFile = files.item(0);
  }

  analyzeCode(): void {
    // Implement code analysis logic using this.selectedFile
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = e.target?.result as string;
        
        // Call the code analyzer service here
        const hasCodeSmells = this.codeAnalyzerService.detectLongFunctions(fileContent);

        // Update codeSmellDetected based on the analysis result
        this.codeSmellDetected = hasCodeSmells;
      };
      fileReader.readAsText(this.selectedFile);
    }
  }
}
