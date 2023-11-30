import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { Zip } from '@app/models/system/zip.model';
import { CenterInfoState } from '@app/selectors/shoppingmall/center-info.selector';
import { loadCenterInfo } from '@app/actions/shoppingmall/center-info.action';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { getSmWownet, getSmWownetConfig, getSmWownetPg, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { loadSmWownetConfig } from '@app/actions/system/sm-wownet.action';
import { CartState, getCartInfo, getCartItems } from '@app/selectors/shoppingmall/cart.selector';
import { environment } from '@enviroments/environment';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { CheckoutState, getResultOrdIns, getResultOrdMoneyTmp } from '@app/selectors/shoppingmall/checkout.selector';
import { saveOrder, saveOrderMoneyTmp, setResultOrdIns, setResultOrdMoneyTmp } from '@app/actions/shoppingmall/checkout.action';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ResultProc } from '@app/models/system/result-proc.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { PaymentMethodConstant } from '@app/common/constant/payment-method.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { Router } from '@angular/router';
import { cancelOrder, setIsBuyNow, setReload } from '@app/actions/shoppingmall/cart.action';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { MaccoModel } from '@app/models/shoppingmall/macco.model';
import { getKICCCardResult, KICCPaymentState } from '@app/selectors/shoppingmall/kicc-payment.selector';
import { KICCCardModel } from '@app/models/shoppingmall/kicc-card.model';
import { payCard, setCardResult } from '@app/actions/shoppingmall/kicc-payment.action';
import { PageHeadingState } from '@app/selectors/page-heading.selector';
import { setTypePageHeading } from '@app/actions/page-heading.action';
import { PaymentCardResult } from '@app/models/shoppingmall/payment-card-result.model';
import { getSettleVBankResult, VbBankState } from '@app/selectors/shoppingmall/vbbank.selector';
import { payVBank } from '@app/actions/shoppingmall/vbbank.action';
import { getMemberPoint, MemberPointState } from '@app/selectors/shoppingmall/member-point.selector';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { KorPaymentState, payCardResult } from '@app/selectors/shoppingmall/kor-payment.selector';
import { payCardKor } from '@app/actions/shoppingmall/kor-payment.action';

