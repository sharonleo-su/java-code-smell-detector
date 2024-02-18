import { Injectable } from '@angular/core';
import * as ts from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class CodeAnalyzerService {
  constructor() {}

  detectLongFunctions(code: string): boolean {
    const ast: ts.SourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true);

    let longFunctionDetected = false;

    function visit(node: ts.Node): void {
      if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)) {
        const startLine = ast.getLineAndCharacterOfPosition(node.getStart()).line + 1;
        const endLine = ast.getLineAndCharacterOfPosition(node.getEnd()).line + 1;

        const linesWithinFunction = code.split('\n').slice(startLine - 1, endLine).filter((line) => line.trim() !== '');

        if (linesWithinFunction.length > 15) {
          longFunctionDetected = true;
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(ast);

    return longFunctionDetected;
  }
}
