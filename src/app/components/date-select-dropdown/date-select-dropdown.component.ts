import {  ElementRef, HostListener, Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateModel } from '@app/models/components/date.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';

@Component({
  selector: 'date-select-dropdown',
  templateUrl: './date-select-dropdown.component.html',
  styleUrls: ['./date-select-dropdown.component.css',
  './../../../assets/css/modules.css']
})
export class DateSelectDropdownComponent implements OnInit, OnChanges {
 
  @Input()
  yearOptions: SelectDropdownModel[] = [];

  @Input()
  year: SelectDropdownModel = new SelectDropdownModel();

  @Input()
  month: SelectDropdownModel = new SelectDropdownModel();

  @Input()
  date: SelectDropdownModel = new SelectDropdownModel();
  
  @Input()
  stringYear: String = "년";

  @Input()
  stringMonth: String = "월";

  @Input()
  stringDate: String = "일";

  @Input()
  hiddenDate: boolean = false;

  @Input()
  screen: String = "";

  @Input()
  isCheckClickAll: boolean = false;

  @Output()
  selectedValue = new EventEmitter<DateModel>();
  
  todate: Date = new Date();
  
  selectedYear: SelectDropdownModel = new SelectDropdownModel();
  selectedMonth: SelectDropdownModel = new SelectDropdownModel();
  selectedDate: SelectDropdownModel = new SelectDropdownModel();

  showYearOptions: Boolean = false;
  showMonthOptions: Boolean = false;
  showDateOptions: Boolean = false;

  monthOptions: SelectDropdownModel[] = [
    { label: "01" + this.stringMonth, value: "01" },
    { label: "02" + this.stringMonth, value: "02" },
    { label: "03" + this.stringMonth, value: "03" },
    { label: "04" + this.stringMonth, value: "04" },
    { label: "05" + this.stringMonth, value: "05" },
    { label: "06" + this.stringMonth, value: "06" },
    { label: "07" + this.stringMonth, value: "07" },
    { label: "08" + this.stringMonth, value: "08" },
    { label: "09" + this.stringMonth, value: "09" },
    { label: "10" + this.stringMonth, value: "10" },
    { label: "11" + this.stringMonth, value: "11" },
    { label: "12" + this.stringMonth, value: "12" },
  ];

  dateOptions: SelectDropdownModel[] = [];
  
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event:any): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
       this.showYearOptions = false;
       this.showMonthOptions = false;
       this.showDateOptions = false;
     }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // set selected value
    let initYear = this.year;
    let initMonth = this.month;
    let initDate = this.date;
    
    if (this.screen != 'benefit-sponsorship-details' &&(ValidationUtil.isNullOrEmpty(this.year.value) ||
      ValidationUtil.isNullOrEmpty(this.month.value) ||
      ValidationUtil.isNullOrEmpty(this.date.value))) {
      const y = this.todate.getFullYear();
      const m = this.todate.getMonth() + 1;
      const d = this.todate.getDate();

      initYear = {
        value: ConvertUtil.convertToSring(y),
        label: ConvertUtil.convertToSring(y) + this.stringYear,
      };
      initMonth = {
        value: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(m)),
        label: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(m)) + this.stringMonth,
      }
      initDate = {
        value: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(d)),
        label: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(d)) + this.stringDate,
      }
    }

    this.selectedYear = initYear;
    this.selectedMonth = initMonth;
    this.selectedDate = initDate;

    if(this.isCheckClickAll === false) {
      this.setDateOptions(this.selectedYear.value, this.selectedMonth.value);
    }
  }

  setDateOptions(year: String | Number, month: String | Number): void {
    if (ValidationUtil.isNullOrEmpty(month)) return;
    if (ValidationUtil.isNullOrEmpty(year)) return;

    const endDate = new Date(+year, +month, 0);
    const length = endDate.getUTCDate();
    
    let options = [];
    for (let i = 0; i < length + 1; i++) {
      options.push({
        label: ConvertUtil.convertToZeroDecimal(i + 1) + this.stringDate,
        value: ConvertUtil.convertToZeroDecimal(i + 1)
      });
    }

    this.dateOptions = options;
  }

  setSelectedDate(value: String, options: SelectDropdownModel[]): void {
    if (ValidationUtil.isNullOrEmpty(value)) this.selectedDate = { value: "01", label: "01" + this.stringDate }
    if (ValidationUtil.isNullOrEmpty(options)) this.selectedDate = { value: "", label: "" }

    value = value.replace(ConvertUtil.convertToSring(this.stringDate), "");
    
    if (value > options[options.length - 1].value) {
      this.selectedDate = { value: "01", label: "01" + this.stringDate };
    } else {

      let label = "";

      if(ValidationUtil.isNotNullAndNotEmpty(value)) {
        label = ConvertUtil.convertToSring(value) + this.stringDate;
      }

      this.selectedDate = {
        value: ConvertUtil.convertToSring(value),
        label: label
      };
    }
  }

  closeAllDateSelectDropdown(): void {
    this.showYearOptions = false;
    this.showMonthOptions = false;
    this.showDateOptions = false;
  }

  // handle event click select dropdown
  handleOnClickYearSelectDropdown(): void {
    this.showMonthOptions = false;
    this.showDateOptions = false;
    this.showYearOptions = !this.showYearOptions;
  }
  
  handleOnClickMonthSelectDropdown(): void {
    this.showYearOptions = false;
    this.showDateOptions = false;
    this.showMonthOptions = !this.showMonthOptions;
  }

  handleOnClickDateSelectDropdown(): void {
    this.showYearOptions = false;
    this.showMonthOptions = false;
    this.showDateOptions = !this.showDateOptions;
  }

  // handle on click option
  handleOnClickYearOption(value: any): void {
    this.closeAllDateSelectDropdown();
    this.selectedYear = {
      value: ConvertUtil.convertToSring(value),
      label: ConvertUtil.convertToSring(value) + this.stringYear,
    }
    this.setDateOptions(this.selectedYear.value, this.selectedMonth.value);
    this.setSelectedDate(this.selectedDate.value, this.dateOptions);
    this.getSelectedValue();
  }

  handleOnClickMonthOption(value: any): void {
    this.closeAllDateSelectDropdown();
    this.selectedMonth = {
      value: ConvertUtil.convertToSring(value),
      label: ConvertUtil.convertToSring(value) + this.stringMonth,
    };
    this.setDateOptions(this.selectedYear.value, this.selectedMonth.value);
    this.setSelectedDate(this.selectedDate.value, this.dateOptions);
    this.getSelectedValue();
  }

  handleOnClickDateOption(value: any): void {
    this.closeAllDateSelectDropdown();
    this.selectedDate = {
      value: ConvertUtil.convertToSring(value),
      label: ConvertUtil.convertToSring(value) + this.stringDate,
    }
    this.getSelectedValue();
  }

  getSelectedValue(): void {
    this.selectedValue.emit({
      year: this.selectedYear,
      month: this.selectedMonth,
      date: this.selectedDate,
    });
  }
}
