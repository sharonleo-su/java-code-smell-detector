import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeAnalyzerService {
  constructor() {}

  detectLongFunctions(code: string): boolean {
    // const lines = code.split('\n');
    // const longFunctions = lines.filter(line => line.trim().startsWith('function') && line.length > 15);

    // return longFunctions.length > 0;
    return false;
  }
}
