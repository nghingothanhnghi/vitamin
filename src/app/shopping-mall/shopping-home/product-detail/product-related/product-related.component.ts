import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { getPdtInfo, getPdtInfosByCateCd, PdtDetailState } from '@app/selectors/shoppingmall/pdt-detail.selector';
import { PdtDetailModel } from '@app/models/shoppingmall/pdt-detail.model';
import { loadPdtInfosByCateCd } from '@app/actions/shoppingmall/pdt-detail.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getFindPayHeader, getSmWownet, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { ConvertUtil } from '@app/common/util/convert.util';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { Router } from '@angular/router';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';

declare const initProductImageSlider: any;

@Component({
  selector: 'product-related',
  templateUrl: './product-related.component.html',
  styleUrls: ['./product-related.component.css']
})
export class ProductRelatedComponent implements OnInit, OnDestroy  {

  actionConfirmLogined: string = "action_confirm_logined";
  relatedPdtInfo$ = new Observable<PdtDetailModel[]>();
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel ;
  pdtInfo$ = new Observable<PdtDetailModel>();

  isLogined: boolean = false;
  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;
  isRetailAmt: boolean = false;
  isAmt: boolean = false;

  urlWownet: string = "";
  productCd: String = "";
  pathKind: string = "PC";
  cateCd: String = "";

  wAlertStatus$ = new Observable<WAlertStatus>();
  smPayHeader$ = new Observable<SmPayHeaderModel>();
  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: any = {} as SmWownetPgModel;
  smWownet$ = new Observable<SmWownetModel>();
  smWownet = {} as SmWownetModel;
  subPrdRelated$ = {} as Subscription
  constructor(
    private _pdtDetailStore: Store<PdtDetailState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _smWownetStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
    private _router : Router,
    private _deviceService: DeviceDetectorService
    ) {
    this.pdtInfo$ = this._pdtDetailStore.select(getPdtInfo);
    this.relatedPdtInfo$ = this._pdtDetailStore.select(getPdtInfosByCateCd);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
  }
  ngOnDestroy(): void {
    let hasValue = this.subPrdRelated$.closed != undefined
    if(this.subPrdRelated$ && hasValue){
      this.subPrdRelated$.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.pathKind = this._deviceService.isDesktop() ? 'PC' : 'PHONE';
    
    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = res.pv1 == 'Y';
        this.isPv2 = res.pv2 == 'Y' ;
        this.isPv3 = res.pv3 == 'Y' ;
      }
    });
    
    this.isLogined = AuthUtil.isLogined();

    this.subPrdRelated$ = this.pdtInfo$.subscribe(res => {
      if(res && res.cateCd && res.cateCd.length>0){
        this.productCd = res.pdtCd;
        this.cateCd = res.cateCd;
        this._pdtDetailStore.dispatch(loadPdtInfosByCateCd(res.cateCd.toString(), '5', res.pdtCd.toString(), this.pathKind))
      }
    });

   this.relatedPdtInfo$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(this.productCd)){
        setTimeout(() => {
          initProductImageSlider("#product-related .featured-slider")
        }, 50);
      }
    });

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");
    
    this.smWowWord$.subscribe(res => {
      this.smWowWord = res;
    });
    this.smWownet$.subscribe(res => {
      this.smWownet = res;
      this.urlWownet = ConvertUtil.convertToSring(res.urlWownet);
      this.isAmt = res.lshowAmtYn === "Y";
      this.isRetailAmt = res.lshowRetailYn === "Y";
    });
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  handleOnClickProductDetail(item: PdtDetailModel): void {
    if (ValidationUtil.isNotNullAndNotEmpty(item.pdtCd)) {
      if (this.smWownet.lShowPdtYn !== "Y" && !this.isLogined) {
        this.showAlertRequiredLogined();
      } else {
        this._router.navigate([MyProgramConstant.urlShopping + `/product/${item.pdtCd}`]);
      }
    }
  }
  showAlertRequiredLogined(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgRequiredLogin, action: this.actionConfirmLogined } }));
  }
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmLogined && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this._router.navigate(["/login"]);
    }
  }
}
