import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getOrderInfo, OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { getFindPayHeader, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

declare const getYnPayHeader: any;

@Component({
  selector: 'order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {

  paymentInfos$ = new Observable<OrderMstModel[]>;
  items: OrderMstModel[] = [];

  totalCols: number = 9;
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  smPayHeader$ = new Observable<SmPayHeaderModel>();
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;

  constructor(
    private _orderDetailInquiryStore: Store<OrderDetailInquiryState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
  ) {
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.paymentInfos$ = this._orderDetailInquiryStore.select(getOrderInfo);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    this.paymentInfos$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }
      this.setBlankRow();
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.smWowWord$.subscribe(res => this.smWowWord = res);
    
    this.smWownetPg$.subscribe(res => {
      this.isPoint = res.settMPoint === "Y";
      this.setBlankRow();
    });

    this.smPayHeader$.subscribe(res => {
      this.isPv1 = getYnPayHeader(res, "pv1");
      this.isPv2 = getYnPayHeader(res, "pv2");
      this.isPv3 = getYnPayHeader(res, "pv3");

      this.setBlankRow();
    });
  }

  setBlankRow() {
    this.totalCols = 8;
    if (this.isPv1) this.totalCols++;
    // if (this.isPv2) this.totalCols++;
    // if (this.isPv3) this.totalCols++;
    if (this.isPoint) this.totalCols++;

    this.totalRows = this.items.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }
    this.cols = new Array(this.totalCols);
  }
}