declare const addEventListenerForPaymentMethod: any;
declare const addEventListenerClickCheckCodition: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  today = new Date();

  showZipPopup: boolean = false;
  showDeliPopup: boolean = false;

  wAlertStatus$ = new Observable<WAlertStatus>();

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: SmWownetPgModel = {} as SmWownetPgModel;

  smWownet$ = new Observable<SmWownetModel>();
  smWownet: SmWownetModel = {} as SmWownetModel;

  smConfig$ = new Observable<SmWownetConfigModel>();
  smConfig: SmWownetConfigModel = {} as SmWownetConfigModel;

  maccoResult$ = new Observable<MaccoModel>();
  maccoResult: MaccoModel = {} as MaccoModel;

  orderInfo$ = new Observable<OrderMstModel>();
  orderInfo: OrderMstModel = {} as OrderMstModel;

  cartItems$ = new Observable<OrdPdtModel[]>();
  cartItems: OrdPdtModel[] = [];

  resultOrdMoneyTmp$ = new Observable<ResultProc>();
  resultOrdMoneyTmp: ResultProc = {} as ResultProc;

  resultOrdIns$ = new Observable<ResultProc>();
  resultOrdIns: ResultProc = {} as ResultProc;

  cardResult$ = new Observable<KICCCardModel>();
  cardResult: KICCCardModel = {} as KICCCardModel;

  korPayResult$ = new Observable<ResultProc>();
  korPayResult: ResultProc = {} as ResultProc;

  payVBankResult$ = new Observable<PaymentCardResult>();
  payVBankResult: PaymentCardResult = {} as PaymentCardResult;

  memberPoint$ = new Observable<OrderMstModel>();
  totalPoint: number = 0;

  params: any = {};

  actionOrderSuccessfull: string = "actionOrderSuccessfull";
  actionConfirmCancelOrderd: string = "actionConfirmCancelOrderd";
  method: string = "";

  point: number = 0;

  countInit: number = 0;
  countCancelOrder: number = 0;
  countPayCard: number = 0;
  countOrdMoneyTmp: number = 0;
  countOrdIns: number = 0;
  countVBank: number = 0;

  checkoutForm = this.fb.group({
    shipping: this.fb.group({
      rName: ["", [Validators.required]],
      rMobile: ["", [Validators.required]],
      rEmail: [""],
      rPost: ["", [Validators.required]],
      rAddr1: ["", [Validators.required]],
      rAddr2: [""],
      rAddr2Tmp: [""],
      rMemo: [""],
    }),
    card: this.fb.group({
      personal: this.fb.group({
        cardNo1: ["", [Validators.required]],
        cardNo2: ["", [Validators.required]],
        cardNo3: ["", [Validators.required]],
        cardNo4: ["", [Validators.required]],
        cardHolder: ["", [Validators.required]],
        cardMM: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        cardYY: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        cardPassword: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        cardInstall: ["00"],
        birthday: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        usePointPCard: ["0"]
      }),
      general: this.fb.group({
        cardNo1: ["", [Validators.required]],
        cardNo2: ["", [Validators.required]],
        cardNo3: ["", [Validators.required]],
        cardNo4: ["", [Validators.required]],
        cardHolder: ["", [Validators.required]],
        cardMM: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        cardYY: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        cardPassword: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        cardInstall: ["00"],
        birthday: [""],
        usePointGCard: ["0"]
      }),
    }),
    bank: this.fb.group({
      cardCd: ["", [Validators.required]],
      cardNo: ["", [Validators.required]],
      cardHolder: ["", [Validators.required]],
      cardAmt: ["", [Validators.required]],
      regDate: ["", [Validators.required]],
      authDate: ["", [Validators.required]],
      cashRcptNum: [""],
      cashRcptType: [""],
      usePointBank: ["0"]
    }),
    point: this.fb.group({
      totalPoint: ["0"],
      usePoint: ["0"],
    }),
    vBank: this.fb.group({
      vaccAdmitInfo: ["089", [Validators.required]],
      vaccAdmitName: ["", [Validators.required]],
      cashRcptYN: ["N"],
      cashRcptOpt1: ["1"],
      cashRcptOpt2: ["1"],
      cashRcptOpt3: [""],
      usePointVBank: ["0"]
    }),
    
  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _centerInfoStore: Store<CenterInfoState>,
    private _wAlertStore: Store<WAlertState>,
    private _smWownetStore: Store<SmWownetState>,
    private _cartStore: Store<CartState>,
    private _checkoutStore: Store<CheckoutState>,
    private _pageHeadingStore: Store<PageHeadingState>,
    private _kiccPaymentStore: Store<KICCPaymentState>,
    private _vbBankState: Store<VbBankState>,
    private _memberPointStore: Store<MemberPointState>,
    private _korPayStore: Store<KorPaymentState>
  ) { 
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.smWownetPg$ = this._smWownetStore.select(getSmWownetPg);
    this.orderInfo$ = this._cartStore.select(getCartInfo);
    this.cartItems$ = this._cartStore.select(getCartItems);
    this.resultOrdMoneyTmp$ = this._checkoutStore.select(getResultOrdMoneyTmp);
    this.resultOrdIns$ = this._checkoutStore.select(getResultOrdIns);
    this.cardResult$ = this._kiccPaymentStore.select(getKICCCardResult);
    this.payVBankResult$ = this._vbBankState.select(getSettleVBankResult);
    this.memberPoint$ = this._memberPointStore.select(getMemberPoint);
    this.smConfig$ = this._smWownetStore.select(getSmWownetConfig);
    this.korPayResult$ = this._korPayStore.select(payCardResult);
  }

  ngOnInit(): void {
    setTimeout(() => this._pageHeadingStore.dispatch(setTypePageHeading({ payload: "OTHER" })), 50);

    this._smWownetStore.dispatch(loadSmWownetConfig());
    let loginedInfo = AuthUtil.getLoginedInfo();
    if (loginedInfo) {
      this._centerInfoStore.dispatch(loadCenterInfo({ cntCd: ConvertUtil.convertToSring(loginedInfo.cntCd) }));
    }

    this.smWownet$.subscribe(res => this.smWownet = res);

    this.smWownetPg$.subscribe(res => {
      this.smWownetPg = res;
      if (ValidationUtil.isNotNullAndNotEmpty(res.comId)) {
        if (typeof addEventListenerForPaymentMethod === "function") {
          setTimeout(() => addEventListenerForPaymentMethod(), 500);
        }
      }
    });

    this.orderInfo$.subscribe(res => {
      this.orderInfo = res;
      if (this.countInit++ === 1 && !res) {
        this._router.navigate(["/"]);
      }
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.totalAmt)) {
        this.checkoutForm.patchValue({ bank: { cardAmt: ConvertUtil.setComma(res.totalAmt) } });
      }
    });

    this.memberPoint$.subscribe(res => {
      let totalPoint = "0";
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.havePoint)) {
        totalPoint = ConvertUtil.convertToSring(res.havePoint);
      }
      this.totalPoint = +totalPoint;
    });

    this.smConfig$.subscribe(res => {
      this.smConfig = res;
    });

    this.cartItems$.subscribe(res => this.cartItems = res);

    this.resultOrdMoneyTmp$.subscribe(res => this.handleOnSubscribeResultOrdMoneyTmp(res));

    this.resultOrdIns$.subscribe(res => this.handleOnSubscribeResultOrdIns(res));

    this.cardResult$.subscribe(res => this.handleOnSubscribeResultPayCard(res));

    this.payVBankResult$.subscribe(res => this.handleOnSubscribeResultPayVBank(res));

    this.korPayResult$.subscribe(res => this.handleOnSubscribeResultOrdIns(res))

    this.wAlertStatus$.subscribe(res => {
      if (res.action === this.actionOrderSuccessfull) {
        this.handleActionOrderSuccessfull(res);
      } else if (res.action === this.actionConfirmCancelOrderd) {
        this.handleActionConfirmCancel(res);
      }
    });

    this.setValuePointEvent();
    this.checkoutFormValueChangesEvent();

    if (typeof addEventListenerClickCheckCodition === "function") {
      setTimeout(() => addEventListenerClickCheckCodition(), 500);
    }
  }

  handleOnSubscribeResultKorPayCard(res: PaymentCardResult): void {
    if ( this.countPayCard === 1 && ValidationUtil.isNotNullAndNotEmpty(res.resCd)) {
      if (res.resCd === "0000" || res.resCd === "0021") {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        const params = { ...this.params, moneyNo: res.moneyNo, pgcno: res.moneyNo, cardAppNo: res.authNo, cardAppDate: res.authDate, cardCd: res.cardCd};
        this.params = params;
        this.saveOrderMoneyTmp(this.params);
      } else {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.resMsg } }));
      }
    }
  }

  handleOnSubscribeResultPayVBank(res: PaymentCardResult): void {
    if ( this.countVBank === 1 && ValidationUtil.isNotNullAndNotEmpty(res.resCd)) {
      if (res.resCd === "0021") {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        const params = { ...this.params, moneyNo: res.moneyNo, kind: environment.comCd + "s04", cardNo: res.cardNo, cardCd: res.cardCd };
        this.params = params;
        this.saveOrderMoneyTmp(this.params);
      } else {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.resMsg } }));
      }
    }
  }

  handleOnSubscribeResultPayCard(res: KICCCardModel): void {
    if ( this.countPayCard === 1 && ValidationUtil.isNotNullAndNotEmpty(res.resCd)) {
      if (res.resCd === "0000" || res.resCd === "0021") {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        const params = { ...this.params, moneyNo: res.orderNo, pgcno: res.trdNo, cardAppNo: res.accountNo, cardAppDate: res.authDate};
        this.params = params;
        this.saveOrderMoneyTmp(this.params);
      } else {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.resMsg } }));
      }
    }
  }

  handleOnSubscribeResultOrdMoneyTmp(res: ResultProc): void {
    if (this.countOrdMoneyTmp === 1 && ValidationUtil.isNotNullAndNotEmpty(res.retCode)) {
      this._kiccPaymentStore.dispatch(setCardResult({ cardResult: {} as KICCCardModel }));
      if (res.retCode === "OK") {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        this.saveOrder(this.params);
      } else {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.retStr } }));
      }

      this._checkoutStore.dispatch(setResultOrdMoneyTmp({ params: {} as ResultProc }));
    }
  }

  handleOnSubscribeResultOrdIns(res: ResultProc): void {
  if (this.countOrdIns === 1 && ValidationUtil.isNotNullAndNotEmpty(res.retCode)) {
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    if (res.retCode === "OK") {            
      let msg = `${res.retStr} <br> 주문번호는 ${res.keyValue} 입니다.`;
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: msg, action: this.actionOrderSuccessfull } }));
    } else {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.retStr } }));
    }
    }
  }
  
  handleOnClickCancelOrder(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.orderInfo)) {
      const ordNoTmp = this.orderInfo.ordNoTmp;
      if (ValidationUtil.isNotNullAndNotEmpty(ordNoTmp)) {
        this.countCancelOrder = 1;
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgConfirmCancelOrder, action: this.actionConfirmCancelOrderd } }));
      }
    }
  }

  handleActionConfirmCancel(status: WAlertStatus): void {
    if (status.isConfirm && this.countCancelOrder === 1) {
      this._wAlertStore.dispatch(clearWAlert());
      this._cartStore.dispatch(setIsBuyNow({ isBuyNow: false }));
      this._cartStore.dispatch(cancelOrder({ userid: ConvertUtil.convertToSring(this.orderInfo.userid), ordNoTmp: +this.orderInfo.ordNoTmp }));
      this.countCancelOrder = 0;
      setTimeout(() => this._router.navigate([MyProgramConstant.urlShopping]), 200);
    }
  }

  handleActionOrderSuccessfull(status: WAlertStatus): void {
    this._cartStore.dispatch(clearWAlert());
    this._kiccPaymentStore.dispatch(setCardResult({ cardResult: {} as KICCCardModel }));
    this.resetResultAction();
    this._cartStore.dispatch(setReload({ reload: true }));
    this._router.navigate(["/"]);
  }

  handleOnSubmit(): void {
    this._kiccPaymentStore.dispatch(setCardResult({ cardResult: {} as KICCCardModel }));

    this.getMethod();
    this.convertOrderData();

    this.countOrdMoneyTmp = 0;
    this.countOrdIns = 0;
    this.countPayCard = 0;

    let msg = this.getMessageValidation();
    if (ValidationUtil.isNotNullAndNotEmpty(msg)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: msg } }));
      return;
    }
    
    this.paymentByMethod();
  }

  paymentByMethod(): void {
    if (this.method === PaymentMethodConstant.vBank) {
      this.payVBank(this.params);
    } else if (this.method === PaymentMethodConstant.bank) {
      this.saveOrderMoneyTmp(this.params);
    } else if (this.method === PaymentMethodConstant.cardGeneral || this.method === PaymentMethodConstant.cardPersonal) {
      this.payCard(this.params);
    } else if(this.method === PaymentMethodConstant.point){
      this.saveOrderMoneyTmp(this.params);
    }
  }

  getMethod(): void {
    this.method = "";
    let _selector = document.querySelector("input[name=PaymentMethodRadio]:checked");
    if (_selector) {
      let _method = _selector.getAttribute("value");

      if (_method === "1") {
        _selector = document.querySelector(".w-card.active");
        if (_selector) {
          let _type = _selector.getAttribute("data-index");
          if (_type === "1") {
            this.method = PaymentMethodConstant.cardPersonal;
          } else if (_type === "2") {
            this.method = PaymentMethodConstant.cardGeneral;
          }
        }

      } else if (_method === "3") {
        this.method = PaymentMethodConstant.bank;
      } else if (_method === "4") {
        this.method = PaymentMethodConstant.vBank;
      } else if (_method === "5"){
        this.method = PaymentMethodConstant.point;
      }
    }
  }
  getMessageValidation(): string {
    let temp1: any;
    let temp2: any;
    let temp3: any;
    let temp4: any;

    let msg = "";

    let shipping = this.checkoutForm.get("shipping");

    temp1 = document.getElementById("checkAll");
    if (temp1 && temp1.checked !== true) {
      msg += MessageConstant.msgConditionRequired;
      msg += "<br>";
    }

    temp1 = shipping?.get("rName")?.errors;
    if (temp1 && temp1.required) {
      msg += MessageConstant.msgRNameRequired;
      msg += "<br>";
    }

    temp1 = shipping?.get("rMobile")?.errors;
    if (temp1 && temp1.required) {
      msg += MessageConstant.msgRMobileRequired;
      msg += "<br>";
    }

    temp1 = shipping?.get("rPost")?.errors;
    temp2 = shipping?.get("rAddr1")?.errors;
    if ((temp1 && temp1.required) || (temp2 && temp2.required)) {
      msg += MessageConstant.msgRAddressRequired;
      msg += "<br>";
    }

    if (this.method === PaymentMethodConstant.bank) {
      let bank = this.checkoutForm.get("bank");

      temp1 = bank?.get("regDate")?.errors;
      if (temp1 && temp1.required) {
        msg += MessageConstant.msgBankRegDateRequired;
        msg += "<br>";
      }

      temp1 = bank?.get("cardHolder")?.errors;
      if (temp1 && temp1.required) {
        msg += MessageConstant.msgBankCardHolderRequired;
        msg += "<br>";
      }
    } else if (this.method === PaymentMethodConstant.cardGeneral || this.method === PaymentMethodConstant.cardPersonal) {
      let card: any = this.checkoutForm.get("card");
      if (card) {
        if (this.method === PaymentMethodConstant.cardPersonal) {
          card = card.get("personal");
        } else if (this.method === PaymentMethodConstant.cardGeneral) {
          card = card.get("general");
        }
        if (card) {
          temp1 = card?.get("cardNo1")?.errors;
          temp2 = card?.get("cardNo2")?.errors;
          temp3 = card?.get("cardNo3")?.errors;
          temp4 = card?.get("cardNo4")?.errors;
          if ((temp1 && temp1.required) || (temp2 && temp2.required) || (temp3 && temp3.required) || (temp4 && temp4.required)) {
            msg += MessageConstant.msgCardNoRequired;
            msg += "<br>";
          }
      
          temp1 = card?.get("cardHolder")?.errors;
          if (temp1 && temp1.required) {
            msg += MessageConstant.msgCardHolderRequired;
            msg += "<br>";
          }
      
          temp1 = card?.get("cardMM")?.errors;
          temp2 = card?.get("cardYY")?.errors;
          if ((temp1 && temp1.required) || (temp2 && temp2.required)) {
            msg += MessageConstant.msgCardYYMMRequired;
            msg += "<br>";
          } else if ((temp1 && temp1.minlength) || (temp2 && temp2.minlength) || (temp1 && temp1.maxlength) || (temp2 && temp2.maxlength)) {
            msg += MessageConstant.msgCardYYMMInvalid;
            msg += "<br>";
          }
      
          temp1 = card?.get("birthday")?.errors;
          if (this.method == PaymentMethodConstant.cardPersonal) {
            if ((temp1 && temp1.required)) {
              msg += MessageConstant.msgCardBirthdayRequired;
              msg += "<br>";
            } else if ((temp1 && temp1.minlength) || (temp1 && temp1.maxlength)) {
              msg += MessageConstant.msgCardBirthdayInvalid;
              msg += "<br>";
            }
          } else if (this.method == PaymentMethodConstant.cardGeneral) {
            if ((temp1 && temp1.required)) {
              msg += MessageConstant.msgCardBusinessNoRequired;
              msg += "<br>";
            }
          }
      
          temp1 = card?.get("cardPassword")?.errors;
          if ((temp1 && temp1.required)) {
            msg += MessageConstant.msgCardPasswordRequired;
            msg += "<br>";
          } else if ((temp1 && temp1.minlength) || (temp1 && temp1.maxlength)) {
            msg += MessageConstant.msgCardPasswordInvalid;
            msg += "<br>";
          }
        }
      }
    } 
    else if(this.method === PaymentMethodConstant.point){
      const form = this.checkoutForm.value;
      let temp1 = form.point?.usePoint?.replace(/,/gi, "");
      let totalAmt = this.orderInfo.totalAmt;

      if(Number(temp1) !== totalAmt){
        msg += '결제할 마일리지가 부족합니다.';
            msg += "<br>";
      }
    }
    // else if (this.method === PaymentMethodConstant.vBank) {

    //   let vBank = this.checkoutForm.get("vBank");
    //   // vaccAdmitInfo


    //   temp1 = vBank?.get("vaccAdmitInfo")?.errors;
    //   if (temp1 && temp1.required) {
    //     msg += "TEX1 1"
    //     msg += "<br>";
    //   }

    //   temp2 = vBank?.get("vaccAdmitName")?.errors;
    //   if (temp2 && temp2.required) {
    //     msg += "TEX1 2"
    //     msg += "<br>";
    //   }

    //   temp3 = vBank?.get("cashRcptYN")?.errors;
    //   if (temp3 && temp3.required) {
    //     msg += "TEX1 3"
    //     msg += "<br>";
    //   }
    // }


    return msg;
  }

  handleOnClickToggleZipPopup(show: boolean): void {
    this.showZipPopup = show;
  }

  handleOnClickRowZipPopup(zip: Zip): void {
    this.checkoutForm.patchValue({
      shipping: {
        rPost: ConvertUtil.convertToSring(zip.address),
        rAddr1: ConvertUtil.convertToSring(zip.zipCode),
        rAddr2Tmp: ConvertUtil.convertToSring(zip.jibun),
        rAddr2: "",
      }
    });
  }
  
  handleOnClickToggleDeliPopup(show: boolean): void {
    this.showDeliPopup = show;
  }

  handleOnClickRowDeliPopup(item: OrderMstModel): void {
    this.checkoutForm.patchValue({
      shipping: {
        rName: ConvertUtil.convertToSring(item.rname),
        rEmail: ConvertUtil.convertToSring(item.rEMail),
        rMobile: ConvertUtil.convertToSring(item.rTel),
        rPost: ConvertUtil.convertToSring(item.rPost),
        rAddr1: ConvertUtil.convertToSring(item.rAddr1),
        rAddr2: ConvertUtil.convertToSring(item.rAddr2),
      }
    });
  }

  convertOrderData(): any {
    const form = this.checkoutForm.value;
    const loginedInfo = AuthUtil.getLoginedInfo();

    let regDate = this.today.getFullYear() + ConvertUtil.convertToZeroDecimal(this.today.getMonth() + 1) + ConvertUtil.convertToSring(this.today.getDate());

    let cardAmt = this.orderInfo.totalAmt;
    let kind = "";
    let point;

    if (this.method === PaymentMethodConstant.bank) {
      kind = environment.comCd + "s03";
      point = form.bank?.usePointBank?.replace(/,/gi, "");
    } else if (this.method === PaymentMethodConstant.cardPersonal || this.method === PaymentMethodConstant.cardGeneral) {
      kind = environment.comCd + "s02";
      if(this.method === PaymentMethodConstant.cardPersonal){
        point = form.card?.personal?.usePointPCard?.replace(/,/gi, "");
      } else {
        point = form.card?.general?.usePointGCard?.replace(/,/gi, "");
      }
    } else if (this.method === PaymentMethodConstant.vBank){
      kind = environment.comCd + "s04";
      point = form.vBank?.usePointVBank?.replace(/,/gi, "");
    } else if (this.method === PaymentMethodConstant.point){
      point = form.point?.usePoint?.replace(/,/gi, "");
    }

    if (!point) {
      point = "0";
    }
    if (this.orderInfo.totalAmt === +point) {
      kind = environment.comCd + "s06";
      cardAmt = +point;
      point = "0";
    } else {
      cardAmt = +this.orderInfo.totalAmt - +point;
    }

    let deliKind = "DELI-M";
    let shipingType = document.querySelector("input[name='shippingRadio']:checked")?.getAttribute("value");
    if (shipingType === "3") {
      deliKind = "DELI-C";
    }

    let pdtCd = "";
    if (ValidationUtil.isNotNullAndNotEmpty(this.cartItems)) {
      pdtCd = ConvertUtil.convertToSring(this.cartItems[0].pdtCD);
    }

    let accDate = regDate;
    let cashRcptType = "00";
    let cashRcptNum = "";
    if (kind.endsWith("s03")) {
      accDate = ConvertUtil.convertToSring(form.bank?.authDate).replace(/-/gi, "");
      cashRcptType = ConvertUtil.convertToSring(form.bank?.cashRcptType);
      cashRcptNum = ConvertUtil.convertToSring(form.bank?.cashRcptNum);
    }

    let kindCd = environment.comCd + "O01";
    let pathCd = environment.comCd + "T30";

    let cardCd = "";
    let cardNo = "";
    let cardInstall = "00";
    let cardHolder = "";
    let cardYYMM = "";
    let cardPassword = "";
    let birthday = "";
    let billType = "";
    let cardExpYear = ""
    let cardExpMonth = ""

    let customerType = "";
    let reqType = "";
    let certType = "";
    let freeInstallmentTypeCode = "";
    let userType = "";

    if (this.method === PaymentMethodConstant.cardPersonal || this.method === PaymentMethodConstant.cardGeneral) {
      reqType = "0";
      certType = "0";
      freeInstallmentTypeCode = "00";
      
      if (this.method === PaymentMethodConstant.cardGeneral) {
        customerType = "1";
      } else if (this.method === PaymentMethodConstant.cardPersonal) {
        customerType = "2";
      }
    }

    if (this.method === PaymentMethodConstant.cardPersonal) {
      userType = "0";
      let card = form.card?.personal;
      if (card) {
        cardNo += ConvertUtil.convertToSring(card.cardNo1);
        cardNo += ConvertUtil.convertToSring(card.cardNo2);
        cardNo += ConvertUtil.convertToSring(card.cardNo3);
        cardNo += ConvertUtil.convertToSring(card.cardNo4);
        cardInstall = ConvertUtil.convertToSring(card.cardInstall);
        cardHolder = ConvertUtil.convertToSring(card.cardHolder);
        cardYYMM = ConvertUtil.convertToSring(card.cardYY) + ConvertUtil.convertToSring(card.cardMM);
        cardExpYear = ConvertUtil.convertToSring(card.cardYY);
        cardExpMonth = ConvertUtil.convertToSring(card.cardMM);
        cardPassword = ConvertUtil.convertToSring(card.cardPassword);
        birthday = ConvertUtil.convertToSring(card.birthday);
        billType = "13"
      }
    } else if (this.method === PaymentMethodConstant.cardGeneral) {
      userType = "1";
      let card = form.card?.general;
      if (card) {
        cardNo += ConvertUtil.convertToSring(card.cardNo1);
        cardNo += ConvertUtil.convertToSring(card.cardNo2);
        cardNo += ConvertUtil.convertToSring(card.cardNo3);
        cardNo += ConvertUtil.convertToSring(card.cardNo4);
        cardInstall = ConvertUtil.convertToSring(card.cardInstall);
        cardHolder = ConvertUtil.convertToSring(card.cardHolder);
        cardYYMM = ConvertUtil.convertToSring(card.cardYY) + ConvertUtil.convertToSring(card.cardMM);
        cardExpYear = ConvertUtil.convertToSring(card.cardYY);
        cardExpMonth = ConvertUtil.convertToSring(card.cardMM);
        cardPassword = ConvertUtil.convertToSring(card.cardPassword);
        birthday = ConvertUtil.convertToSring(card.birthday);
        billType = "14"
      }
    } else if (this.method === PaymentMethodConstant.bank) {
      let bank = form.bank;
      if (bank) {
        cardNo = ConvertUtil.convertToSring(bank.cardNo).replace(/-/gi, "");
        cardCd = ConvertUtil.convertToSring(bank.cardCd);
        cardHolder = ConvertUtil.convertToSring(bank.cardHolder);
      }
    }

    let pdtName = "";
    if (ValidationUtil.isNotNullAndNotEmpty(this.cartItems)) {
      pdtName = ConvertUtil.convertToSring(this.cartItems[0].pdtName);
    }

    const data = {
      comCd: environment.comCd,
      comId: environment.comId,
      ordNoTmp: this.orderInfo.ordNoTmp,
      userid: ConvertUtil.convertToSring(loginedInfo?.userid),
      workUser : ConvertUtil.convertToSring(loginedInfo?.userid),
      username: ConvertUtil.convertToSring(loginedInfo?.username),

      customerType: customerType,
      typeMethodOfCard : customerType == "1" ? 'corporationCard' : 'generalCard',
      reqType: reqType,
      certType: certType,
      freeInstallmentTypeCode: freeInstallmentTypeCode,
      userType: userType,

      kind: kind,
      regDate: regDate,
      amt: cardAmt,
      cardAmt: cardAmt,
      amtUsed: cardAmt,
      remark: "",
      cardCd: cardCd,
      cardRate: "",
      cardInstall: cardInstall,
      cardInstall1: cardInstall,
      cardNo: cardNo,
      cardHolder: cardHolder,
      cardOwner : cardHolder,
      cardYYMM: cardYYMM,
      expiryDate: cardYYMM,
      cardExpYear : cardExpYear,
      cardExpMonth : cardExpMonth,
      cardAppNo: "",
      cardAppDate: accDate,
      cardPw: cardPassword,
      cardAuth: birthday,
      birthday: birthday,
      billType: billType,

      deliKind: deliKind,
      deliAmt: this.orderInfo.deliAmt,
      ordDate: regDate,
      bName: ConvertUtil.convertToSring(loginedInfo?.username),
      bMobile: ConvertUtil.convertToSring(loginedInfo?.mobile),
      email: ConvertUtil.convertToSring(loginedInfo?.email),
      bEmail: ConvertUtil.convertToSring(loginedInfo?.email),
      bPost: ConvertUtil.convertToSring(loginedInfo?.post),
      bAddr1: ConvertUtil.convertToSring(loginedInfo?.addr1),
      bAddr2: ConvertUtil.convertToSring(loginedInfo?.addr2),
      bUserid: ConvertUtil.convertToSring(loginedInfo?.userid),
      rMemo: form.shipping?.rMemo,
      rName: form.shipping?.rName,
      rMobile: form.shipping?.rMobile,
      rPost: form.shipping?.rPost,
      rState: "",
      rCity: "",
      rCounty: "",
      rAddr1: form.shipping?.rAddr1,
      rAddr2: !form.shipping?.rAddr2 ? form.shipping?.rAddr2Tmp : form.shipping?.rAddr2,
      pdtCd: pdtCd,

      //vBank
      bankCd: form.vBank?.vaccAdmitInfo,
      dpstrNm: form.vBank?.vaccAdmitName,
      csrcIssReqYn:form.vBank?.cashRcptYN,
      cashRcptPrposDivCd: form.vBank?.cashRcptOpt1,
      csrcRegNoDivCd: form.vBank?.cashRcptOpt2,
      csrcRegNo: form.vBank?.cashRcptOpt3,

      accDate: regDate,
      cntCd: ConvertUtil.convertToSring(loginedInfo?.cntCd),
      kindCd: kindCd,
      kindCD: kindCd,
      pathCd: pathCd,
      pathCD: pathCd,

      cashrcptType: cashRcptType,
      cashrcptNum: cashRcptNum,

      ctrCd: ConvertUtil.convertToSring(loginedInfo?.ctrCd),
      userKindCd: ConvertUtil.convertToSring(loginedInfo?.userKindCd),
      usedPoint: point,

      pdtName: pdtName,
    };

    this.params = data;
  }

  payVBank(params: any): void {
    this.countVBank = 1;
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._vbBankState.dispatch(payVBank({params: params}));
  }

  saveOrderMoneyTmp(params: any): void {
    this.countOrdMoneyTmp = 1;
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._checkoutStore.dispatch(saveOrderMoneyTmp({ params: params }));
  }

  payCard(params: any): void {
    this.countPayCard = 1;
    this.countOrdIns = 1;
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._korPayStore.dispatch(payCardKor({params: params}));
  }

  saveOrder(params: any): void {
    this.countOrdIns = 1;
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._checkoutStore.dispatch(saveOrder({ params: params }));
  }

  checkoutFormValueChangesEvent(): void {
    const pointForm = this.checkoutForm.get("point");
    if (pointForm) {
      pointForm.get("usePoint")?.valueChanges.subscribe(value => {
        if (value) {
          const totalAmt = +this.orderInfo.totalAmt;
          this.point = +value.replace(/,/gi, "");
          //this.checkoutForm.patchValue({ bank: { cardAmt: ConvertUtil.setComma(totalAmt - this.point) } });
        }
      })
    }

    const formBank = this.checkoutForm.get("bank");
    if (formBank) {
      formBank.get("usePointBank")?.valueChanges.subscribe(value => {
        if (value) {
          const totalAmt = +this.orderInfo.totalAmt;
          this.point = +value.replace(/,/gi, "");
          this.checkoutForm.patchValue({ bank: { cardAmt: ConvertUtil.setComma(totalAmt - this.point) } });
        }
      })  
    }

    const formVBank = this.checkoutForm.get("vBank");
    if (formVBank) {
      formVBank.get("usePointVBank")?.valueChanges.subscribe(value => {
        if (value) {
          const totalAmt = +this.orderInfo.totalAmt;
          this.point = +value.replace(/,/gi, "");
        }
      })
    }

    const formPCard = this.checkoutForm.get("card")?.get("personal");
    if (formPCard) {
      formPCard.get("usePointPCard")?.valueChanges.subscribe(value => {
        if (value) {
          const totalAmt = +this.orderInfo.totalAmt;
          this.point = +value.replace(/,/gi, "");
        }
      })
    }

    const formGCard = this.checkoutForm.get("card")?.get("general");
    if (formGCard) {
      formGCard.get("usePointGCard")?.valueChanges.subscribe(value => {
        if (value) {
          const totalAmt = +this.orderInfo.totalAmt;
          this.point = +value.replace(/,/gi, "");
        }
      })
    }
  }

  setValuePointEvent(): void {
    let _selector = document.querySelector("input[name=PaymentMethodRadio]:checked");
    if (_selector) {
      let _method = _selector.getAttribute("value");

      if (_method === "1") {
        this.checkoutForm.patchValue({ card: { general: {usePointGCard: ConvertUtil.setComma(0)} } });
        this.checkoutForm.patchValue({ card: { personal: {usePointPCard: ConvertUtil.setComma(0)} } });
      } else if (_method === "3") {
        this.checkoutForm.patchValue({ bank: { usePointBank: ConvertUtil.setComma(0) } });
      } else if (_method === "4") {
        this.checkoutForm.patchValue({ vBank: { usePointVBank: ConvertUtil.setComma(0) } });
      } else if (_method === "5"){
        this.checkPoint(this.totalPoint);
      }
    }
  }

  checkPoint(usePoint: number): void {
    if (ValidationUtil.isNullOrEmpty(this.orderInfo)) return;
    if (ValidationUtil.isNullOrEmpty(this.orderInfo.totalAmt)) return;

    let minPoint = 0;
    let rate = 100;
    let totalAmt = +this.orderInfo.totalAmt;
    
    if (ValidationUtil.isNotNullAndNotEmpty(this.smConfig)) {
      if (ValidationUtil.isNotNullAndNotEmpty(this.smConfig.oUseMinPoint)) {
        minPoint = this.smConfig.oUseMinPoint;
      }
      if (ValidationUtil.isNotNullAndNotEmpty(this.smConfig.oUsePointRate)) {
        rate = this.smConfig.oUsePointRate;
      }
    }

    let realPoint = totalAmt * rate / 100;
    
    if (realPoint > this.totalPoint) {
      realPoint = this.totalPoint;
    }

    let newPoint = usePoint;
    if (usePoint > 0) {
      if (usePoint < minPoint) {
        let msg = `마일리지로 결제하려면 현재 마일리지가 ${ConvertUtil.setComma(minPoint)} 이상 되어야 합니다.`;
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: msg } }));
        newPoint = 0;
      } else if (realPoint > 0) {
        if (usePoint > realPoint) {
          newPoint = realPoint;
        } else if (usePoint > this.totalPoint) {
          newPoint = this.totalPoint;
        }
      }
    }
    this.checkoutForm.patchValue({ point: { usePoint: ConvertUtil.setComma(newPoint) } });
  }

  resetResultAction(): void {
    this.countOrdMoneyTmp = 0;
    this.countOrdIns = 0;
    this.countPayCard = 0;

    this._checkoutStore.dispatch(setResultOrdMoneyTmp({ params: {} as ResultProc }));
    this._checkoutStore.dispatch(setResultOrdIns({ params: {} as ResultProc }));
  }

  get searchPost(): string {
    return ConvertUtil.convertToSring(this.checkoutForm.get("shipping")?.get("rPost")?.value);
  }
}
