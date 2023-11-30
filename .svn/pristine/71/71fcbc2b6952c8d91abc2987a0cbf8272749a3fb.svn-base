import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/common/util/auth.util';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { getFindPayHeader, getSmWownet, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import { ConvertUtil } from '@app/common/util/convert.util';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DateUtils } from '@app/common/util/date.util';
import { Zip } from '@app/models/system/zip.model';
import { ADORegisterState, getADOInfo, getRegResult, getTotalAdoCancelBetween90Days, getTotalOrdered } from '@app/selectors/myoffice/auto-ship/ado-register.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { countTotalAdoCancelBetween90Days, countTotalOrdered, loadAdoInfo, registerADO } from '@app/actions/myoffice/auto-ship/ado-register.action';
import { Router } from '@angular/router';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';

declare const getYnPayHeader: any;
declare const addEventListenerClickButtonSearch: any;
declare const addEventListenerForViewModeProduct: any;
declare const addEventListenerClickADOCondition: any;

@Component({
  selector: 'reg-autoship-register',
  templateUrl: './autoship-register.component.html',
  styleUrls: ['./autoship-register.component.css']
})
export class AutoshipRegisterComponent implements OnInit {
  today = new Date();

  adoForm = this._fb.group({
    comId: [environment.comId],
    lang: [environment.default_lang],
    userid: ["", [Validators.required]],
    pathKind: [""],
    adoNo: [""],
    regDate: [DateUtils.getDateGlobal(this.today, environment.default_lang), [Validators.required]],
    startDate: ["", [Validators.required]],
    endDate: [""],
    status: ["ACTIVE"],
    adoKind: ["NORMAL"],
    admitsDay: [""],
    remark: [""],
    totPrice: [0],
    totVat: [0],
    totAmt: [0],
    totPoint: [0],
    totPv1: [0],
    totPv2: [0],
    totPv3: [0],
    deliAmt: [0],
    userKindCd: [""],
    workuser: [""],
    recipient: ["", [Validators.required]],
    tel: ["", [Validators.required]],
    mobile: ["", [Validators.required]],
    post: ["", [Validators.required]],
    addr1: ["", [Validators.required]],
    addr2: [""],
    addr2Tmp: [""],
    rMemo: [""],
    eMail: [""],
    cardOwner: ["", [Validators.required]],
    cardPw: ["", [Validators.required, Validators.min(2)]],
    cardCd: [""],
    cardNo1: ["", [Validators.required]], 
    cardNo2: ["", [Validators.required]],
    cardNo3: ["", [Validators.required]],
    cardNo4: ["", [Validators.required]],
    cardNo: [""],
    cardExpMM: ["", [Validators.required, Validators.min(2)]],
    cardExpYY: ["", [Validators.required, Validators.min(2)]],
    cardInstall: ["00"],
    birthday: ["", [Validators.required, Validators.min(6)]],
    adoPdtList: [""],
  });

  wAlertStatus$ = new Observable<WAlertStatus>();

  smPayHeader$ = new Observable<SmPayHeaderModel>();

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;
  
  smWownet$ = new Observable<SmWownetModel>();
  smWownet: any = {} as SmWownetModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: any = {} as SmWownetPgModel;

  regAdoResult$ = new Observable<ADORegisterModel>();
  regAdoResult: ADORegisterModel = {} as ADORegisterModel;

  adoInfo$ = new Observable<ADORegisterModel>();
  adoInfo: ADORegisterModel = {} as ADORegisterModel;

  totalOrdered$ = new Observable<number>();
  totalOrdered: number = 0;

  totalAdoCancelBetween90Days$ = new Observable<number>();
  totalAdoCancelBetween90Days: number = 0;

  cartMap = new Map<string, ADORegisterModel>();
  cartItems: ADORegisterModel[] = [];

  isLogined: boolean = AuthUtil.isLogined();
  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;
  showZipPopup: boolean = false;

  loginedInfo = AuthUtil.getLoginedInfo();

