import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getOrderInfo, OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getFindPayHeader, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';

declare const getYnPayHeader: any;
declare const modifyBackToCloseModal: any;

@Component({
  selector: 'order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  @Input()
  orderNo: String = "";

  @Output()
  clickOpenOrderPopup = new EventEmitter<boolean>();

  orderInfos$ = new Observable<OrderMstModel[]>();
  orderInfo: OrderMstModel = {} as OrderMstModel;

  smPayHeader$ = new Observable<SmPayHeaderModel>();
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;

  constructor(
    private _orderDetailInquiryStore: Store<OrderDetailInquiryState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.orderInfos$ = this._orderDetailInquiryStore.select(getOrderInfo);
  }

  ngOnInit(): void {
    this.orderInfos$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.orderInfo = res[res.length - 1];
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }
    });

    this.smWowWord$.subscribe(res => this.smWowWord = res);
    
    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });
  }

  handleOnClickShowOrderPopup(): void {
    modifyBackToCloseModal();
    this.clickOpenOrderPopup.emit(true);
  }
}
