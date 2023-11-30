import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { PaginationInstance } from 'ngx-pagination';

import { ADORegisterState, getADOProducts, getTotalADOProducts } from '@app/selectors/myoffice/auto-ship/ado-register.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { DeviceDetectorService } from 'ngx-device-detector';
import { countADOProducts, loadADOProducts } from '@app/actions/myoffice/auto-ship/ado-register.action';
import { environment } from '@enviroments/environment';
import { ValidationUtil } from '@app/common/util/validation.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { ConvertUtil } from '@app/common/util/convert.util';

declare const addEventListenerForViewModeProduct: any;

@Component({
  selector: 'reg-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isLogined: boolean = AuthUtil.isLogined();
  
  @Input()
  isPv1: boolean = false;

  @Input()
  isPv2: boolean = false;

  @Input()
  isPv3: boolean = false;

  @Input()
  isRetailAmt: boolean = false;

  @Input()
  isAmt: boolean = false;

  @Input()
  isOrd: boolean = false;

  @Input()
  isPoint: boolean = false;

  @Input()
  smWownet: SmWownetModel = {} as SmWownetModel;

  @Input()
  smWowWord: WownetWordModel = {} as WownetWordModel;

  @Output()
  addToCart = new EventEmitter<ADORegisterModel>();

  searchForm = this._fb.group({
    page: [0],
    len: [12],
    comId: [environment.comId],
    pathKind: ["PC"],
    cateCd: [""],
    pdtCd: [""],
    key: [""],
  });

  config: PaginationInstance = {
    id: "ado-products",
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  }

  quantityMap = new Map<string, number>();

  products$ = new Observable<ADORegisterModel[]>();
  products: ADORegisterModel[] = [];

  total$ = new Observable<number>();
  total: number = 0;

  page: number = 0;
  len: number = 12;

  plus: string = "+";
  minus: string = "-";
  totalPage : number = 0;

  constructor(
    private _deviceService: DeviceDetectorService,
    private _fb: FormBuilder,
    private adoRegisterStore: Store<ADORegisterState>,
    private wAlertStore: Store<WAlertState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.products$ = this.adoRegisterStore.select(getADOProducts);
    this.total$ = this.adoRegisterStore.select(getTotalADOProducts);
  }

  ngOnInit(): void {
    this.searchForm.patchValue({ pathKind: this._deviceService.isDesktop()? 'PC' : 'PHONE' });

    this.quantityMap = new Map<string, number>();

    this.handleOnSearch();

    this.products$.subscribe(res => {
      this.products = res;
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.total$.subscribe(res => {
      this.total = res;
      this.config.totalItems = res;
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    if (typeof addEventListenerForViewModeProduct === "function") {
      setTimeout(() => addEventListenerForViewModeProduct(), 300);
    }
  }

  handleOnClickAddToCart(item: ADORegisterModel): void {
    const quantity = this.quantityMap.get(item.pdtCd);
    if (quantity !== undefined && quantity !== null) {
      if (item.adoMinQty && item.adoMinQty > 0 && item.adoMinQty > quantity) {
        this.wAlertStore.dispatch(
          setWAlert({ 
            wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgSaleQtyMinInvalid.replace("{0}", ConvertUtil.convertToSring(item.adoMinQty) ) } 
          })
        );
      } else if (item.adoMaxQty && item.adoMaxQty > 0 && item.adoMaxQty < quantity) {
        this.wAlertStore.dispatch(
          setWAlert({ 
            wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgSaleQtyMaxInvalid.replace("{0}", ConvertUtil.convertToSring(item.adoMaxQty) ) } 
          })
        );
      } else {
        this.addToCart.emit({ ...item, qty: quantity });
      }
    }
  }

  handleOnChangeQuanity(item: ADORegisterModel, type: string): void {
    let quantity = this.quantityMap.get(item.pdtCd);
    if (!quantity) {
      quantity = 0;
    }
    if (type === this.plus) {
      quantity++;
    } else if (type === this.minus) {
      if (quantity > 0) {
        quantity--;
      }
    }
    if (quantity >= 0) {
      this.quantityMap.set(item.pdtCd, quantity);
      this.handleOnClickAddToCart(item);
    }
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.searchForm.patchValue({ page: page - 1 });

    const params = this.getParams();

    if (params.page < 0) return;
    this.loadADOProducts(params);
  }

  handleOnSearch(): void {
    this.searchForm.patchValue({ page: 0 });
    const params = this.getParams();

    if (params.page < 0) return;
    if (ValidationUtil.isNullOrEmpty(params.comId)) return;

    this.config.currentPage = 1;

    this.loadADOProducts(params);
    this.countADOProducts(params);
  }

  loadADOProducts(params: any): void {
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(loadADOProducts({ params: params }));
  }

  countADOProducts(params: any): void {
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(countADOProducts({ params: params }));
  }

  getParams(): any {
    return this.searchForm.value;
  }

  get keySearch(): string {
    return ConvertUtil.convertToSring(this.searchForm.get("key")?.value);
  }

  handleOnTotalPage(totalPage: number): void {
    this.totalPage = totalPage;
  }
}
