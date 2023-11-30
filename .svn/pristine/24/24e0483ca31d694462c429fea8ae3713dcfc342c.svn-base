import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'grid-no-data-mobile',
  templateUrl: './grid-no-data-mobile.component.html',
  styleUrls: ['./grid-no-data-mobile.component.css']
})
export class GridNoDataMobileComponent implements OnChanges {

  @Input()
  items: any[] = [];

  totalItems: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalItems = this.items.length;
  }
}
