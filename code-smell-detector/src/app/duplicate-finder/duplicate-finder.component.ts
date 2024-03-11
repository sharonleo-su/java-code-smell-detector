import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsReport } from '../code-analyzer.service';

@Component({
  selector: 'app-duplicate-finder',
  templateUrl: './duplicate-finder.component.html',
  styleUrls: ['./duplicate-finder.component.css']
})
export class DuplicateFinderComponent implements OnInit {
  duplicateMethodsAndFunctions: FunctionsReport[] = [];
  duplicatesDetected: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve duplicates array from the query parameters
    this.route.queryParams.subscribe(params => {
      this.duplicateMethodsAndFunctions = JSON.parse(params['duplicates'] || '[]');
    });
    if (this.duplicateMethodsAndFunctions.length > 0) {
      this.duplicatesDetected = true;
    }
  }
}
