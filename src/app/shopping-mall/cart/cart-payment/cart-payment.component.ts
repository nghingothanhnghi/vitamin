import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { CartState, getCartInfo } from '@app/selectors/shoppingmall/cart.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { Router } from '@angular/router';
import { ValidationUtil } from '@app/common/util/validation.util';
import { cancelOrder, setIsBuyNow } from '@app/actions/shoppingmall/cart.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { getFindPayHeader, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';

declare const getYnPayHeader: any;

@Component({
  selector: 'cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.css']
})
export class CartPaymentComponent implements OnInit {

  cartInfo$ = new Observable<OrderMstModel>();
  cartInfo: OrderMstModel = {} as OrderMstModel;
  
  actionConfirmCancelOrderd: string = "actionConfirmCancelOrderd";
  smPayHeader$ = new Observable<SmPayHeaderModel>();

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;
  hasCancelOrder: boolean = false;

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;
  
  smWownetPg$ = new Observable<SmWownetPgModel>();

  wAlertStatus$ = new Observable<WAlertStatus>();

  constructor(
    private _router: Router,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _cartStore: Store<CartState>,
    private _smWownetStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
  ) { 
    this.cartInfo$ = this._cartStore.select(getCartInfo);
    this.smPayHeader$ = this._smWownetStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStore.select(getWowWord);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smWownetPg$ = this._smWownetStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.smWowWord$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
         this.smWowWord = res;
      }
    });

    this.cartInfo$.subscribe(res => {
      this.cartInfo = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    })

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");
    
    this.wAlertStatus$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.handleActionConfirm(res)
      }
    });
  }
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmCancelOrderd && status.isConfirm && this.hasCancelOrder == false) {
      let cancelOrderTemp = sessionStorage.getItem("cancelOrder");
      if(ValidationUtil.isNotNullAndNotEmpty(cancelOrderTemp)) {
        sessionStorage.removeItem("cancelOrder");
        this.hasCancelOrder = true
        this._wAlertStore.dispatch(clearWAlert());
        this._cartStore.dispatch(setIsBuyNow({ isBuyNow: false }));
        this._cartStore.dispatch(cancelOrder({ userid: ConvertUtil.convertToSring(this.cartInfo.userid), ordNoTmp: +this.cartInfo.ordNoTmp }));
        setTimeout(() => this._router.navigate([MyProgramConstant.urlShopping]), 200);
      }
    }
  }

  handleOnClickCancelOrder(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.cartInfo)) {
      const ordNoTmp = this.cartInfo.ordNoTmp;
      if (ValidationUtil.isNotNullAndNotEmpty(ordNoTmp)) {
        sessionStorage.setItem('cancelOrder', "cancelOrder");
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgConfirmCancelOrder, action: this.actionConfirmCancelOrderd } }));
        return;
      }
    }
    this._router.navigate([MyProgramConstant.urlShopping]);
  }

  handleOnClickCheckout(): void {
    if (ValidationUtil.isNullOrEmpty(this.cartInfo) || ValidationUtil.isNullOrEmpty(this.cartInfo.ordNoTmp)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgCartIsEmpty} }));
    } else {
      this._router.navigate([MyProgramConstant.urlShopping + "/checkout"]);
    }
  }
}
