import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { setItem } from '@app/actions/item.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { setTypePageHeading } from '@app/actions/page-heading.action';
import { addToCart, setIsBuyNow, setShowAlert } from '@app/actions/shoppingmall/cart.action';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { CartUtil } from '@app/common/util/cart.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { itemState } from '@app/selectors/item.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { PageHeadingState } from '@app/selectors/page-heading.selector';
import { CartState, getCartInfo, getCartItems } from '@app/selectors/shoppingmall/cart.selector';
import { getFindPayHeader, getSmWownet, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

declare const getYnPayHeader: any;

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnChanges {

  @Input()
  config: PaginationInstance = {
    id: "products",
    currentPage: 0,
    itemsPerPage: 12,
    totalItems: 0,
  }

  @Input()
  products: OrdPdtModel[] = [];

  @Input()
  urlWownet: string = "";

  @Output()
  itemProduct = new EventEmitter<OrdPdtModel>();

  quantities: number[] = [];

  amtIndex: Number[] = [];

  plus: string = "+";
  minus: string = "-";

  isLogined: boolean = AuthUtil.isLogined();
  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isRetailAmt: boolean = false;
  isAmt: boolean = false;
  isOrd: boolean = false;
  isPoint: boolean = false;

  today: string = "";

  smPayHeader$ = new Observable<SmPayHeaderModel>();

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;
  
  smWownet$ = new Observable<SmWownetModel>();
  smWownet: any = {} as SmWownetModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: any = {} as SmWownetPgModel;

  cartInfo$ = new Observable<OrderMstModel>();
  cartInfo: OrderMstModel = {} as OrderMstModel;

  wAlertStatus$ = new Observable<WAlertStatus>();

  actionConfirmLogined: string = "action_confirm_logined";

  constructor(
    private _router : Router,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private _cartStore: Store<CartState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _pageHeadingStore: Store<PageHeadingState>
  ) { 
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.cartInfo$ = this._cartStore.select(getCartInfo);
  }

  ngOnInit(): void {

    // setTimeout(() => this._pageHeadingStore.dispatch(setTypePageHeading({ payload: "OTHER" })), 50);


    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");

    this.smWowWord$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWowWord = res;
      }
    });
   
    this.smWownet$.subscribe(res => {
      this.smWownet = res;
      this.isAmt = res.lshowAmtYn === "Y";
      this.isRetailAmt = res.lshowRetailYn === "Y";
      this.isOrd = res.lordYn === "Y";
    });

    this.cartInfo$.subscribe(res => this.cartInfo = res);

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));

    const now = new Date();
    this.today = now.getFullYear() + ConvertUtil.convertToZeroDecimal(now.getMonth() + 1) + ConvertUtil.convertToZeroDecimal(now.getDate());
  }

  ngOnChanges(changes: SimpleChanges): void {
    let productsChange = changes['products'];
    if (ValidationUtil.isNotNullAndNotEmpty(productsChange)) {
      let length = this.products.length;
      this.quantities = new Array(length);
      for (let i = 0; i < length; i++) {
        this.quantities[i] = 1;
        this.amtIndex[i] = this.products[i].amt;
      }
    }
  }

  handleOnClickProductDetail(item: OrdPdtModel): void {
    if (ValidationUtil.isNotNullAndNotEmpty(item.pdtCD)) {
      if (this.smWownet.lshowPdtYn !== "Y" && !this.isLogined) {
        this.showAlertRequiredLogined();
      } else {
        this._router.navigate([MyProgramConstant.urlShopping + `/product/${item.pdtCD}`]);
      }
    }
  }

  handleOnChangeQuanity(index: number, type: string): void {
    if (index >= 0 && index < this.quantities.length) {
      let quantity = this.quantities[index];
      let amt = this.products[index].amt;
      if (!quantity) {
        quantity = 1;
      }
      if (type === this.plus) {
        quantity++;
        amt = +amt * quantity;
      } else if (type === this.minus) {
        if (quantity > 1) {
          quantity--;
          amt = +amt * quantity;
        }
      }
      this.quantities[index] = quantity;
      this.amtIndex[index] = amt;
    }
  }

  handleOnAddToCart(index: number): void {
    if (this.isLogined) {
      if(this.cartInfo && this.cartInfo.kindCd != this.products[index].cateNameOrg){
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: '다른 카테고리 같이 주문할 수 없습니다.' 
        } }));
      } else {
        if (index >= 0 && index < this.quantities.length && index < this.products.length) {
          let item = this.products[index];
          let quantity = this.quantities[index];
          let pdtCd = ConvertUtil.convertToSring(item.pdtCD);
          let kindCd = ConvertUtil.convertToSring(item.cateNameOrg);
          if (item.amt <= 0) {
            this.showAlertPriceInvalid();
            return;
          }
          if (quantity > 0) {
            let params = CartUtil.getParamsAddToCart(pdtCd, quantity, kindCd);
  
            this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
            this._cartStore.dispatch(setShowAlert({ show: true }));
            this._cartStore.dispatch(setIsBuyNow({ isBuyNow: false }));
            this._cartStore.dispatch(addToCart({ params: params }));
          } else {
            this.showAlertRequiredQuantityInvalid();
          }
        } 
      }
    } else {
      this.showAlertRequiredLogined();
    }
  }

  handleOnClickBuyNow(index: number): void {
    if (this.isLogined) {
      if(this.cartInfo && this.cartInfo.kindCd != this.products[index].cateNameOrg){
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: '다른 카테고리 같이 주문할 수 없습니다.' 
        } }));
      } else {
        if (index >= 0 && index < this.quantities.length && index < this.products.length) {
          let item = this.products[index];
          let quantity = this.quantities[index];
          let pdtCd = ConvertUtil.convertToSring(item.pdtCD);
          let kindCd = ConvertUtil.convertToSring(item.cateNameOrg);
          if (item.amt <= 0) {
            this.showAlertPriceInvalid();
            return;
          }
          if (quantity > 0) {
            let params = CartUtil.getParamsAddToCart(pdtCd, quantity, kindCd);
  
            this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
            this._cartStore.dispatch(setShowAlert({ show: false }));
            this._cartStore.dispatch(setIsBuyNow({ isBuyNow: true }));
            this._cartStore.dispatch(addToCart({ params: params }));
          } else {
            this.showAlertRequiredQuantityInvalid();
          }
        } 
      }
    } else {
      this.showAlertRequiredLogined();
    }
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmLogined && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this._router.navigate(["/login"]);
    }
  }

  showAlertRequiredLogined(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgRequiredLogin, action: this.actionConfirmLogined } }));
  }

  showAlertRequiredQuantityInvalid(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgQuantityInvalid } }));
  }
  showAlertPriceInvalid(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgPriceInvalid } }));
  }

  handleOnClickShowProductPopup(item: any): void {
    // this._itemState.dispatch(setItem(item));
    this.itemProduct.emit(item);
  }

}
