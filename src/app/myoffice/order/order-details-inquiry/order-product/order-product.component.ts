import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getOrderProductInfo, sumOrderProductInfo, OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { UserKindConstant } from '@app/common/constant/user-kind.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getFindPayHeader, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

declare const getYnPayHeader: any;

@Component({
  selector: 'order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {
  userKindCd: string = "";
  consumerKindCd: string = UserKindConstant.consumerKindCd;

  orderProducts$ = new Observable<OrderPdtModel[]>;
  sumOrderProducts$ = new Observable<OrderPdtModel>;
  items: OrderPdtModel[] = [];

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
    this.orderProducts$ = this._orderDetailInquiryStore.select(getOrderProductInfo);
    this.sumOrderProducts$ = this._orderDetailInquiryStore.select(sumOrderProductInfo);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    let loginedInfo = AuthUtil.getLoginedInfo();
    if (loginedInfo) {
      this.userKindCd = ConvertUtil.convertToSring(loginedInfo.userKindCd);
    }

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

    this.orderProducts$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }

      this.setBlankRow();
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    })
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
