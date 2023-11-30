import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'date-time-filter-mobile',
  templateUrl: './date-time-filter-mobile.component.html',
  styleUrls: ['./date-time-filter-mobile.component.css']
})
export class DateTimeFilterMobileComponent implements OnInit {

  @Input()
  screen: String = "";

  now = new Date();
  year = "";
 
  @Input()
  hiddenbtn:boolean=true;
  constructor() { }

  ngOnInit(): void {
    this.year = ConvertUtil.convertToSring(this.now.getFullYear());
  }

  handleOnClickThisMonth(): void {
    let selector = document.getElementById("qs-this-month");
    if (selector !== null) {
      selector.click();
    }
  }

  handleOnClickLastMonth(): void {
    let selector = document.getElementById("qs-last-month");
    if (selector !== null) {
      selector.click();
    }
  }

  handleOnClickLast3Months(): void {
    let selector = document.getElementById("qs-last-3-months");
    if (selector !== null) {
      selector.click();
    }
  }

  handleOnClickThisYear(): void {
    let selector = document.getElementById("qs-this-year");
    if (selector !== null) {
      selector.click();
    }
  }
  handleOnClickLastYear(): void {
    let selector = document.getElementById("qs-last-year");
    if (selector !== null) {
      selector.click();
    }
  }

  handleOnClickAll() {
    let selector = document.getElementById("qs-all");
    if (selector !== null) {
      selector.click();
    }
  }
}
