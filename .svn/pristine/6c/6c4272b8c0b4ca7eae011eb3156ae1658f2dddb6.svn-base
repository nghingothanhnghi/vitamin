import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { PaymentBankModel } from '@app/models/shoppingmall/payment-bank.model';
import { getPaymentBanks, PaymentBankState } from '@app/selectors/shoppingmall/payment-bank.selector';
import { loadPaymentBanks } from '@app/actions/shoppingmall/payment-bank.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { getMemberPoint, MemberPointState } from '@app/selectors/shoppingmall/member-point.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { setWAlert } from '@app/actions/w-alert.action';
import { CartState, getCartInfo } from '@app/selectors/shoppingmall/cart.selector';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

@Component({
  selector: 'payment-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  today = new Date();

  @Input() 
  orderInfo: OrderMstModel = {} as OrderMstModel;

  @Input()
  smWownetPg: SmWownetPgModel = {} as SmWownetPgModel;

  @Input() 
  formGroupName: string = "";

  form: FormGroup = {} as FormGroup;

  smConfig$ = new Observable<SmWownetConfigModel>();
  smConfig: SmWownetConfigModel = {} as SmWownetConfigModel;

  paymentBanks$ = new Observable<PaymentBankModel[]>();
  paymentBanks: PaymentBankModel[] = [];

  paymentBankOptions: SelectDropdownModel[] = [];
  paymentBankSelected: SelectDropdownModel = {} as SelectDropdownModel;

  memberPoint$ = new Observable<OrderMstModel>();
  totalPoint: number = 0;

  cashReceiptOptions: SelectDropdownModel[] = [
    { label: "미발행", value: "00" },
    { label: "개인소득공제", value: "20" },
    { label: "사업자증빙용", value: "30" },
  ];
  cashReceiptSelected: SelectDropdownModel = this.cashReceiptOptions[0];

  showIssuanceRequestNumber: boolean = false;

  constructor(
    private _rootFormGroup: FormGroupDirective,
    private _paymentBankStore: Store<PaymentBankState>,
    private _memberPointStore: Store<MemberPointState>,
    private _wAlertStore: Store<WAlertState>,
    private _smWownetStore: Store<SmWownetState>,
    private _cartStore: Store<CartState>
  ) { 
    this.smConfig$ = this._smWownetStore.select(getSmWownetConfig);
    this.paymentBanks$ = this._paymentBankStore.select(getPaymentBanks);
    this.memberPoint$ = this._memberPointStore.select(getMemberPoint);
  }

  ngOnInit(): void {
    this._paymentBankStore.dispatch(loadPaymentBanks());

    this.form = this._rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.paymentBanks$.subscribe(res => {
      this.paymentBanks = res;
      this.paymentBankOptions = [];
      let index = 0;
      for (const item of this.paymentBanks) {
        this.paymentBankOptions.push({
          label: item.bankName + " - " + item.accNo + "(" + item.depositor + ")",
          value: ConvertUtil.convertToSring(index++)
        });
      }
      if (ValidationUtil.isNotNullAndNotEmpty(this.paymentBankOptions)) {
        this.paymentBankSelected = this.paymentBankOptions[0];
        this.initBank();
      } else {
        this.paymentBankSelected = { label: "", value: "" };
        this.paymentBankOptions = [this.paymentBankSelected];
      }
      this.handleOnChangeSelectedCashReceipt(this.cashReceiptOptions[0]);
    });

    this.memberPoint$.subscribe(res => {
      let totalPoint = "0";
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.havePoint)) {
        totalPoint = ConvertUtil.convertToSring(res.havePoint);
      }
      this.totalPoint = +totalPoint;
      this.form.patchValue({ point: { totalPoint: totalPoint } });
    });

    this.smConfig$.subscribe(res => {
      this.smConfig = res;
    });

  }

  handleOnChangeSelectedBankBook(selected: SelectDropdownModel): void {
    this.paymentBankSelected = selected;
    let index = +selected.value;
    let bank = this.getBankInfo(index);
    this.form.patchValue({
      cardCd: ConvertUtil.convertToSring(bank.bankCd),
      cardNo: ConvertUtil.convertToSring(bank.accNo),
    });
  }

  handleOnChangeSelectedCashReceipt(selected: SelectDropdownModel): void {
    this.cashReceiptSelected = selected;
    this.showIssuanceRequestNumber = false;
    if (selected.value === "20" || selected.value === "30") {
      this.showIssuanceRequestNumber = true;
    }
    this.form.patchValue({ cashRcptType: selected.value });
  }

  initBank(): void {
    let loginedInfo = AuthUtil.getLoginedInfo();
    let bank = this.getBankInfo(0);
    let regDate = ConvertUtil.convertToZeroDecimal(this.today.getFullYear()) + "-" + ConvertUtil.convertToZeroDecimal(this.today.getMonth() + 1) + "-" + ConvertUtil.convertToZeroDecimal(this.today.getDate()); 
    if (loginedInfo) {
      this.form.patchValue({
        cardCd: ConvertUtil.convertToSring(bank.bankCd),
        cardNo: ConvertUtil.convertToSring(bank.accNo),
        cardHolder: ConvertUtil.convertToSring(loginedInfo.username),
        regDate: regDate.replace(/-/gi, ""),
        authDate: regDate,
      })
    }
  }  

  getBankInfo(index: number): PaymentBankModel {
    return this.paymentBanks[index];
  }

  handleOnKeyUpNumber(_e: any): void {
    let value = _e.value;
    if (value) {
      value = value.replace(/[^0-9-+]/g, "");
    } else {
      value = "";
    }
    _e.value = value;
  }

  handleOnChangeUsePointBank(_e: any): void {
    let value = _e.value;
    if (value) {
      var usePoint = value.replace(/[^0-9-+]/g, "");
      this.checkMemberPointBank(+usePoint);
    } else {
      this.checkMemberPointBank(0);
    }
  }

  checkMemberPointBank(usePoint: number): void {
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
    this.form.patchValue({ usePointBank: ConvertUtil.setComma(newPoint) });
  } 
}
