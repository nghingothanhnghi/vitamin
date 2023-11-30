import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ConvertUtil } from '@app/common/util/convert.util';
import { DateUtils } from '@app/common/util/date.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from '@enviroments/environment';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ADOInfoState, getADOInfo, getADOPdts } from '@app/selectors/myoffice/auto-ship/ado-info.selector';
import { loadAdoByAdoNo, loadAdoPdtByAdoNo, setAdoInfo, setAdoPdts } from '@app/actions/myoffice/auto-ship/ado-info.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Zip } from '@app/models/system/zip.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { getFindPayHeader, getSmWownet, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { ADORegisterState, getRegResult } from '@app/selectors/myoffice/auto-ship/ado-register.selector';
import { registerADO } from '@app/actions/myoffice/auto-ship/ado-register.action';

declare const getYnPayHeader: any;

@Component({
  selector: 'app-autoship-edit',
  templateUrl: './autoship-edit.component.html',
  styleUrls: ['./autoship-edit.component.css']
})
export class AutoshipEditComponent implements OnInit {
  today = new Date();

  adoForm = this._fb.group({
    comId: [environment.comId],
    lang: [environment.default_lang],
    userid: ["", [Validators.required]],
    username: [""],
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
    strAdoKind: [""],
    strStatus: [""],
    admitsDayYYYYMMDD: [""],
  });

  showAdoPopup: boolean = false;
  showZipPopup: boolean = false;
  showProductPopup: boolean = false;

  wAlertStatus$ = new Observable<WAlertStatus>();

  smPayHeader$ = new Observable<SmPayHeaderModel>();

  adoInfo$ = new Observable<ADORegisterModel>();
  adoInfo: ADORegisterModel = {} as ADORegisterModel;

  adoPdts$ = new Observable<ADORegisterModel[]>();

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;
  
  smWownet$ = new Observable<SmWownetModel>();
  smWownet: any = {} as SmWownetModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: any = {} as SmWownetPgModel;

  regAdoResult$ = new Observable<ADORegisterModel>();
  regAdoResult: ADORegisterModel = {} as ADORegisterModel;

  cartMap = new Map<string, ADORegisterModel>();
  cartItems: ADORegisterModel[] = [];

  loginedInfo = AuthUtil.getLoginedInfo();

  isLogined: boolean = AuthUtil.isLogined();
  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;

  countUpdate: number = 0;

  updateAction: string = "updateAction";

  haveAdo: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _deviceService: DeviceDetectorService,
    private adoInfoStore: Store<ADOInfoState>,
    private smWownetStateStore: Store<SmWownetState>,
    private wAlertStore: Store<WAlertState>,
    private adoRegisterStore: Store<ADORegisterState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.smPayHeader$ = this.smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this.smWownetStateStore.select(getWowWord);
    this.smWownet$ = this.smWownetStateStore.select(getSmWownet);
    this.smWownetPg$ = this.smWownetStateStore.select(getSmWownetPg);
    this.adoInfo$ = this.adoInfoStore.select(getADOInfo);
    this.adoPdts$ = this.adoInfoStore.select(getADOPdts);
    this.wAlertStatus$ = this.wAlertStore.select(getWAlertStatus);
    this.regAdoResult$ = this.adoRegisterStore.select(getRegResult);
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      let adoNo = ConvertUtil.convertToSring(params["adoNo"]);
      if (ValidationUtil.isNotNullAndNotEmpty(adoNo)) {
        this.loadAdoByAdoNo(adoNo);
        this.haveAdo = true;
      } else {
        this.adoInfoStore.dispatch(setAdoInfo({ data: {} as ADORegisterModel }));
        this.adoInfoStore.dispatch(setAdoPdts({ pdts: [] as ADORegisterModel[] }));
        this.haveAdo = false;
      }
    });

    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");

    this.smWowWord$.subscribe(res => this.smWowWord = res);
   
    this.smWownet$.subscribe(res => this.smWownet = res);

    this.adoInfo$.subscribe(res => this.handleOnSubscribeAdoInfo(res));

    this.adoPdts$.subscribe(res => this.handleOnSubscribeAdoPdt(res));

    this.wAlertStatus$.subscribe(res => {
      if (res.action === this.updateAction) {
        setTimeout(() => {
          this.adoInfoStore.dispatch(setAdoInfo({ data: {} as ADORegisterModel }));
          this.adoInfoStore.dispatch(setAdoPdts({ pdts: [] as ADORegisterModel[] }));
          this._router.navigate(["/my-office/auto-ship/registration-details"])
        }, 100);
        this.wAlertStore.dispatch(clearWAlert());
      }
    });

    this.regAdoResult$.subscribe(res => {
      if (this.countUpdate === 1 && res && res.retCode) {
        if (res.retCode === "OK") {
          const msg = MessageConstant.msgRegAdoSuccess.replace("{0}", ConvertUtil.convertToSring(res.adoNo));
          this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: msg, action: this.updateAction } }));
        } else {
          this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.retStr } }));
        }
      }
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.countUpdate = 0;
    });
  }

  handleOnClickRowAdoPopup(item: ADORegisterModel): void {
    this._router.navigateByUrl(`/my-office/auto-ship/edit?adoNo=${item.adoNo}`)    
  }

  handleOnToggleShowAdoPopup(show: boolean): void {
    this.showAdoPopup = show;
  }

  loadAdoByAdoNo(adoNo: string): void {
    if (ValidationUtil.isNullOrEmpty(adoNo)) return;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoInfoStore.dispatch(loadAdoByAdoNo({ adoNo }));
    this.adoInfoStore.dispatch(loadAdoPdtByAdoNo({ adoNo }));
  }

  handleOnSubscribeAdoInfo(res: ADORegisterModel): void {
    this.adoInfo = res;
    this.adoForm.patchValue({
      adoNo: ConvertUtil.convertToSring(res.adoNo),
      regDate: ConvertUtil.convertToSring(res.regDate),
      admitsDay: ConvertUtil.convertToSring(res.admitsDay),
      admitsDayYYYYMMDD: ConvertUtil.convertToSring(res.admitsDayYYYYMMDD),
      userid: ConvertUtil.convertToSring(res.userid),
      username: ConvertUtil.convertToSring(res.username),
      strStatus: ConvertUtil.convertToSring(res.strStatus),
      status: ConvertUtil.convertToSring(res.status),
      strAdoKind: ConvertUtil.convertToSring(res.strAdoKind),
      adoKind: ConvertUtil.convertToSring(res.adoKind),
      remark: ConvertUtil.convertToSring(res.remark),
      recipient: ConvertUtil.convertToSring(res.rName),
      tel: ConvertUtil.convertToSring(res.rTel),
      mobile: ConvertUtil.convertToSring(res.rMobile),
      eMail: ConvertUtil.convertToSring(res.eMail),
      post: ConvertUtil.convertToSring(res.rPost),
      addr1: ConvertUtil.convertToSring(res.rAddr1),
      addr2: ConvertUtil.convertToSring(res.rAddr2),
      addr2Tmp: ConvertUtil.convertToSring(res.rAddr2),
      rMemo: ConvertUtil.convertToSring(res.rMemo),
      cardOwner: ConvertUtil.convertToSring(res.cardHolder),
      cardCd: ConvertUtil.convertToSring(res.cardCd),
      cardNo: ConvertUtil.convertToSring(res.cardNo),
      cardNo1: ConvertUtil.convertToSring(res.cardNo).substring(0, 4),
      cardNo2: ConvertUtil.convertToSring(res.cardNo).substring(4, 8),
      cardNo3: ConvertUtil.convertToSring(res.cardNo).substring(8, 12),
      cardNo4: ConvertUtil.convertToSring(res.cardNo).substring(12),
      cardExpYY: ConvertUtil.convertToSring(res.cardYY),
      cardExpMM: ConvertUtil.convertToSring(res.cardMM),
      cardInstall: ConvertUtil.convertToSring(res.cardInstall),
      cardPw: ConvertUtil.convertToSring(res.cardPw),
      birthday: ConvertUtil.convertToSring(res.birthday),
      startDate: ConvertUtil.convertToSring(res.startDate),
      workuser: ConvertUtil.convertToSring(this.loginedInfo?.userid),
      userKindCd: ConvertUtil.convertToSring(this.loginedInfo?.userKindCd),
      pathKind: this._deviceService.isDesktop() ? 'PC' : 'MOBILE',
    });
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

  handleOnSubscribeAdoPdt(res: ADORegisterModel[]): void {
    this.cartMap = new Map<string, ADORegisterModel>();
    for (const item of res) {
      this.cartMap.set(item.pdtCd, item);
    }
    this.cartItems = Array.from(this.cartMap.values());
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    this.getCartItems();
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

  handleOnToggleProductPopup(show: boolean): void {
    this.showProductPopup = show;
  }

  handleOnClickRowProductPopup(item: ADORegisterModel): void {
    const cart = this.cartMap.get(item.pdtCd);
    if (cart) {
      const qty = cart.qty;
      this.cartMap.set(item.pdtCd, { ...item, qty: qty + 1 });
    } else {
      this.cartMap.set(item.pdtCd, { ...item, qty: 1 });
    }
    this.getCartItems();
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

  handleOnClickUpdate(): void {
    let data = this.adoForm.value;

    if (ValidationUtil.isNullOrEmpty(data.addr2)) {
      data = { ...data, addr2: data.addr2Tmp };
    }

    let msg = this.getValidMessage();
    if (ValidationUtil.isNotNullAndNotEmpty(msg)) {
      this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: msg } }));
      return;
    }
    
    this.countUpdate = 1;
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(registerADO({ data: data }));
  }

  handleOnClickCancelAdo(): void {
    const data = this.adoForm.value;
    this.countUpdate = 1;
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(registerADO({ data: { ...data, status: "CANCEL" } }));
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

  handleOnPatchPaymentAmount(payment: ADORegisterModel) {
    this.adoForm.patchValue({
      totPrice: payment.totPrice,
      totVat: payment.totVat,
      totAmt: payment.totAmt,
      totPv1: payment.totPv1,
      totPv2: payment.totPv2,
      totPv3: payment.totPv3,
      deliAmt: payment.deliAmt,
    });
  }

  getValidMessage(): string {
    const form = this.adoForm;

    let msg = "";

    let temp: any;
    let temp2: any;

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

    return msg;
  }

  get searchPost(): string {
    return ConvertUtil.convertToSring(this.adoForm.get("post")?.value)
  }

  get status(): string {
    return ConvertUtil.convertToSring(this.adoForm.get("status")?.value)
  }
}
