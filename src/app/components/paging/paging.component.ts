import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { LenConstant } from '@app/common/constant/len.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges {

  @Input()
  page: number = 1;

  @Input()
  len: number = 10;

  @Input()
  totalItems: number = 0;

  @Input()
  config: PaginationInstance = {} as PaginationInstance;

  @Input()
  turnOnLenOptions : boolean = false;

  @Input()
  turnOnPagination : boolean = false;

  @Input()
  turnOnTotalItem : boolean = false;

  @Input()
  isMobile : boolean = false;

  @Input()
  pdtLen : boolean = false;

  @Output()
  changePage = new EventEmitter<number>();

  @Output()
  changeLen = new EventEmitter<SelectDropdownModel>();

  @Output()
  totalPage = new EventEmitter<number>();

  displaySize: number = 5;
  maxSize: number = 0;
  centerIndex: number = 0;
  totalPages: number = 0;

  options: SelectDropdownModel[] = [...LenConstant.listLen];
  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  constructor() { }

  ngOnInit(): void {
    if (this.displaySize < 5) {
      this.displaySize = 5
    }
    this.maxSize = this.displaySize + 2;
    this.centerIndex = Math.ceil(this.displaySize / 2);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let cPage = changes["page"]
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.len;
    this.config.totalItems = this.totalItems;
    let temp = 1;
    if (this.totalItems > 0) {
      temp = (this.totalItems / this.len) | 0;
    }
    if(this.config.currentPage > temp+1 || this.totalItems == this.len||
      ValidationUtil.isNullOrEmpty(cPage)){
        setTimeout(() => {
          this.changePage.emit(1);
          this.config.currentPage = 1
        }, 0);
    }
    if (this.totalItems % this.len > 0) {
      temp += 1;
    }
    this.totalPages = temp;
    this.totalPage.emit(temp);

    if(this.pdtLen) {
      this.options = [...LenConstant.listPdtLen];
    }

    let option = this.options.filter(v => Number(v.label) == this.len)[0];
    if(ValidationUtil.isNullOrEmpty(option)) {
      this.options.splice(0, this.options.length);
      this.options.push({label : ConvertUtil.convertToString(this.len), value : ConvertUtil.convertToString(this.len)});

      if(this.pdtLen) {
        LenConstant.listPdtLen.forEach(v => this.options.push(v));
      } else {
        LenConstant.listLen.forEach(v => this.options.push(v));
      }
    }
    this.selectedValue = this.options[0];
  }

  handleOnChangePage(page: number): void {
    this.changePage.emit(page);
  }

  handleOnChangeLen(selected: SelectDropdownModel): void {
    this.changeLen.emit(selected);
  }
}
