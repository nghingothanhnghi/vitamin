import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { getFindPayHeader, getSmWownet, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getPdtImages, getPdtInfo, PdtDetailState } from '@app/selectors/shoppingmall/pdt-detail.selector';
import { CartState, getCartInfo } from '@app/selectors/shoppingmall/cart.selector';
import { PdtDetailModel } from '@app/models/shoppingmall/pdt-detail.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ImageKindConstant } from '@app/common/constant/image-kind.constant';
import { addToCart, setIsBuyNow, setShowAlert } from '@app/actions/shoppingmall/cart.action';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { CartUtil } from '@app/common/util/cart.util';
import { loadPdtImagesSuccess, setProductNameMainHeading } from '@app/actions/shoppingmall/pdt-detail.action';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { ProductState } from '@app/selectors/shoppingmall/product.selector';
import { setPdtCate } from '@app/actions/shoppingmall/product.action';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

declare const initProductImageSlider: any;
declare const getYnPayHeader: any;

@Component({
  selector: 'product-meta',
  templateUrl: './product-meta.component.html',
  styleUrls: ['./product-meta.component.css']
})
export class ProductMetaComponent implements OnInit, OnDestroy {

  smWownet$ = new Observable<SmWownetModel>();
  urlWownet: string = "";

  pdtInfo$ = new Observable<PdtDetailModel>();
  pdtInfo: PdtDetailModel = {} as PdtDetailModel;

  cartInfo$ = new Observable<OrderMstModel>();
  cartInfo: OrderMstModel = {} as OrderMstModel;

  pdtImages$ = new Observable<PdtDetailModel[]>();
  pdtImages: PdtDetailModel[] = [];
  activeImage: PdtDetailModel = {} as PdtDetailModel;

  smPayHeader$ = new Observable<SmPayHeaderModel>();

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel ;

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: any = {} as SmWownetPgModel;

  total: number = 0;
  quantity: number = 1;

  isLogined: boolean = false;
  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;
  isRetailAmt: boolean = false;
  isAmt: boolean = false;
  isOrd: boolean = false;
  isDisableBuying: boolean = false;
  wAlertStatus$ = new Observable<WAlertStatus>();
  subPdtImages$ = {} as Subscription;
  actionConfirmLogined: string = "action_confirm_logined";

  havePdtInfo: boolean = false;

  constructor(
    private _router: Router,
    private _smWownetStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _pdtDetailStore: Store<PdtDetailState>,
    private _cartStore: Store<CartState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
    private _productStore: Store<ProductState>
  ) { 
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.pdtInfo$ = this._pdtDetailStore.select(getPdtInfo);
    this.pdtImages$ = this._pdtDetailStore.select(getPdtImages);
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.cartInfo$ = this._cartStore.select(getCartInfo);
  }
  ngOnDestroy(): void {
    let hasValue = this.subPdtImages$.closed != undefined
    if(this.subPdtImages$ && hasValue){
      this.subPdtImages$.unsubscribe()
    }
    this._pdtDetailStore.dispatch(loadPdtImagesSuccess({ items: [] }))
  }

  ngOnInit(): void {
    this.isLogined = AuthUtil.isLogined();

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");

    this.cartInfo$.subscribe(res => this.cartInfo = res);
    
    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.smWownet$.subscribe(res => {
      this.urlWownet = ConvertUtil.convertToSring(res.urlWownet);
      if (this.isLogined) {
        this.isOrd = true;
      } else {
        this.isOrd = res.lordYn === "Y";
      }
      this.isAmt = res.lshowAmtYn === "Y";
      this.isRetailAmt = res.lshowRetailYn === "Y";
     });

    this.smWowWord$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWowWord = res;
      }
    });

    this.pdtInfo$.subscribe(res => {
      if (!this.havePdtInfo) {
        this._productStore.dispatch(setPdtCate({ cate: ConvertUtil.convertToSring(res.cateCd) }));
        this.pdtInfo = res;
        this._pdtDetailStore
        this.total = +res.amt;
        if( res && res.saleMaxQty == "0" && res.saleMinQty == "0"){
          this.isDisableBuying = true;
        }
      }
      if (ValidationUtil.isNotNullAndNotEmpty(this.pdtInfo) && ValidationUtil.isNotNullAndNotEmpty(this.pdtInfo.pdtName)) {
        let pdtName = ConvertUtil.convertToSring(this.pdtInfo.pdtName);
        this._pdtDetailStore.dispatch(setProductNameMainHeading({ heading: pdtName }));
      }
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      if (ValidationUtil.isNotNullAndNotEmpty(res.pdtCd)) {
        this.havePdtInfo = true;
      }

    });

    this.subPdtImages$ = this.pdtImages$.subscribe(res => {
      this.pdtImages = res.filter(x => x.imageKind === ImageKindConstant.large && ValidationUtil.isNotNullAndNotEmpty(x.fileName));
      if (ValidationUtil.isNotNullAndNotEmpty(this.pdtImages)) {
        if (typeof initProductImageSlider === "function") {
          setTimeout(() => initProductImageSlider("#product-meta .featured-slider"), 50);
        }
      }
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this._cartStore.dispatch(setShowAlert({ show: true }));
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  handleOnClickPlus(): void {
    this.quantity++;
    this.total = +this.pdtInfo.amt * this.quantity;
  }

  handleOnClickMinus(): void {
    if (this.quantity === 1) return;

    this.quantity--;
    this.total = +this.pdtInfo.amt * this.quantity;
  }

  handleOnClickAddToCart(): void {
    if (this.isLogined) {
      if (Number(this.pdtInfo.amt) <= 0) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgPriceInvalid } }));
        return;
      }
      this._cartStore.dispatch(setIsBuyNow({ isBuyNow: false }));
      this.addToCart();
    } else {
      this.alertNotLogined();
    }
  }

  handleOnClickBuyNow(): void {
    if (this.isLogined) {
      if (Number(this.pdtInfo.amt) <= 0) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgPriceInvalid } }));
        return;
      }
      this._cartStore.dispatch(setIsBuyNow({ isBuyNow: true }));
      this.addToCart(); 
    } else {
      this.alertNotLogined();
    }
  }

  handleOnClickFeaturedWrapperImage(item: PdtDetailModel): void {
    this.activeImage = item;
  }

  addToCart(): void {
    let pdtCd = this.pdtInfo.pdtCd;
    let kindCd = this.pdtInfo.cateNameOrg;
    if (ValidationUtil.isNotNullAndNotEmpty(pdtCd)) {
      if(this.cartInfo && this.cartInfo.kindCd != kindCd){
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: '다른 카테고리 같이 주문할 수 없습니다.' 
        } }));
      } else {
        let params = CartUtil.getParamsAddToCart(ConvertUtil.convertToSring(pdtCd), this.quantity, ConvertUtil.convertToSring(kindCd));
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        this._cartStore.dispatch(addToCart({ params: params }));
      }
    }
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmLogined && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this._router.navigate(["/login"]);
    }
  }


  alertNotLogined(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgRequiredLogin, action: this.actionConfirmLogined } }));
  }
}
