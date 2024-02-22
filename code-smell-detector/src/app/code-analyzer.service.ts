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

    function visit(node: ts.Node) {
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        const functionName = node.name?.getText();
        const linesOfCode = countNonBlankLines(node);

        if (functionName) {
          const functionData: FunctionsReport = {
            functionName,
            linesOfCode,
          };
          report.push(functionData);
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    return report;
  }

  filterLongFunctions(code: string, threshold: number = 15): FunctionsReport[] {
    const report: FunctionsReport[] = this.detectFunctions(code);
    const longFunctionsReport: FunctionsReport[] = report.filter((functionData) => functionData.linesOfCode > threshold);
    return longFunctionsReport;
  }
}

export interface FunctionsReport {
  functionName: string;
  linesOfCode: number;
}
