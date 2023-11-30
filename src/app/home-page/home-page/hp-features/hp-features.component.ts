import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadSpecialProducts, loadSpecialProductsSuccess } from '@app/actions/shoppingmall/product.action';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { getSpecialProducts, ProductState } from '@app/selectors/shoppingmall/product.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

declare const initProductImageSlider: any;

@Component({
  selector: 'hp-features',
  templateUrl: './hp-features.component.html',
  styleUrls: ['./hp-features.component.css']
})
export class HpFeaturesComponent implements OnInit, OnDestroy {

  @Input()
  urlWownet : string = "";


  @Input()
  lshowPdtYn : string = "";

  wAlertStatus$ = new Observable<WAlertStatus>();

  
  readonly BTN_BEST_SELLER_ACTIVED: number = 0;
  readonly BTN_NEW_ACTIVED: number = 1;
  readonly BTN_PROMOTION_ACTIVED: number = 2;
  btnFilterIsActive: number = this.BTN_BEST_SELLER_ACTIVED;

  products$ = new Observable<OrdPdtModel[]>();
  products: OrdPdtModel[] = [];
  
  isLogined: boolean = AuthUtil.isLogined();
  actionConfirmLogined: string = "action_confirm_logined";

  subscription = {} as Subscription

  constructor(private _productStore: Store<ProductState>,
    private _wAlertStore: Store<WAlertState>,
    private _router : Router
  ) { 
    this.products$ = this._productStore.select(getSpecialProducts);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus); 
  }

  ngOnInit(): void {
    this.loadSpecialProducts();

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  ngOnDestroy(): void {
    let hasValue = this.subscription.closed != undefined
    if(this.subscription && hasValue){
      this.subscription.unsubscribe()
    }
    this._productStore.dispatch(loadSpecialProductsSuccess({items:[]}))
  }

  loadSpecialProducts() {

    let params = this.getParam();

    this._productStore.dispatch(loadSpecialProducts({ params: params }));
    
    this.subscription = this.products$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.products = res;

        if(res.length > 0){
          setTimeout(() => {
            initProductImageSlider("#products-slider .featured-slider");
          }, 500);
        }
      }
    });
  }

  getParam() {
    let type : any = "";

    if(this.btnFilterIsActive === this.BTN_BEST_SELLER_ACTIVED) {
      type = 2;
    } else  if(this.btnFilterIsActive === this.BTN_NEW_ACTIVED) {
      type = 1;
    } else if (this.btnFilterIsActive == this.BTN_PROMOTION_ACTIVED) {
      type = 3;
    }

    return {
      comId: environment.comId,
      cateCd : "",
      pathKind : "PC",
      type : type
    }
  }

  changeSpecialProducts(flag : any) {
    this.btnFilterIsActive = flag;
    this.loadSpecialProducts();
  }

  handleOnClickProductDetail(item: OrdPdtModel): void {
    if (ValidationUtil.isNotNullAndNotEmpty(item.pdtCD)) {
      if (this.lshowPdtYn !== "Y" && !this.isLogined) {
        this.showAlertRequiredLogined();
      } else {
        this._router.navigate([MyProgramConstant.urlShopping + `/product/${item.pdtCD}`]);
      }
    }
  }

  showAlertRequiredLogined(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: "xxxx", action: this.actionConfirmLogined } }));
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmLogined && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this._router.navigate(["/login"]);
    }
  }
}
