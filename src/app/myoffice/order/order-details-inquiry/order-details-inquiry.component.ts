import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ConvertUtil } from '@app/common/util/convert.util';
import { OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from 'src/environments/environment';
import { ValidationUtil } from '@app/common/util/validation.util';
import { loadDeliOrd, loadDeliOrdSuccess, loadOrderInfo, loadOrderInfoSuccess, loadOrderPay, loadOrderPaySuccess, loadOrderProduct, loadOrderProductSuccess, loadSumOrderProduct, loadSumOrderProductSuccess } from '@app/actions/myoffice/order/order-detail-inquiry.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';

@Component({
  selector: 'app-order-details-inquiry',
  templateUrl: './order-details-inquiry.component.html',
  styleUrls: ['./order-details-inquiry.component.css']
})
export class OrderDetailsInquiryComponent implements OnInit {

  orderNo: string = "";
  userid: string = "";
  showOrderPopup: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _orderDetailInquiryStore: Store<OrderDetailInquiryState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
  ) { }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
    }

    this._activatedRoute.queryParams.subscribe(params => {
      this.orderNo = ConvertUtil.convertToSring(params["order-no"]);
      if (ValidationUtil.isNotNullAndNotEmpty(this.orderNo)) {
        this.loadOrderDetailInquiry();
      } else {
        this._orderDetailInquiryStore.dispatch(loadOrderInfoSuccess({ items: [] }));
        this._orderDetailInquiryStore.dispatch(loadOrderPaySuccess({ items: [] }));
        this._orderDetailInquiryStore.dispatch(loadOrderProductSuccess({ items: [] }));
        this._orderDetailInquiryStore.dispatch(loadSumOrderProductSuccess({ item: {} as OrderPdtModel }));
        this._orderDetailInquiryStore.dispatch(loadDeliOrdSuccess({ items: [] }));
      }
    });
  }

  handleOnClickToggleOrderPopup(show: boolean): void {
    this.showOrderPopup = show;
  }

  loadOrderDetailInquiry(): void {
    if (ValidationUtil.isNullOrEmpty(this.orderNo)) return;

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      ordNo: this.orderNo,
      userId: this.userid,
    }

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._orderDetailInquiryStore.dispatch(loadOrderInfo({ params: params }));
    this._orderDetailInquiryStore.dispatch(loadOrderPay({ params: params }));
    this._orderDetailInquiryStore.dispatch(loadOrderProduct({ orderNo: this.orderNo }));
    this._orderDetailInquiryStore.dispatch(loadSumOrderProduct({ orderNo: this.orderNo }));
    this._orderDetailInquiryStore.dispatch(loadDeliOrd({ orderNo: this.orderNo }));
  }
}
