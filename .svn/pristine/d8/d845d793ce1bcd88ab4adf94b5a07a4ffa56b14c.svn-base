import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { CartState, getCartItems } from '@app/selectors/shoppingmall/cart.selector';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { getFindPayHeader, getSmWownet, getWowWord, getSmWownetPg, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { CartUtil } from '@app/common/util/cart.util';
import { addToCart, removeCartItem, setIsBuyNow, setShowAlert } from '@app/actions/shoppingmall/cart.action';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

declare const getYnPayHeader: any;

@Component({
  selector: 'cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  cartItems$ = new Observable<OrdPdtModel[]>();
  cartItems: OrdPdtModel[] = [];

  urlWownet: string = "";
  actionRemoveItem: string = "actionRemoveItem";
  itemRm: OrdPdtModel = {} as OrdPdtModel

  smPayHeader$ = new Observable<SmPayHeaderModel>();

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel ;

  smWownetPg$ = new Observable<SmWownetPgModel>();

  wAlertStatus$ = new Observable<WAlertStatus>();

  countRemoveCartItem: number = 0;

  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _smWownetStore: Store<SmWownetState>,
    private _cartStore: Store<CartState>,
    private _wAlertStore: Store<WAlertState>,
  ) {
    this.cartItems$ = this._cartStore.select(getCartItems);
    this.smPayHeader$ = this._smWownetStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStore.select(getWowWord);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smWownetPg$ = this._smWownetStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    this._smWownetStore.select(getSmWownet).subscribe(res => this.urlWownet = ConvertUtil.convertToSring(res.urlWownet));

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

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");

    this.cartItems$.subscribe(res => {
      this.cartItems = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this._cartStore.dispatch(setShowAlert({ show: false }));

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  handleOnClickPlus(item: OrdPdtModel): void {
    this.updateQuantityCartItem(ConvertUtil.convertToSring(item.pdtCD), 1, ConvertUtil.convertToSring(item.cateNameOrg));
  }

  handleOnClickMinus(item: OrdPdtModel): void {
    let temp = +item.qty - 1;
    if (temp <= 0) {
      this.confirmRemoveCartItem(item);
    } else {
      this.updateQuantityCartItem(ConvertUtil.convertToSring(item.pdtCD), -1, ConvertUtil.convertToSring(item.cateNameOrg));
    }
  }

  handleOnRemoveCartItem(item: OrdPdtModel): void {
    this.confirmRemoveCartItem(item);
  }

  updateQuantityCartItem(pdtCd: string, quantity: number, kindCd: string): void {
    if (ValidationUtil.isNotNullAndNotEmpty(pdtCd)) {
      let params = CartUtil.getParamsAddToCart(ConvertUtil.convertToSring(pdtCd), quantity, kindCd);
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this._cartStore.dispatch(setIsBuyNow({ isBuyNow: false }));
      this._cartStore.dispatch(addToCart({ params: params }));
    }
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (this.countRemoveCartItem === 1 && status.action === this.actionRemoveItem && status.isConfirm) {
      this.countRemoveCartItem = 0;
      this._wAlertStore.dispatch(clearWAlert());
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this._cartStore.dispatch(setIsBuyNow({ isBuyNow: false }));
      this._cartStore.dispatch(removeCartItem({ 
        userid: ConvertUtil.convertToSring(this.itemRm.userid), 
        pdtCd: ConvertUtil.convertToSring(this.itemRm.pdtCD), 
        ordNoTmp: + this.itemRm.ordNoTmp 
      }));
    }
  }

  confirmRemoveCartItem(item: OrdPdtModel): void {
    this.itemRm = item;
    this.countRemoveCartItem = 1;
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgConfirmRemoveCartItem, action: this.actionRemoveItem } }));
  }
}
