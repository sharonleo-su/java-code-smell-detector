// duplicate-finder.component.ts
import { Component, Input } from '@angular/core';
import { FunctionsReport } from '../code-analyzer.service';

@Component({
  selector: 'app-duplicate-finder',
  templateUrl: './duplicate-finder.component.html',
  styleUrls: ['./duplicate-finder.component.css']
})
export class DuplicateFinderComponent {
  @Input() duplicateMethodsAndFunctions: FunctionsReport[] = [];
}
