import { Component } from '@angular/core';

@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.css'],
})
export class GuiComponent {
  codeSmellDetected = false;

  onFileSelected(event: any): void {
    // Implement file selection logic
  }

  analyzeCode(): void {
    // Implement code analysis logic
  }
}
