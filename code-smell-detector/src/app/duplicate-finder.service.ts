// duplicate-finder.service.ts

import { Injectable } from '@angular/core';
import { CodeAnalyzerService, FunctionsReport } from './code-analyzer.service';

@Injectable({
  providedIn: 'root',
})
export class DuplicateFinderService {

  private fileContent: string = '';
  private refactoredFileContent: string = '';

  constructor(private codeAnalyzerService: CodeAnalyzerService) {
  }

  setFileContent(content: string): void {
    this.fileContent = content;
  }

  getFileContent(): string {
    return this.fileContent;
  }

  private getCodeContent(func: FunctionsReport, fileContent: string): string {
    const codeLines = this.getCodeLines(fileContent).slice(Math.min(...func.lineNumbers) - 1, Math.max(...func.lineNumbers));
    return codeLines.join('\n');
  }

  public findDuplicates(fileContent: string, threshold: number = 0.75): FunctionsReport[][] {
    const groups: FunctionsReport[][] = this.findGroups(fileContent, threshold);
    const duplicates: FunctionsReport[][] = groups.filter(group => group.length > 1);

    console.log(duplicates);

    return duplicates;
  }

  public findGroups(fileContent: string, threshold: number = 0.75): FunctionsReport[][] {
    this.setFileContent(fileContent);
    const report: FunctionsReport[] = this.codeAnalyzerService.detectFunctions(this.fileContent);
    const groups: FunctionsReport[][] = [];

    for (let i = 0; i < report.length; i++) {
      const currentFunction = report[i];
      let foundGroup = false;

      for (const group of groups) {
        // Check if the current function is similar to any function in the group
        const similarity = group.some(groupFunc => this.calculateFunctionSimilarity(currentFunction, groupFunc) >= threshold);

        if (similarity) {
          group.push(currentFunction);
          foundGroup = true;
          break;
        }
      }

      if (!foundGroup) {
        // Create a new group for the current function
        groups.push([currentFunction]);
      }
    }

    console.log(groups);

    return groups;
  }

  private calculateFunctionSimilarity(func1: FunctionsReport, func2: FunctionsReport): number {
    const nameSimilarity = this.calculateStringSimilarity(func1.functionName, func2.functionName);
    const parameterSimilarity = this.calculateArraySimilarity(func1.parameters, func2.parameters);
    const codeSimilarity = this.calculateStringSimilarity(
      this.getCodeContent(func1, this.fileContent),
      this.getCodeContent(func2, this.fileContent)
    );

    const overallSimilarity = (nameSimilarity + parameterSimilarity + codeSimilarity) / 3;

    return overallSimilarity;
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    const set1 = new Set(str1.split(''));
    const set2 = new Set(str2.split(''));

    const intersection = Array.from(set1).filter((char) => set2.has(char));
    const union = Array.from(new Set([...set1, ...set2]));

    return intersection.length / union.length;
  }

  private calculateArraySimilarity(arr1: string[], arr2: string[]): number {
    const intersection = arr1.filter(value => arr2.includes(value));
    const union = [...new Set([...arr1, ...arr2])];
    return intersection.length / union.length;
  }

  private getCodeLines(code: string): string[] {
    return code.trim().split('\n');
  }

  public refactorCodeWithDuplicates(duplicateGroups: FunctionsReport[][]): string {
    const retainedFunctions: FunctionsReport[] = duplicateGroups.map(group => group[0]);
    this.refactoredFileContent = this.removeRedundantFunctions(duplicateGroups);

    // Replace function calls to deleted functions with calls to the retained function for each group
    for (const group of duplicateGroups) {
      this.replaceFunctionCalls(group);
    }

    console.log(this.refactoredFileContent); // You can log or return the updated content as needed

    return this.refactoredFileContent;
  }

  private removeRedundantFunctions(duplicateGroups: FunctionsReport[][]): string {
    const linesToRemove: Set<number> = new Set();
  
    for (const group of duplicateGroups) {
      for (let i = 1; i < group.length; i++) {
        const func = group[i];
        func.lineNumbers.forEach(lineNumber => linesToRemove.add(lineNumber));
      }
    }
  
    const codeLines: string[] = this.getCodeLines(this.fileContent);
    const updatedCodeLines: string[] = codeLines.filter((_, index) => !linesToRemove.has(index + 1));
  
    return updatedCodeLines.join('\n');
  }

  private replaceFunctionCalls(group: FunctionsReport[]): void {
    const retainedFunctionName = group[0].functionName;
    const codeLines: string[] = this.getCodeLines(this.refactoredFileContent);

    for (let i = 0; i < codeLines.length; i++) {
      let line = codeLines[i];
      const functionNameRegex = new RegExp(`\\b(${group.map(func => func.functionName).join('|')})\\b`, 'g');
      line = line.replace(functionNameRegex, retainedFunctionName);
      codeLines[i] = line;
    }

    this.refactoredFileContent = codeLines.join('\n');
  }
}
