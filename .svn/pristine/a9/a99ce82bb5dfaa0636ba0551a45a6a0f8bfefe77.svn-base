import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getOrderPayInfo, OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { OrderMoneyModel } from '@app/models/myoffice/order/order-money.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';

@Component({
  selector: 'order-money',
  templateUrl: './order-money.component.html',
  styleUrls: ['./order-money.component.css']
})
export class OrderMoneyComponent implements OnInit {

  orderMoneys$ = new Observable<OrderMoneyModel[]>;
  items: OrderMoneyModel[] = [];

  totalCols: number = 8;
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  constructor(
    private _orderDetailInquiryStore: Store<OrderDetailInquiryState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
  ) {
    this.orderMoneys$ = this._orderDetailInquiryStore.select(getOrderPayInfo);
  }

  ngOnInit(): void {
    this.orderMoneys$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }
      this.setBlankRow();
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
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
