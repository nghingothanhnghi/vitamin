import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getOrderDelis, getOrderInfo, OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ReportUtil } from '@app/common/util/report.util';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { setWAlert } from '@app/actions/w-alert.action';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';

@Component({
  selector: 'order-shipping',
  templateUrl: './order-shipping.component.html',
  styleUrls: ['./order-shipping.component.css']
})
export class OrderShippingComponent implements OnInit {

  @Input()
  userid: string = "";

  @Input()
  orderNo: string = "";

  orderInfos$ = new Observable<OrderMstModel[]>();
  shippingInfo: OrderMstModel = {} as OrderMstModel;

  orderDeilis$ = new Observable<OrderMstModel[]>();
  orderDeilis: OrderMstModel[] = [];

  wAlertStatus$ = new Observable<WAlertStatus>();
  
  constructor(
    private _orderDetailInquiryStore: Store<OrderDetailInquiryState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
  ) { 
    this.orderInfos$ = this._orderDetailInquiryStore.select(getOrderInfo);
    this.orderDeilis$ = this._orderDetailInquiryStore.select(getOrderDelis);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    this.orderInfos$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.shippingInfo = res[res.length - 1];
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }
    });

    this.orderDeilis$.subscribe(res => this.orderDeilis = res);
  }

  handleOnClickOrderReport(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.userid) && ValidationUtil.isNotNullAndNotEmpty(this.orderNo)) {
      ReportUtil.openOrderReport(this.userid, this.orderNo);
    } else {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: "주문정보가 없습니다."}}));
    }
  }

  handleOnClickCancelOrder(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.userid) && ValidationUtil.isNotNullAndNotEmpty(this.orderNo)) {
      ReportUtil.openOrderWithdralwal(this.orderNo);
    } else {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: "주문정보가 없습니다."}}));
    }
  }
}
