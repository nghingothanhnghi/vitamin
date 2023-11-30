import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { OpenOrderInfoUtil } from '@app/common/util/open-order-info-page.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OrderMileageInquiryModel } from '@app/models/myoffice/order/order-mileage-inquiry.model';
import { getOrderMileageInquirySearchItems, getOrderMileageInquirySumItem, getOrderMileageInquiryTotalItem, OrderMileageInquiryState } from '@app/selectors/myoffice/order/order-mileage-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'order-mileage-inquiry-grid',
  templateUrl: './order-mileage-inquiry-grid.component.html',
  styleUrls: ['./order-mileage-inquiry-grid.component.css']
})
export class OrderMileageInquiryGridComponent implements OnInit, OnChanges {

  @Input()
  page: number = 0;

  @Input()
  len: number = 10;

  @Output()
  changeLen = new EventEmitter<SelectDropdownModel>();
  
  @Output()
  changePage = new EventEmitter<number>();

  @Output()
  resetReload = new EventEmitter<boolean>();

  totalItems: number = 0;

  items$ = new Observable<OrderMileageInquiryModel[]>;
  total$ = new Observable<Number>;
  sum$ = new Observable<OrderMileageInquiryModel>;

  items: OrderMileageInquiryModel[] = [];
  options: SelectDropdownModel[] = LenConstant.listLen;

  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  totalCols: number = 5;
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  config: PaginationInstance = {
    id: 'order-mileage-inquiry-grid',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }

  constructor(
    private _orderMileageInquiryStore: Store<OrderMileageInquiryState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.items$ = this._orderMileageInquiryStore.select(getOrderMileageInquirySearchItems);
    this.total$ = this._orderMileageInquiryStore.select(getOrderMileageInquiryTotalItem);
    this.sum$ = this._orderMileageInquiryStore.select(getOrderMileageInquirySumItem);
  }

  ngOnInit(): void {
    this.selectedValue = this.options[0];
    
    this.items$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }

      this.setBlankRow();
      this.resetReload.emit(false);
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.total$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
  }

  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    this.changeLen.emit(selected);
  }

  handleOnChangePage(page: number): void {
    this.changePage.emit(page);
  }

  handleOnClickOrderNo(orderNo: String): void {
    OpenOrderInfoUtil.openOrderInfoPage(orderNo);
  }

  setBlankRow() {
    this.totalRows = this.items.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.cols = new Array(this.totalCols);
  }
}
