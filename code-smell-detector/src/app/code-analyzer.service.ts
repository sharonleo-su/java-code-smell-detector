import { Injectable } from '@angular/core';
import * as ts from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class CodeAnalyzerService {

  detectFunctions(code: string): FunctionsReport[] {
    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true);
    const report: FunctionsReport[] = [];

    function countNonBlankLines(node: ts.Node): number {
      const startLine = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line;
      const endLine = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;

      let nonBlankLines = 0;
      for (let line = startLine; line <= endLine; line++) {
        const text = sourceFile.text.split('\n')[line].trim();
        if (text !== '') {
          nonBlankLines++;
        }
      }

      return nonBlankLines;
    }

    function getFunctionParameters(node: ts.FunctionDeclaration | ts.MethodDeclaration): string[] {
      const parameters: string[] = [];

      if (node.parameters) {
        for (const param of node.parameters) {
          parameters.push(param.name.getText());
        }
      }

      return parameters;
    }

    function visit(node: ts.Node) {
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        const functionName = node.name?.getText();
        const linesOfCode = countNonBlankLines(node);
        const parameters = getFunctionParameters(node);
        const lineNumbers = getLineNumbers(node);
    
        if (functionName) {
          const functionData: FunctionsReport = {
            functionName,
            linesOfCode,
            parameters,
            lineNumbers,
          };
          report.push(functionData);
        }
      }
    
      ts.forEachChild(node, visit);
    }
    
    // Add this function to retrieve line numbers for a given node
    function getLineNumbers(node: ts.Node): number[] {
      const startLine = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1; // Line numbers are 1-based
      const endLine = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
      const lineNumbers = [];
    
      for (let line = startLine; line <= endLine; line++) {
        lineNumbers.push(line);
      }
    
      return lineNumbers;
    }
    
    visit(sourceFile);

    return report;
  }

  filterLongFunctions(code: string, threshold: number = 15): FunctionsReport[] {
    const report: FunctionsReport[] = this.detectFunctions(code);
    const longFunctionsReport: FunctionsReport[] = report.filter((functionData) => functionData.linesOfCode > threshold);
    return longFunctionsReport;
  }
  filterLongParameters(code: string, threshold: number = 3) : FunctionsReport[] {
    const report : FunctionsReport[] = this.detectFunctions(code);
    const longParametersReport: FunctionsReport[] = report.filter((functionData) => functionData.parameters.length > threshold);
    return longParametersReport;
  }
}

export interface FunctionsReport {
  functionName: string;
  linesOfCode: number;
  parameters: string[];
  lineNumbers: number[];
}
