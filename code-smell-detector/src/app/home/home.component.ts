import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codeSmellDetected = false;

  onFileSelected(event: any): void {
    // Implement file selection logic
  }

  analyzeCode(): void {
    // Implement code analysis logic
  }

}
