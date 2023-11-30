import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getFindPayHeader, getSmWownet, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { AuthUtil } from '@app/common/util/auth.util';
import { getProductsIntro, ProductIntroState } from '@app/selectors/homepage/product-intro.selector';
import { loadProductIntro, loadProductIntroSuccess } from '@app/actions/homepage/product-intro.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
 
declare const initProductImageSlider: any;
declare const getYnPayHeader: any;

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
  
})
export class ProductDescriptionComponent implements OnInit, OnDestroy  {

  @ViewChild('videoBroadcast') videoplayer!: ElementRef;
  showThum:boolean = true;

  isLogined: boolean = AuthUtil.isLogined();
  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isRetailAmt: boolean = false;
  isAmt: boolean = false;
  isOrd: boolean = false;
  isPoint: boolean = false;

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;
  
  smWownet$ = new Observable<SmWownetModel>();
  smWownet: any = {} as SmWownetModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: any = {} as SmWownetPgModel;

  smPayHeader$ = new Observable<SmPayHeaderModel>();

  products$ = new Observable<OrdPdtModel[]>();
  mapProduct: Map<String, OrdPdtModel[]> = new Map();
  mapCate: Map<String, String> = new Map();
  keys: String[] = [];

  urlWownet: string = "";
  wAlertStatus$ = new Observable<WAlertStatus>();

  pathKind: string = "PC";

  constructor(
    private _router : Router,
    private _productIntroStore: Store<ProductIntroState>,
    private _smWownetStore: Store<SmWownetState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
    private _deviceService: DeviceDetectorService
  ) {
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.products$ = this._productIntroStore.select(getProductsIntro);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.pathKind = this._deviceService.isDesktop()? 'PC' : 'PHONE';

    this._productIntroStore.dispatch(loadProductIntro({ params: { comId: environment.comId, pathKind: this.pathKind } }));

    this.smWowWord$.subscribe(res => this.smWowWord = res);

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");

    this.smWownet$.subscribe(res => {
      this.smWownet = res;
      this.urlWownet = ConvertUtil.convertToSring(res.urlWownet);
      this.isAmt = res.lshowAmtYn === "Y";
      this.isRetailAmt = res.lshowRetailYn === "Y";
      this.isOrd = res.lordYn === "Y";
    });

    this.products$.subscribe(res => this.loadProductByCate(res));

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  ngOnDestroy(): void {
    this._productIntroStore.dispatch(loadProductIntroSuccess({ pdts: [] }));
  }

  loadProductByCate(products: OrdPdtModel[]): void {
    let arr;
    this.mapProduct = new Map();
    this.mapCate = new Map();
    if (ValidationUtil.isNotNullAndNotEmpty(products)) {
      for (const product of products) {
        arr = this.mapProduct.get(product.pCateCd);
        if (!arr) {
          arr = [] as OrdPdtModel[];
        }
        arr.push(product);
        this.mapProduct.set(product.pCateCd, arr);
        this.mapCate.set(product.pCateCd, product.pCateName);
      }
    }
    this.keys = Array.from(this.mapProduct.keys());
    setTimeout(() => initProductImageSlider(".featured-slider"), 50);
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
  
  onPlay(){
    this.showThum = false;
    this.videoplayer?.nativeElement.play();
  }

  actionConfirmLogined: string = "action_confirm_logined";
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmLogined && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this._router.navigate(["/login"]);
    }
  }

  showAlertRequiredLogined(): void {
    this._wAlertStore.dispatch(setWAlert({
      wAlert: {
        icon: WAlertConstant.confirm, 
        message: MessageConstant.msgRequiredLogin,
        action: this.actionConfirmLogined
      }
    }));
  }
}
