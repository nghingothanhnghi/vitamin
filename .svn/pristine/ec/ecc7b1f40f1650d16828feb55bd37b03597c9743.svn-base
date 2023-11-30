import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Bank } from '@app/models/system/bank.model';
import { ApiResultMember } from '@app/models/system/api-result-member.model';
import { CountryModel } from '@app/models/system/country.model';
import { BankState, getBank } from '@app/selectors/system/bank.selector';
import { CountryState, getCountrys } from '@app/selectors/system/country.selector';
import { VerifyState, verify } from '@app/selectors/system/verify.selector';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import * as bankAction from '@app/actions/system/bank.actions';
import * as countryAction from '@app/actions/system/country.action';
import * as verifyAction from '@app/actions/system/verify.actions';
import { MemberConstants } from '@app/common/constant/member.constant';
import { environment } from '@enviroments/environment';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { Router } from '@angular/router';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';

@Component({
  selector: 'app-member-registration-step2',
  templateUrl: './member-registration-step2.component.html',
  styleUrls: ['./member-registration-step2.component.css']
})
export class MemberRegistrationStep2Component implements OnInit  {

  focusStr:string = ''

  isAccNoReadonly :boolean = false;
  isDepositorReadonly :boolean = false;
  isBirthdayReadonly :boolean = false;
  isDropDownReadonly :boolean = false;
  //
  // agreementCheck:boolean = false;
  bankCd:string = ''
  accNo:string = ''
  username:string = ''
  birthday:string = ''

  apiResultMember$ = new Observable<ApiResultMember>();

  banks$ = new Observable<Bank[]>();
  bankOptions: SelectDropdownModel[] = [];
  bankSelected: SelectDropdownModel = new SelectDropdownModel();

  countrys$ = new Observable<CountryModel[]>();
  countryOptions: SelectDropdownModel[] = [];
  countrySelected: SelectDropdownModel = new SelectDropdownModel();

  wAlertStatus$ = new Observable<WAlertStatus>();
  
  readonly urlStep1 = MemberConstants.URL_STEP1

  constructor(
    private bankStore: Store<BankState>,
    private countryStore: Store<CountryState>,
    private verifyStore: Store<VerifyState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _router: Router,
    private _wAlertStore: Store<WAlertState>,
    ) { 
    this.banks$ = this.bankStore.select(getBank);
    this.countrys$ = this.countryStore.select(getCountrys);
    this.apiResultMember$ = this.verifyStore.select(verify);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }
  

  ngOnInit(): void {
   
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    let data = window.sessionStorage.getItem(MemberConstants.STR_IS_DONE_STEP_1);
		if (!(data == "true")) {
      this._router.navigate([MemberConstants.URL_STEP1]);
		}
    this.bankStore.dispatch(bankAction.loadBank('BANK'));
    this.countryStore.dispatch(countryAction.loadCountrys());
    this.banks$.subscribe(res => {
      if (res) {
        this.bankOptions = [];
        res.forEach((item) =>{
          if(item.useYn == 'Y'){
            this.bankOptions.push({ label: `${item.bankCd} ${item.bankName}`, value:`${item.bankCd} ${item.sendCtCd} ${item.bankName}` });
          }
        })
        this.bankSelected = this.bankOptions[0];
        if(this.bankOptions.length>0){
          this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        }
      }
    });
    this.countrys$.subscribe(res => {
      this.countryOptions = [];
      res.forEach((item) => this.countryOptions.push({ label: item.ctrName, value: item.ctrCd + ' '+ item.ctrName }));
      this.countrySelected = this.countryOptions[0];
    });
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }
  goPage() {
    if (this.isBirthdayReadonly == false) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgCheckAccount}}));
      return;
    }
    // if (this.agreementCheck == false) {
    //   this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgAgreeTerm}}));
    //   return;
    // }

    var accountBank = this.getAccountBank();
    var ctrCd = this.countrySelected.value.split(" ")[0];
    var ctrName = this.countrySelected.value.split(" ")[1];

    localStorage.setItem("account", JSON.stringify(accountBank))
    localStorage.setItem("ctrCd", ctrCd)
    localStorage.setItem("ctrName", ctrName)

    window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_2, 'true');
    this._router.navigate([MemberConstants.URL_STEP3]);
  }

  getAccountBank(){
    var username = this.username;
    var accNo = this.accNo;
    var bankName = this.bankSelected.value.split(" ")[2];
    var bankCd = this.bankSelected.value.split(" ")[0];
    var birthday = this.birthday;
    var sendCtCd = this.bankSelected.value.split(" ")[1];

    return {userName: username, bankName: bankName, accountNo: accNo, bankCd: bankCd, birthday: birthday, sendCtCd: sendCtCd};
  }

  hanldeOnChangeBankSelectedValue(selected: SelectDropdownModel): void {
    this.bankSelected = selected;
  }
  hanldeOnChangeCountrySelectedValue(selected: SelectDropdownModel): void {
    this.countrySelected = selected;
  }

  ACTION_VALIDATION_ERR: string = 'ACTION_VALIDATION_ERR'
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.ACTION_VALIDATION_ERR) {
      const input = document.getElementById(this.focusStr);
        if(input){
          input.focus()
        }
    }
  }
 verifyBank() {
 const params =this.getParams();

  var error = this.validationApi();
  if(error.msg != ''){
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: error.msg, action: this.ACTION_VALIDATION_ERR }}));
    this.focusStr = error.focus
  }
  else{
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.verifyStore.dispatch(verifyAction.verify({ params: params }))

    this.apiResultMember$.subscribe(res => {
      if(res && res.status){
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        if(res.status.includes("Y")){
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: res.resultMsg}}));
          this.isAccNoReadonly = true;
          this.isDepositorReadonly  = true;
          this.isBirthdayReadonly  = true;
          this.isDropDownReadonly = true;
        }else{
          let msg = res.resultMsg.split('\\n').join('<br/>')
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: msg}}));
        }
        this.verifyStore.dispatch(verifyAction.clearResVerify())
      }
    });
  }
}



getParams(): any {
  this.birthday = this.birthday.split('.').join('x')
  let birthdayT = this.birthday
  if(this.birthday.length == 8){
    birthdayT = this.birthday.substring(2, this.birthday.length)
  }
  let params = {
    comId: environment.comId,
    userName: this.username,
    accountNo: this.accNo ,
    birthDay: birthdayT,
    certifyMethod: MemberConstants.CERTIFY_METHOD,
    bankCode : this.bankSelected.value.split(" ")[1]
  }

  return params;
}


validationApi(){
  
   var error= '';
   var focus = '';
   var birthday = this.birthday;
   var username =this.username
   var accNo = this.accNo;
   var bankCd = this.bankSelected.value;

  if (username == ''){
    error = error + '카드 소유주를 입력해 주시기 바랍니다.';
    error = error + '<br/>';
    if(focus == ''){
      focus = 'depositor';
    }
  }
  if(birthday == '' || birthday.length < 8){
    error = error + '생년월일을 입력하세요(8자리).';
    error = error + '<br/>';
    if(focus == ''){
      focus = 'birthday';
    }
  }
  if(bankCd == '' || bankCd == null){
    error = error + '은행을 선택하세요.';
    error = error + '<br/>';
    if(focus == ''){
      focus = 'bankTxt';
    }
  }
  if(accNo == ''){
    error = error + '계좌번호를 입력하세요.';
    error = error + '<br/>';
    if(focus == ''){
      focus = 'accNo';
    }
  }
   return {msg: error, focus: focus};
}
}
