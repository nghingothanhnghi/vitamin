import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';

import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getProducts, getTotalProduct, ProductState } from '@app/selectors/shoppingmall/product.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { environment } from '@enviroments/environment';
import { loadProducts, loadTotalProduct, setKeySearch } from '@app/actions/shoppingmall/product.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DeviceDetectorService } from 'ngx-device-detector';
import { itemState } from '@app/selectors/item.selector';
import { setItem } from '@app/actions/item.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { Router } from '@angular/router';

declare const addEventListenerForViewModeProduct: any;

@Component({
  selector: 'hp-products',
  templateUrl: './hp-products.component.html',
  styleUrls: ['./hp-products.component.css']
})
export class HpProductsComponent implements OnInit, OnDestroy {
  smWownet$ = new Observable<SmWownetModel>();

  products$ = new Observable<OrdPdtModel[]>();
  products: OrdPdtModel[] = [];

  total$ = new Observable<number>();
  total: number = 0;

  pathKind: string = "PC";
  
  lenOptions: SelectDropdownModel[] = [
    { label: "12", value: "12" },
    { label: "24", value: "24" },
    { label: "48", value: "48" },
    { label: "100", value: "100" },
  ];
  lenSelected = this.lenOptions[0];

  page: number = 1;
  len: number = 12;
  urlWownet: string = "";
  lshowPdtYn: string = "";

  config: PaginationInstance = {
    id: "main-products",
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  isLogined: boolean = AuthUtil.isLogined();
  actionConfirmLogined: string = "action_confirm_logined";
  wAlertStatus$ = new Observable<WAlertStatus>();
  totalPage : number = 0;

  subCateCd$ = {} as Subscription
  
  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _productStore: Store<ProductState>,
    private _smWownetStore: Store<SmWownetState>,
    private _deviceService: DeviceDetectorService,
    private _itemState: Store<itemState>,
    private _wAlertStore: Store<WAlertState>,
    private _router : Router
  ) {
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.total$ = this._productStore.select(getTotalProduct);
    this.products$ = this._productStore.select(getProducts);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {    
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this.pathKind = this._deviceService.isDesktop()? 'PC' : 'PHONE';

    this.total$.subscribe(res => {
      this.total = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.products$.subscribe(res => {
      this.products = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.subCateCd$ = this.smWownet$.subscribe(res => { 
      this.urlWownet = ConvertUtil.convertToSring(res.urlWownet);
      this.lshowPdtYn = ConvertUtil.convertToSring(res.lshowPdtYn);
      
      this.page = 1;
      this.config.currentPage = 1;
      this.loadTotalProduct();
      this.loadProducts();
    });

    if (typeof addEventListenerForViewModeProduct === "function") {
      addEventListenerForViewModeProduct();
    }

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  ngOnDestroy(): void {
    
    let hasValue = this.subCateCd$.closed != undefined
    if(this.subCateCd$ && hasValue){
      this.subCateCd$.unsubscribe()
    }
  }

  handleOnChangeLenSelected(selected: SelectDropdownModel): void {
    this.lenSelected;
    this.page = 1;
    this.len = +selected.value;
    this.config.currentPage = 1;
    this.config.itemsPerPage = this.len;

    this.loadTotalProduct();
    this.loadProducts();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = page;
    
    this.loadProducts();
  }

  loadTotalProduct(): void {
    const params = this.getParams();

    if (params.page < 0) return;
    // if (ValidationUtil.isNullOrEmpty(params.cateCd)) return;
    
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._productStore.dispatch(loadTotalProduct({ params: params }));
  }

  loadProducts(): void {
    const params = this.getParams();
    if (params.page < 0) return;
    // if (ValidationUtil.isNullOrEmpty(params.cateCd)) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._productStore.dispatch(loadProducts({ params: params }));
  }

  getParams(): any {
    const params = {
      comId: environment.comId,
      cateCd: null,
      pathKind: this.pathKind,
      key: "",
      page: this.page - 1,
      len: this.len,
    }

    return params;
  }

  getItemOfProduct(item: any) {
    if (ValidationUtil.isNotNullAndNotEmpty(item.pdtCD)) {
      if (this.lshowPdtYn !== "Y" && !this.isLogined) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgRequiredLogin, action: this.actionConfirmLogined } }));
      } else {
        sessionStorage.setItem('checkItemProduct', "next");
        this._itemState.dispatch(setItem({ item: item }));
      }
    }
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmLogined && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this._router.navigate(["/login"]);
    }
  }

  handleOnTotalPage(totalPage: number): void {
    this.totalPage = totalPage;
  }
}
