// code-analyzer.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeAnalyzerService {
  // code-analyzer.service.ts

  detectLongFunctions(code: string, threshold: number = 20): LongFunctionReport[] {
    const longFunctionReports: LongFunctionReport[] = [];

    // Split the code into lines
    const lines = code.split('\n');

    // Variables to track the current function
    let currentFunctionName = '';
    let currentFunctionLines: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check if the line defines a new function or other statements
      const functionDeclarationMatch = trimmedLine.match(/^\s*(?:function\s+(\w+)\s*\(|(\w+)\s*[:]\s*function\s*\()/);
      if (functionDeclarationMatch) {
        // If we were processing a previous function, check its length
        if (currentFunctionName && currentFunctionLines.length > threshold) {
          const report: LongFunctionReport = {
            functionName: currentFunctionName,
            linesOfCode: currentFunctionLines.length,
          };
          longFunctionReports.push(report);
        }

        // Start processing a new function
        currentFunctionName = functionDeclarationMatch[1] || functionDeclarationMatch[2];
        currentFunctionLines = [trimmedLine];
      } else {
        // Continue processing the current function or other statements
        currentFunctionLines.push(trimmedLine);
      }
    }

    // Check the last function in case it wasn't followed by a new one
    if (currentFunctionName && currentFunctionLines.length > threshold) {
      const report: LongFunctionReport = {
        functionName: currentFunctionName,
        linesOfCode: currentFunctionLines.length,
      };
      longFunctionReports.push(report);
    }

    console.log(longFunctionReports); // Add this line for debugging

    return longFunctionReports;
  }

  
}

export interface LongFunctionReport {
  functionName: string;
  linesOfCode: number;
}