  countReg: number = 0;
  regAction: string = "regAdoAction";
  haveAdoAction: string = "haveAdoAction";
  haveCanceledAdoAction: string = "haveCanceledAdoAction";

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    private adoRegisterStore: Store<ADORegisterState>,
    private wAlertStore: Store<WAlertState>,
    private smWownetStateStore: Store<SmWownetState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.smPayHeader$ = this.smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this.smWownetStateStore.select(getWowWord);
    this.smWownet$ = this.smWownetStateStore.select(getSmWownet);
    this.smWownetPg$ = this.smWownetStateStore.select(getSmWownetPg);
    this.regAdoResult$ = this.adoRegisterStore.select(getRegResult);
    this.adoInfo$ = this.adoRegisterStore.select(getADOInfo);
    this.wAlertStatus$ = this.wAlertStore.select(getWAlertStatus);
    this.totalOrdered$ = this.adoRegisterStore.select(getTotalOrdered);
    this.totalAdoCancelBetween90Days$ = this.adoRegisterStore.select(getTotalAdoCancelBetween90Days);
  }

  ngOnInit(): void {
    this.cartMap = new Map<string, ADORegisterModel>();
    
    if (this.loginedInfo) {
      this.adoRegisterStore.dispatch(loadAdoInfo({ userid: ConvertUtil.convertToSring(this.loginedInfo.userid) }));
      this.adoRegisterStore.dispatch(countTotalOrdered({ userid: ConvertUtil.convertToSring(this.loginedInfo.userid) }));
      this.adoRegisterStore.dispatch(countTotalAdoCancelBetween90Days({ userid: ConvertUtil.convertToSring(this.loginedInfo.userid) }));

      this.adoForm.patchValue({
        userid: ConvertUtil.convertToSring(this.loginedInfo.userid),
        userKindCd: ConvertUtil.convertToSring(this.loginedInfo.userKindCd),
        pathKind: this._deviceService.isDesktop() ? 'PC' : 'MOBILE',
        workuser: ConvertUtil.convertToSring(this.loginedInfo.userid),
      });
    }

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
   
    this.smWownet$.subscribe(res => this.smWownet = res);

    this.regAdoResult$.subscribe(res => {
      if (this.countReg === 1 && res && res.retCode) {
        if (res.retCode === "OK") {
          const msg = MessageConstant.msgRegAdoSuccess.replace("{0}", ConvertUtil.convertToSring(res.adoNo));
          this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: msg, action: this.regAction } }));
        } else {
          this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.retStr } }));
        }
      }
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.countReg = 0;
    });

    // this.adoInfo$.subscribe(res => {
    //   if (ValidationUtil.isNotNullAndNotEmpty(res.adoNo)) {
    //     if (res.status !== "CANCEL") {
    //       this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgWarningHaveAdo, action: this.haveAdoAction } }));
    //     } else {
    //       this.adoForm.patchValue({ adoNo: res.adoNo });
    //     }
    //   }
    //   this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    // })

    this.wAlertStatus$.subscribe(res => {
      if (res.action === this.regAction) {
        setTimeout(() => this._router.navigate(["/my-office/auto-ship/registration-details"]), 100);
        this.wAlertStore.dispatch(clearWAlert());
      } else if (res.action === this.haveAdoAction) {
        setTimeout(() => this._router.navigate(["/my-office/auto-ship/registration-details"]), 100);
        this.wAlertStore.dispatch(clearWAlert());
      } else if (res.action === this.haveCanceledAdoAction) {
        setTimeout(() => this._router.navigate(["/my-office/auto-ship/registration-details"]), 100);
        this.wAlertStore.dispatch(clearWAlert());
      }
    });

    this.totalOrdered$.subscribe(res => this.totalOrdered = res ? res : 0);

    this.totalAdoCancelBetween90Days$.subscribe(res => {
      if (res > 0) {
        this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgWarningADOTotalAdoCancelBetween90Days, action: this.haveCanceledAdoAction } }));
      }
      this.totalAdoCancelBetween90Days = res ? res : 0;
    });

    addEventListenerClickButtonSearch();
    addEventListenerForViewModeProduct();
    addEventListenerClickADOCondition();
  }

  handleOnAddToCart(item: ADORegisterModel): void {
    if (item.qty === 0) {
      this.handleOnRemoveItem(item.pdtCd);
    } else {
      this.cartMap.set(item.pdtCd, item);
      this.getCartItems();
    }
  }

  handleOnRemoveItem(pdtCd: string): void {
    this.cartMap.delete(pdtCd);
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartItems = Array.from(this.cartMap.values());

    let pdts = "";
    if (ValidationUtil.isNotNullAndNotEmpty(this.cartItems)) {
      for (const item of this.cartItems) {
        pdts += item.pdtCd + "|" + item.qty + "/";
      }
      if (ValidationUtil.isNotNullAndNotEmpty(pdts)) {
        pdts = pdts.substring(0, pdts.length - 1);
      }
    }

    this.adoForm.patchValue({ adoPdtList: pdts });
  }

  get searchPost(): string {
    return ConvertUtil.convertToSring(this.adoForm.get("post")?.value);
  }

  handleOnClickToggleZipPopup(show: boolean): void {
    this.showZipPopup = show;
  }

  handleOnClickRowZipPopup(zip: Zip): void {
    this.adoForm.patchValue({
      post: ConvertUtil.convertToSring(zip.address),
      addr1: ConvertUtil.convertToSring(zip.zipCode),
      addr2: "",
      addr2Tmp: ConvertUtil.convertToSring(zip.jibun),
    });
  }

  handleOnPatchPaymentAmount(payment: ADORegisterModel) {
    this.adoForm.patchValue({
      totPrice: payment.totPrice,
      totVat: payment.totVat,
      totAmt: payment.totAmt,
      totPoint: payment.totPoint,
      totPv1: payment.totPv1,
      totPv2: payment.totPv2,
      totPv3: payment.totPv3,
      deliAmt: payment.deliAmt,
    });
  }

  handleOnClickRegister(): void {
    let data = this.adoForm.value;
    
    if (ValidationUtil.isNullOrEmpty(data.addr2)) {
      data = { ...data, addr2: data.addr2Tmp };
    }

    let msg = this.getValidMessage();
    if (ValidationUtil.isNotNullAndNotEmpty(msg)) {
      this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: msg } }));
      return;
    }
    
    this.countReg = 1;
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(registerADO({ data: data }));
  }

  patchADOPdtList(): void {
    let pdtList = "";
    
    this.adoForm.patchValue({ adoPdtList: pdtList });
  }

  getValidMessage(): string {
    const form = this.adoForm;

    let msg = "";

    let temp: any;
    let temp2: any;

    const _input: any = document.getElementById("agreementCheckAll");
    const checked = _input.checked;
    if (_input && checked !== true) {
      msg += MessageConstant.msgADOAgreementConditionRequired;
      msg += "<br>";
    }

    if (ValidationUtil.isNullOrEmpty(this.cartItems)) {
      msg += MessageConstant.msgCartEmpty;
      msg += "<br>";
    } 
    // else {
    //   const minPv = 40;
    //   const totPv = form.get("totPv1")?.value;
    //   if (!totPv || totPv < minPv) {
    //     msg += MessageConstant.msgADOMinTotalPVInvalid.replace("{0}", ConvertUtil.convertToSring(minPv));
    //     msg += "<br>";
    //   }
    // }

    temp = form.get("userid")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgUseridIsRequired;
      msg += "<br>";
    }

    temp = form.get("regDate")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgRegDateRequired;
      msg += "<br>";
    }

    temp = form.get("startDate")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgAdmitDateRequired;
      msg += "<br>";
    }

    temp = form.get("recipient")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgADORecipientRequired;
      msg += "<br>";
    }

    temp = form.get("mobile")?.errors;
    temp2 = form.get("tel")?.errors;
    if (temp && temp.required && temp2 && temp2.required) { 
      msg += MessageConstant.msgADOMobileRequired;
      msg += "<br>";
    }

    temp = form.get("post")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgADOPostRequired;
      msg += "<br>";
    }

    temp = form.get("addr1")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgADOAddrRequired;
      msg += "<br>";
    }

    temp = form.get("cardOwner")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgADOCardOwnerRequired;
      msg += "<br>";
    }

    temp = form.get("cardNo1")?.errors;
    if (temp && temp.required) { 
      msg += MessageConstant.msgADOCardNoRequired;
      msg += "<br>";
    } else {
      temp = form.get("cardNo2")?.errors;
      if (temp && temp.required) { 
        msg += MessageConstant.msgADOCardNoRequired;
        msg += "<br>";
      } else {
        temp = form.get("cardNo3")?.errors;
        if (temp && temp.required) { 
          msg += MessageConstant.msgADOCardNoRequired;
          msg += "<br>";
        } else {
          temp = form.get("cardNo4")?.errors;
          if (temp && temp.required) { 
            msg += MessageConstant.msgADOCardNoRequired;
            msg += "<br>";
          }
        }
      }
    }

    temp = form.get("cardExpMM")?.errors;
    if (temp && (temp.required || temp.min)) { 
      msg += MessageConstant.msgADOCardExpRequired;
      msg += "<br>";
    } else {
      temp = form.get("cardExpYY")?.errors;
      if (temp && (temp.required || temp.min)) { 
        msg += MessageConstant.msgADOCardExpRequired;
        msg += "<br>";
      }
    }

    temp = form.get("cardPw")?.errors;
    if (temp && (temp.required || temp.min)) { 
      msg += MessageConstant.msgADOCardPwRequired;
      msg += "<br>";
    }

    temp = form.get("birthday")?.errors;
    if (temp && (temp.required || temp.min)) { 
      msg += MessageConstant.msgADOBirthdayRequired;
      msg += "<br>";
    }
    
    // if (this.totalOrdered === 0) {
    //   msg += MessageConstant.msgADOTotalOrderedInvalid;
    //   msg += "<br>";
    // }

    if (this.totalAdoCancelBetween90Days > 0) {
      msg += MessageConstant.msgWarningADOTotalAdoCancelBetween90Days;
      msg += "<br>";
    }

    return msg;
  }
}
