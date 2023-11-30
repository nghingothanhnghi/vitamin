import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ConvertUtil } from '@app/common/util/convert.util';
import { QuickSearchUtil } from '@app/common/util/quick-search.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { DateModel } from '@app/models/components/date.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';

@Component({
  selector: 'date-time-filter',
  templateUrl: './date-time-filter.component.html',
  styleUrls: ['./date-time-filter.component.css']
})
export class DateTimeFilterComponent implements OnInit {

  @Input()
  yearOptions: SelectDropdownModel[] = [];

  @Input()
  hiddenDate: boolean = false;

  @Input()
  hiddenToDate: boolean = false;

  @Input()
  hiddenBtn: boolean = true;

  @Input()
  screen: String = "";
  
  @Input()
  labelDate: String = "가입일자";

  @Input()
  hiddenImageSvg: boolean = false; 
  
  @Output()
  changeDateTimeFilter = new EventEmitter<DateFilterModel>;
  
  now: Date = new Date();
  endDateOfMonth: Date = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0);
  dateFilter: DateFilterModel = new DateFilterModel();

  stringYear: string = "년";
  stringMonth: string = "월";
  stringDate: string = "일";

  fromYear: SelectDropdownModel = new SelectDropdownModel();
  fromMonth: SelectDropdownModel = new SelectDropdownModel();
  fromDate: SelectDropdownModel = new SelectDropdownModel();

  toYear: SelectDropdownModel = new SelectDropdownModel();
  toMonth: SelectDropdownModel = new SelectDropdownModel();
  toDate: SelectDropdownModel = new SelectDropdownModel();

  isCheckClickAll : boolean = false;

  readonly BTN_NONE_ACTIVED:number = -1;
  readonly BTN_THIS_MONTH_ACTIVED:number = 0;
  readonly BTN_LAST_MONTH_ACTIVED:number = 1;
  readonly BTN_LAST_3MONTH_ACTIVED:number = 2;
  readonly BTN_THIS_YEAR_ACTIVED:number = 3;
  readonly BTN_LAST_YEAR_ACTIVED:number = 4;
  readonly BTN_ALL_ACTIVED:number = 5;

  btnFilterIsActive:number = this.BTN_NONE_ACTIVED;

  constructor() { }

  ngOnInit(): void {
    const y = this.now.getFullYear();
    const m = this.now.getMonth() + 1;
    const d = this.now.getDate();
    
    this.fromYear = this.getSelectDropdown(y, y, this.stringYear);
    this.fromMonth = this.getSelectDropdown(m, m, this.stringMonth);
    this.fromDate = this.getSelectDropdown("01", "01", this.stringDate);

    this.toYear = this.getSelectDropdown(y, y, this.stringYear);
    this.toMonth = this.getSelectDropdown(m, m, this.stringMonth);
    this.toDate = this.getSelectDropdown(d, d, this.stringDate);

    this.handleOnChangeDateFilter();

  }

  hanldeOnGetFromDateSelectedValue(value: DateModel): void {
    this.fromYear = value.year;
    this.fromMonth = value.month;
    this.fromDate = value.date;
    if (this.isTodateLessThanFromdate()) {
      this.toYear = this.fromYear
      this.toMonth = this.fromMonth
      this.toDate = this.fromDate
    }
    this.handleOnChangeDateFilter();
  }

  isTodateLessThanFromdate(){
    if(this.fromYear.value && this.fromYear.value.length>0){
      var frDate = Date.parse(`${this.fromYear.value}-${this.fromMonth.value}-${this.fromDate.value}`);
      var toDate = Date.parse(`${this.toYear.value}-${this.toMonth.value}-${this.toDate.value}`);
      return toDate < frDate
    }
    return false

  }
  hanldeOnGetToDateSelectedValue(value: DateModel): void {
    this.toYear = value.year;
    this.toMonth = value.month;
    this.toDate = value.date;
    if (this.isTodateLessThanFromdate()) {
      this.fromYear = this.toYear 
      this.fromMonth = this.toMonth 
      this.fromDate = this.toDate
    }
    this.handleOnChangeDateFilter();
  }

  // handle event quick search
  handleOnClickThisMonth(): void {
    this.btnFilterIsActive = this.BTN_THIS_MONTH_ACTIVED
    this.dateFilter = QuickSearchUtil.searchThisMonth(this.stringYear, this.stringMonth, this.stringDate);
    this.convertDataFromDateFilter(this.dateFilter);
  }

  handleOnClickLastMonth(): void {
    this.btnFilterIsActive = this.BTN_LAST_MONTH_ACTIVED
    this.dateFilter = QuickSearchUtil.searchLastMonth(this.stringYear, this.stringMonth, this.stringDate);
    this.convertDataFromDateFilter(this.dateFilter);
  }

  handleOnClickLast3Months(): void {
    this.btnFilterIsActive = this.BTN_LAST_3MONTH_ACTIVED
    this.dateFilter = QuickSearchUtil.searchLast3Months(this.stringYear, this.stringMonth, this.stringDate);
    this.convertDataFromDateFilter(this.dateFilter);
  }

  handleOnClickThisYear(): void {
    this.btnFilterIsActive = this.BTN_THIS_YEAR_ACTIVED
    this.dateFilter = QuickSearchUtil.searchThisYear(this.stringYear, this.stringMonth, this.stringDate);
    this.convertDataFromDateFilter(this.dateFilter);
  }

  handleOnClickLastYear():void{
    this.btnFilterIsActive = this.BTN_LAST_YEAR_ACTIVED
    this.dateFilter = QuickSearchUtil.searchLastYear(this.stringYear, this.stringMonth, this.stringDate);
    this.convertDataFromDateFilter(this.dateFilter);
  }
  handleOnClickAll() {
    this.btnFilterIsActive = this.BTN_ALL_ACTIVED
    if(this.screen != 'benefit-sponsorship-details') {
      this.isCheckClickAll = false;
      this.dateFilter = QuickSearchUtil.searchAll(this.yearOptions, this.stringYear, this.stringMonth, this.stringDate);
      this.convertDataFromDateFilter(this.dateFilter);
    } else {
      this.isCheckClickAll = true;
      this.dateFilter = QuickSearchUtil.setTimeToEmpty();
      this.convertDataFromDateFilter(this.dateFilter);
    }

    
  }

  getSelectDropdown(value: String | Number, label: String | Number, unit: any): SelectDropdownModel {
    return {
      value: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(value)),
      label: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(label)) + ConvertUtil.convertToSring(unit),
    }
  }

  convertDataFromDateFilter(filter: DateFilterModel): void {
    if (ValidationUtil.isNotNullAndNotEmpty(filter)) {
      this.fromYear = filter.fromDate.year;
      this.fromMonth = filter.fromDate.month;
      this.fromDate = filter.fromDate.date;

      this.toYear = filter.toDate.year;
      this.toMonth = filter.toDate.month;
      this.toDate = filter.toDate.date;

      this.handleOnChangeDateFilter();
    }
  }

  handleOnChangeDateFilter(): void {
    this.changeDateTimeFilter.emit({ 
      fromDate: {
        year: this.fromYear,
        month: this.fromMonth,
        date: this.fromDate,
      },
      toDate: {
        year: this.toYear,
        month: this.toMonth,
        date: this.toDate,
      },
    });
  }
}
