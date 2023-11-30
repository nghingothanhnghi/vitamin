import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MemberRegistState, checkEmail, checkMobile, save } from '@app/selectors/myoffice/member/member-regist.selector';
import { ResultProc } from '@app/models/system/result-proc.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import * as memRegistAction from '@app/actions/myoffice/member/member-regist.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { DateUtils } from '@app/common/util/date.util';
import { Zip } from '@app/models/system/zip.model';
import { MemberConstants } from '@app/common/constant/member.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import * as memberInforInquirySelector from '@selectors/myoffice/member/member-infor-inquiry.selector'
import { MemInfo } from '@models/myoffice/member/mem-info.model';
import { Member } from '@models/myoffice/member/member.model';
import * as memberInforInquiryAction from "@app/actions/myoffice/member/member-infor-inquiry.actions"
import { loadCodesE } from '@app/actions/system/code.action';
import { CodeState, getCodesE } from '@app/selectors/system/code.selector';
import { CodeModel } from '@app/models/system/code.model';
import { AuthUtil } from '@app/common/util/auth.util';
import { loadSmWownet, loadSmWownetConfig, loadSmWownetPg } from '@app/actions/system/sm-wownet.action';
import { SmWownetState, getSmWownet, getSmWownetConfig, getSmWownetPg } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { CountryState, getCountrys } from '@app/selectors/system/country.selector';
import { CountryModel } from '@app/models/system/country.model';
import * as bankAction from '@app/actions/system/bank.actions';
import * as countryAction from '@app/actions/system/country.action';
import { Router } from '@angular/router';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { WAlertState, getWAlertStatus } from '@app/selectors/w-alert.selector';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { MessageConstant } from '@app/common/constant/message.constant';
import { CenterState, getCenters } from '@app/selectors/system/center.selector';
import { CenterModel } from '@app/models/system/center.model';
import { loadCenter } from '@app/actions/system/center.action';
import { Bank } from '@app/models/system/bank.model';
import { BankState, getBank } from '@app/selectors/system/bank.selector';

declare const modifyBackToCloseModal: any;

@Component({
  selector: 'app-member-registration-step3',
  templateUrl: './member-registration-step3.component.html',
  styleUrls: ['./member-registration-step3.component.css']
})
export class MemberRegistrationStep3Component implements OnInit {

  searchStrZip : string = ''
  focusStr:string = ''

  userKindSS: string | null = '';

  isNameReadonly: boolean = false;
  isCtrNameReadonly: boolean = false;
  isBirthDateReadonly: boolean = false;
  isHideAccount: boolean = false;

  isRidReadonly: boolean = false;
  isPidReadonly: boolean = false;
  isValidMail: boolean = false
  isValidMobile: boolean = false

  yearr: string = ''
  monthh: string = ''
  dayy: string = ''

  regDate: string = ''
  regDateShow: string = ''
  username: string = ''
  givenName: string = ''
  middleName: string = ''
  familyName: string = ''
  userKind: string | null = ''
  genderr: string = ''

  yearOfBirth: string = ''
  monthOfBirth: string = ''
  dayOfBirth: string = ''

  password: string = ''
  rePassword: string = ''
  tel1: string = ''
  tel2: string = ''
  tel3: string = ''
  mobile1: string = ''
  mobile2: string = ''
  mobile3: string = ''
  firstEmail: string = ''
  inputLastEmail: string = ''
  rPost: string = ''
  rAddr2: string = ''
  rAddr2_tmp: string = ''
  rAddr1: string = ''
  rId: string = ''
  rName: string = ''
  pId: string = ''
  pName: string = ''
  cntName: string = ''

  bankName: string = ''
  accNo: string = ''
  depositor: string = ''

  
  readonly TYPE_MEM_NONE:number = 0
  readonly TYPE_MEM_LOGIN:number = 1
  readonly TYPE_MEM_R:number = 2
  readonly TYPE_MEM_P:number = 3
  readonly TYPE_MEM_PARAM:number = 4

  typeMem:number = this.TYPE_MEM_NONE


  showMemberPopup: boolean = false;
  popUpParent: boolean = false;
  showZipPopup: boolean = false;

  codesE$ = new Observable<CodeModel[]>;

  center$ = new Observable<CenterModel[]>;
  centerOptions: SelectDropdownModel[] = [];
  centerSelected: SelectDropdownModel = new SelectDropdownModel();
  memInfo$ = new Observable<MemInfo>;
  genderOptions: SelectDropdownModel[] = [
    { label: "남성", value: "M" },
    { label: "여성", value: "F" },
  ];

  abPostOptions: SelectDropdownModel[] = [

  ];
  abPostSelected: SelectDropdownModel = new SelectDropdownModel();

  genderSelected: SelectDropdownModel = new SelectDropdownModel();

  mailOptions: SelectDropdownModel[] = [
  ];
  mailSelected: SelectDropdownModel = new SelectDropdownModel();

  yearBOption: SelectDropdownModel[] = [];
  yearBSelected: SelectDropdownModel = new SelectDropdownModel();

  stringMonth: String = "월";
  monthBOption: SelectDropdownModel[] = [
    { label: "01" + this.stringMonth, value: "01" },
    { label: "02" + this.stringMonth, value: "02" },
    { label: "03" + this.stringMonth, value: "03" },
    { label: "04" + this.stringMonth, value: "04" },
    { label: "05" + this.stringMonth, value: "05" },
    { label: "06" + this.stringMonth, value: "06" },
    { label: "07" + this.stringMonth, value: "07" },
    { label: "08" + this.stringMonth, value: "08" },
    { label: "09" + this.stringMonth, value: "09" },
    { label: "10" + this.stringMonth, value: "10" },
    { label: "11" + this.stringMonth, value: "11" },
    { label: "12" + this.stringMonth, value: "12" },
  ];
  monthBSelected: SelectDropdownModel = new SelectDropdownModel();

  dayBOption: SelectDropdownModel[] = [];
  dayBSelected: SelectDropdownModel = new SelectDropdownModel();


  checkMail$ = new Observable<Boolean>;
  checkMobile$ = new Observable<Boolean>;
  res$ = new Observable<ResultProc>;

  smWownet$ = new Observable<SmWownetModel>;
  smWownet: SmWownetModel = {} as SmWownetModel;

  smWownetConfig$ = new Observable<SmWownetConfigModel>;
  smWownetConfig: SmWownetConfigModel = {} as SmWownetConfigModel;

  smWownetPg$ = new Observable<SmWownetPgModel>;
  smWownetPg: SmWownetPgModel = {} as SmWownetPgModel;

  countrys$ = new Observable<CountryModel[]>();
  countryOptions: SelectDropdownModel[] = [];
  countrySelected: SelectDropdownModel = new SelectDropdownModel();

  wAlertStatus$ = new Observable<WAlertStatus>();
  
  memberLogin = AuthUtil.getLoginedInfo();
  isLogined: boolean = AuthUtil.isLogined();
  isRidNotLogin: boolean = false;
  isPidNotLogin: boolean = false;
  searchMember : string = "";

  banks$ = new Observable<Bank[]>();
  bankOptions: SelectDropdownModel[] = [];
  bankSelected: SelectDropdownModel = new SelectDropdownModel();

  constructor(
    private _codeStore: Store<CodeState>,
    private bankStore: Store<BankState>,
    private _memberStore: Store<memberInforInquirySelector.MemberInfoInquiryState>,
    private _memberRegistState: Store<MemberRegistState>,
    private _smWownetStore: Store<SmWownetState>,
    private countryStore: Store<CountryState>,
    private _router: Router,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private _centerStore: Store<CenterState>,
  ) {
    this.countrys$ = this.countryStore.select(getCountrys);
    this.banks$ = this.bankStore.select(getBank);
    this.codesE$ = this._codeStore.select(getCodesE);
    this.memInfo$ = this._memberStore.select(memberInforInquirySelector.getMemInfo);
    this.checkMail$ = this._memberRegistState.select(checkEmail);
    this.checkMobile$ = this._memberRegistState.select(checkMobile);
    this.res$ = this._memberRegistState.select(save);
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.smWownetConfig$ = this._smWownetStore.select(getSmWownetConfig);
    this.smWownetPg$ = this._smWownetStore.select(getSmWownetPg);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.center$ = this._centerStore.select(getCenters);
  }


  ngOnInit(): void {
    this.smWownetPg$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWownetPg = res;
        if(this.smWownetPg.ctBankYn == 'N'){
          this.isNameReadonly = false;
          this.isBirthDateReadonly = false;
        }
      }
    });

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);
    this.bankStore.dispatch(bankAction.loadBank('BANK'));
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
    this.countryStore.dispatch(countryAction.loadCountrys());
    this.countrys$.subscribe(res => {
      this.countryOptions = [];
      res.forEach((item) => this.countryOptions.push({ label: item.ctrName, value: item.ctrCd }));

      if (this.userKindSS == MemberConstants.USER_KIND_MEMBER) {
        let ctrCd = localStorage.getItem("ctrCd")
        this.countrySelected = this.countryOptions[this.getIndexOption("KR", this.countryOptions)]
      } else { 
        this.countrySelected = this.countryOptions[0];
      }
      // this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
    this.loadYearB()
    this._centerStore.dispatch(loadCenter());
    this.center$.subscribe(res => {
      this.centerOptions = [];
      res.forEach((item) => this.centerOptions.push({ label: item.cntCd + " " + item.cntName, value: ConvertUtil.convertToSring(item.cntCd) }));
      this.centerSelected = this.centerOptions[0];
      if(this.centerSelected){
        if(ValidationUtil.isNullOrEmpty(this.rName)){
          this.cntName =  this.centerSelected.label.toString()
        }
      }
    });
    this.userKindSS = sessionStorage.getItem(MemberConstants.STR_IS_CHECK_REGISTER);

    let data = window.sessionStorage.getItem(MemberConstants.STR_IS_DONE_STEP_2);
    if (!(data == "true")) {
      this._router.navigate([MemberConstants.URL_STEP2]);
    }
    this._smWownetStore.dispatch(loadSmWownet());
    this._smWownetStore.dispatch(loadSmWownetConfig());
    this._smWownetStore.dispatch(loadSmWownetPg());
    this._codeStore.dispatch(loadCodesE());
    this.codesE$.subscribe(res => {
      if (res) {
        this.mailOptions = [];
        res.forEach((item) => this.mailOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeName) }));
        this.mailSelected = this.mailOptions[0]
      }
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        if (res) {
          this.smWownet = res;
          if (this.smWownet.alegCnt == 0 || this.smWownet.alegCnt > 3) {
            this.abPostOptions = [
              { label: "자동", value: "0" },
            ]
          }
          if (this.smWownet.alegCnt == 1) {
            this.abPostOptions = [
              { label: "자동", value: "0" },
              { label: "가운데", value: "1" },

            ]
          }
          if (this.smWownet.alegCnt == 2) {
            this.abPostOptions = [

              { label: "자동", value: "0" },
              { label: "좌", value: "1" },
              { label: "우", value: "2" },
            ]
          }
          if (this.smWownet.alegCnt == 3) {
            this.abPostOptions = [
              { label: "자동", value: "0" },
              { label: "좌", value: "1" },
              { label: "가운데", value: "2" },
              { label: "우", value: "3" },
            ]
          }
          this.abPostSelected = this.abPostOptions[0]
        }
      }
    });
    this.smWownetConfig$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWownetConfig = res;
      }
    });
   
    this.userKind = sessionStorage.getItem(MemberConstants.STR_IS_CHECK_REGISTER);
    this.genderSelected = this.genderOptions[0]
    this.mailSelected = this.mailOptions[0]
    this.regDateShow = DateUtils.getCurrentDate(true)
    this.regDate = DateUtils.getCurrentDate(false)


    if (this.userKindSS == MemberConstants.USER_KIND_MEMBER) {   
      this.isNameReadonly = true;
      this.isBirthDateReadonly = true;
      this.isCtrNameReadonly = true;
      this.isHideAccount = false;

      let accountLS = localStorage.getItem('account')
      if (accountLS) {
        let account = JSON.parse(accountLS);
        this.username = account.userName

        this.password = account.birthday.substring(2,8);
        this.rePassword = account.birthday.substring(2,8);

        this.yearOfBirth = account.birthday.substring(0, 4)
        this.monthOfBirth = account.birthday.substring(4, 6)
        this.dayOfBirth = account.birthday.substring(6, 8)

        this.bankSelected = this.bankOptions[this.getIndexOption(account.bankCd, this.bankOptions)]
        this.accNo = account.accountNo
        this.depositor = account.userName

        this.yearBSelected = this.yearBOption[this.getIndexOption(this.yearOfBirth, this.yearBOption)]
        this.monthBSelected = this.monthBOption[this.getIndexOption(this.monthOfBirth, this.monthBOption)]
        this.setDateOptions(this.yearBSelected.value, this.monthBSelected.value)
        this.dayBSelected = this.dayBOption[this.getIndexOption(this.dayOfBirth, this.dayBOption)]
      }
    } else {
      this.isNameReadonly = false;
      this.isCtrNameReadonly = false;
      this.isBirthDateReadonly = false;
      this.isHideAccount = true;
      let year = new Date().getFullYear();
      year = Number(year) - 20
      this.yearBSelected = this.yearBOption[this.getIndexOption(String(year), this.yearBOption)]
      this.monthBSelected = this.monthBOption[0]
      this.setDateOptions(this.yearBSelected.value, this.monthBSelected.value)
      this.dayBSelected = this.dayBOption[0]

      this.bankName = ''
      this.accNo = ''
      this.depositor = ''
    }

    let userIdParam  = sessionStorage.getItem(MemberConstants.STR_USERID_PARAM);
    if (userIdParam && userIdParam.length>0) {
      this.typeMem = this.TYPE_MEM_PARAM
      this._memberStore.dispatch(memberInforInquiryAction.loadMemInfo(userIdParam));
    }else{
      this.searchRmemberFocusLogin()
    }

   
    this.memInfo$.subscribe(res => {
        switch (this.typeMem) {
          //
          case this.TYPE_MEM_LOGIN:
            if (res && res.userid) {
              if (this.smWownet && this.smWownet.musePId == 'Y') {
                this.pId = res.userid
                this.pName = res.userid + ' ' + res.username
                this.isPidReadonly = true
                this.isPidNotLogin = true

                this.rId = res.userid
                this.rName = res.userid + ' ' + res.username
                this.isRidReadonly = true
                this.isRidNotLogin = true

                this.cntName = res.cntCd + ' ' + res.cntName
              } else {
                this.rId = res.userid
                this.rName = res.userid + ' ' + res.username
                this.isRidReadonly = true
                this.isRidNotLogin = true

                this.cntName = res.cntCd + ' ' + res.cntName
              }
            }
            break;
            //
          case this.TYPE_MEM_R:
            this.resMem = res
            if (this.resMem && this.resMem.userid != null) {
              if (this.smWownet && this.smWownet.musePId != 'Y' || this.isHideAccount) {
                this.cntName = this.resMem.cntCd + ' ' + this.resMem.cntName
              }
              this.rId = this.resMem.userid
              this.rName = this.resMem.userid + ' ' + this.resMem.username
              this.isRidReadonly = true
              this.isRidNotLogin = true
            } else if (res == null) {
              this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgEnterRecommender}}));
            }
            break;
            //
          case this.TYPE_MEM_P:
            this.resMem = res;
            if (this.resMem && this.resMem.userid != null) {
              this.cntName = this.resMem.cntCd + ' ' + this.resMem.cntName
              this.pId = this.resMem.userid
              this.pName = this.resMem.userid + ' ' + this.resMem.username
              this.isPidReadonly = true
              this.isPidNotLogin = true
            } else if (res == null) {
              this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgEnterSponsor}}));
            }
            break;
            //
          case this.TYPE_MEM_PARAM:
            if (res && res.userid) {
              if (this.smWownet && this.smWownet.musePId == 'Y') {
                this.pId = res.userid
                this.pName = res.userid + ' ' + res.username
                this.isPidReadonly = true
                this.isPidNotLogin = true
                
                this.rId = res.userid
                this.rName = res.userid + ' ' + res.username
                this.isRidReadonly = true
                this.isRidNotLogin = true

                this.cntName = res.cntCd + ' ' + res.cntName
              } else {
                this.rId = res.userid
                this.rName = res.userid + ' ' + res.username
                this.isRidReadonly = true
                this.isRidNotLogin = true

                this.cntName = res.cntCd + ' ' + res.cntName
              }
            }
            break;
            //
          default:
            break;
        }
    });
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  setDateOptions(year: String | Number, month: String | Number): void {
    if (ValidationUtil.isNullOrEmpty(month)) return;
    if (ValidationUtil.isNullOrEmpty(year)) return;

    const endDate = new Date(+year, +month, 0);
    const length = endDate.getUTCDate();

    let options = [];
    for (let i = 0; i < length + 1; i++) {
      options.push({
        label: ConvertUtil.convertToZeroDecimal(i + 1) + '일',
        value: ConvertUtil.convertToZeroDecimal(i + 1)
      });
    }

    this.dayBOption = options;
  }
  loadYearB() {
    this.yearBOption = [];
    var year = new Date().getFullYear();
    for (let i = year - 100; i <= year; i++) {
      this.yearBOption.push({ label: i + "년", value: String(i) })
    }
  }

  getIndexOption(keyValue: string | null, options: SelectDropdownModel[]) {
    if (keyValue == null) {
      return 0;
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i].value == keyValue) {
        return i;
      }
    }
    return 0
  }

  onCheckMail() {
    let email = this.firstEmail  + '@'+ (ValidationUtil.isNotNullAndNotEmpty(this.inputLastEmail)? 
    this.inputLastEmail : this.mailSelected.value);
    let endOfMail = (ValidationUtil.isNotNullAndNotEmpty(this.inputLastEmail)? this.inputLastEmail : this.mailSelected.value);

    if (this.firstEmail === '' || endOfMail == '') {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgEmailInvalidation}}));
      this.isValidMail = false
      return;
    }

    if (this.firstEmail.includes('@')) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgWrongEmail}}));
      this.isValidMail = false
      return;
    }
    this._memberRegistState.dispatch(memRegistAction.clearStateRegis());
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }))
    this._memberRegistState.dispatch(memRegistAction.checkEmail(email));
    this.checkMail$.subscribe(res => {
      if (res == false) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: MessageConstant.msgValidRegisEmail}}));
        this.isValidMail = true
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }))
      } else if (res == true) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgRegisteredEmail}}));
        this.isValidMail = false
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }))
      }
    });
  }
  onCheckMobile() {
    if (this.mobile1 === '' || this.mobile2 === '' || this.mobile3 === '') {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgInvalidPhoneNumber}}));
      this.isValidMobile = false
      return;
    }
    this._memberRegistState.dispatch(memRegistAction.clearStateRegis());
    
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }))
    this._memberRegistState.dispatch(memRegistAction.checkMobile(`${this.mobile1}-${this.mobile2}-${this.mobile3}`));
    this.checkMobile$.subscribe(res => {
      if (res == false) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: MessageConstant.msgValidPhoneNumber}}));
        this.isValidMobile = true
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }))
      } else if (res == true) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgRegistedPhoneNumber}}));
        this.isValidMobile = false
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }))
      }
    });

  }
  response: ResultProc = {} as ResultProc
  ACTION_VALIDATION_ERR: string = 'ACTION_VALIDATION_ERR'
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.ACTION_VALIDATION_ERR) {
      const input = document.getElementById(this.focusStr);
        if(input){
          input.focus()
        }
    }
  }

  registerAccount() {
    this._memberRegistState.dispatch(memRegistAction.clearStateRegis());
    var error = this.validationData();
    if (error.msg !== '') {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: error.msg, action: this.ACTION_VALIDATION_ERR } }));
      this.focusStr = error.focus
    } else {
      let params = this.getConditionRegister()
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this._memberRegistState.dispatch(memRegistAction.save({ params: params })); 
      let isErr = false
      this.res$.subscribe(res => {
        if (res) {
          this.response = res;
          if (this.response.retCode == 'OK') {
            localStorage.setItem("username", this.username)
            localStorage.setItem("userid", this.response.keyValue.toString())
            localStorage.setItem('paramsRegist', JSON.stringify(params));
            this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
            this.goPage();
          } else if (this.response.retStr) {
            if (isErr == false) {
              this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: (this.response.retStr) ? this.response.retStr.toString() : ''}}));
              isErr = true
            }
            this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
          }
        }
      });
    }

  }

  validationData() {

    var condition = this.getConditionRegister();
    var error = '';
    var focus = '';
    var pass = this.password.trim();
    var rePass = this.rePassword
    var rId = this.rId.split(" ")[0]
    var pId = this.pId.split(" ")[0]
    var username = this.username

    if (username === null || username.trim().length === 0) {
      error = error + "사용자 이름은 비워둘 수 없습니다.";
      error = error + '<br/>';
      if (focus === '') {
        focus = 'username';
      }
    }
    if(this.smWownetConfig && this.smWownetConfig.reqEngName == 'Y'){
      if (this.givenName === null || this.givenName.trim().length === 0) {
        error = error + "Given Name 비워둘 수 없습니다.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'givenName';
        }
      }
      if (this.middleName === null || this.middleName.trim().length === 0) {
        error = error + "Middle Name 비워둘 수 없습니다.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'middleName';
        }
      }
      if (this.familyName === null || this.familyName.trim().length === 0) {
        error = error + "Family Name 비워둘 수 없습니다.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'familyName';
        }
      }
    }

    if (pass.length < 6 || pass.length > 15) {
      error = error + "비밀번호를 6자 이상 15자 이하로 입력하시기 바랍니다.";
      error = error + '<br/>';
      if (focus === '') {
        focus = 'password';
      }
    }

    if (pass !== rePass) {
      error = error + "확인 비밀번호가 일치하지 않습니다";
      error = error + '<br/>';
      if (focus === '') {
        focus = 're-password';
      }
    }

    // if (this.isRidReadonly == false) {
    //   error = error + "버튼을 눌러 추천인을 검색해주세요.";
    //   error = error + '<br/>';
    //   if (focus === '') {
    //     focus = 'rId';
    //   }
    // }

    if (this.isRidNotLogin == false) {
      error = error + "버튼을 눌러 추천인을 검색해주세요.";
      error = error + '<br/>';
      if (focus === '') {
        focus = 'rId';
      }
    }

    if (this.smWownetConfig && this.smWownetConfig.reqMobile == "Y") {
      if (this.mobile1.trim().length !== 0 || this.mobile2.trim().length !== 0 || this.mobile3.trim().length !== 0) {
        this.isValidMobile = false
      } else {
        this.isValidMobile = true
      }
      if (this.isValidMobile == true) {
        error = error + "등록된 전화번호";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'mobile1';
        }
      }
    }

    if (this.smWownetConfig && this.smWownetConfig.reqEMail == "Y") {
      if (this.firstEmail.trim().length !== 0 || (this.mailSelected.value.trim().length !== 0 && this.inputLastEmail.trim().length !== 0)) {
        this.isValidMail = false
      } else {
        this.isValidMail = true
      }
      if (this.isValidMail == true) {
        error = error + "저장하기 전에 이메일이 중복되었는지  확인해주세요.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'first-of-email';
        }
      }
    }

    if (this.smWownetConfig && this.smWownetConfig.reqRecomm == "Y") {
      if (rId === null || rId.length === 0) {
        error = error + "리퍼러 입력이 필요합니다";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'rId';
        }
      }
    }
    if (this.smWownetConfig && this.smWownetConfig.reqParent == "Y" && this.isHideAccount == false) {
      if (pId === null || pId.length === 0) {
        error = error + "후원인 입력하시기 바랍니다.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'pId';
        }
      }

      if (this.isPidNotLogin == false) {
        error = error + "버튼을 눌러 후원인을 검색해주세요.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'pId';
        }
      }

    }

    if (this.smWownetConfig && this.smWownetConfig.reqAddress == "Y") {
      if (this.rPost == '') {
        error = error + "주소를 입력하세요.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'rPost';
        }
      }

      if (this.rAddr1 == '') {
        error = error + "주소를 입력하세요.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'rAddr1';
        }
      }
    }

    if (this.smWownetConfig && this.smWownetConfig.reqCnt == "Y") {
      if (ValidationUtil.isNullOrEmpty(condition.cntCd)) {
        error = error + "본부/센터 비워둘 수 없습니다.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'cntName';
        }
      }
    }

    if (this.smWownetConfig && this.smWownetConfig.reqTel == "Y") {
      if (ValidationUtil.isNullOrEmpty(this.tel1) || ValidationUtil.isNullOrEmpty(this.tel2) || ValidationUtil.isNullOrEmpty(this.tel3)) {
        error = error + "전화번호 않은 전화 번호.";
        error = error + '<br/>';
        if (focus === '') {
          focus = 'tel1';
        }
      }
    }
    return { msg: error, focus: focus }
  }

  getConditionRegister() {

    let yR = this.regDate.substring(0, 4)
    let mR = this.regDate.substring(4, 6)
    let dR = this.regDate.substring(6, 8)
    const regDate = `${yR}-${mR}-${dR}`
    const username = this.username
    const givenName = this.givenName
    const middleName = this.middleName
    const familyName = this.familyName
    const ctrCd = this.countrySelected.value
    const gender = this.genderSelected.value
    const abPos = this.abPostSelected.value


    const passwd = this.password
    const tel = `${this.tel1}${this.tel2}${this.tel3}`
    const mobile = `${this.mobile1}${this.mobile2}${this.mobile3}`

    // const email = ValidationUtil.isNotNullAndNotEmpty(this.firstEmail)?this.firstEmail + '@' + this.mailSelected.value : null;

    const email = ValidationUtil.isNotNullAndNotEmpty(this.firstEmail)? (this.firstEmail  + '@'+ (ValidationUtil.isNotNullAndNotEmpty(this.inputLastEmail)? 
    this.inputLastEmail : this.mailSelected.value)): null;

    const post = this.rPost
    const addr1 = this.rAddr1

    var addr2 = this.rAddr2_tmp
    if (ValidationUtil.isNullOrEmpty(addr2)) {
      addr2 = this.rAddr2
    }

    const rId = this.rId.split(" ")[0]
    const pId = this.pId.split(" ")[0] 
    const cntCd = this.cntName.split(' ')[0]
    const depositor = this.depositor
    const accNo = this.accNo

    var regKind = 'O'
    var passwdDate = DateUtils.getCurrentDate(false)
    var rankCd = null
    var userKind = null
    if (this.userKind && this.userKind.length > 0) {
      userKind = environment.comCd + this.userKind
    }

    var lang = environment.default_lang
    var comId = environment.comId
    var workUser = "Guest"
    var bankCd = ''
    if (this.userKindSS == MemberConstants.USER_KIND_MEMBER) {
      let accountLS = localStorage.getItem('account')
      rankCd = environment.comCd + "01"
      var account = null
      if (accountLS) {
        account = JSON.parse(accountLS);
        if (ValidationUtil.isNotNullAndNotEmpty(this.smWownetConfig) && ValidationUtil.isNotNullAndNotEmpty(this.smWownetPg)) {
          if (this.smWownetConfig.reqBank == "Y" && this.smWownetPg.ctBankYn == "Y") {
            bankCd = account.sendCtCd;
          } else if(this.smWownetConfig.reqBank == "Y") {
            bankCd = account.bankCd;
          } else {
            bankCd ="";
          }
        }
      } else {
        if (ValidationUtil.isNotNullAndNotEmpty(this.smWownetConfig) && ValidationUtil.isNotNullAndNotEmpty(this.smWownetPg)) {
          if (this.smWownetConfig.reqBank == "Y" && this.smWownetPg.ctBankYn == "Y") {
            bankCd = this.bankSelected.value.split(" ")[1];
          } else {
            bankCd = this.bankSelected.value.split(" ")[0];
          }
        }
      }
      
    } else {
      rankCd = environment.comCd + "00"
    }

    const birthday = `${this.yearBSelected.value}-${this.monthBSelected.value}-${this.dayBSelected.value}`
    return {
      regDate, username, givenName, middleName, familyName, ctrCd, gender, birthday, passwd, tel, mobile, email, post, addr1, addr2, rId, cntCd, depositor,
      bankCd, accNo, regKind, passwdDate, rankCd, userKind, pId, /* abPos, */ lang, comId, workUser
    }

  }
  searchRmemberFocusLogin() {

    if (this.memberLogin && this.memberLogin.userid && ConvertUtil.convertToSring(this.memberLogin.userid).length > 0) {

      const userId = ConvertUtil.convertToSring(this.memberLogin.userid);

      this.typeMem = this.TYPE_MEM_LOGIN
      this._memberStore.dispatch(memberInforInquiryAction.loadMemInfo(userId));
    }
  }

  previPage() {
    if (this.userKindSS == MemberConstants.USER_KIND_MEMBER) {
      this._router.navigate([MemberConstants.URL_STEP2]);
    } else {
      this._router.navigate([MemberConstants.URL_STEP1]);
    }
  }
  goPage() {
    window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_3, 'true');
    this._router.navigate([MemberConstants.URL_STEP4]);
  }
  hanldeOnChangeBankSelectedValue(selected: SelectDropdownModel): void {
    this.bankSelected = selected;
  }
  hanldeOnChangeCenterSelectedValue(selected: SelectDropdownModel): void {
    this.centerSelected = selected;
  }
  hanldeOnChangeAbPostSelectedValue(selected: SelectDropdownModel): void {
    this.abPostSelected = selected;
  }
  hanldeOnChangeGenderSelectedValue(selected: SelectDropdownModel): void {
    this.genderSelected = selected;
  }
  hanldeOnChangeMailSelectedValue(selected: SelectDropdownModel): void {
    this.mailSelected = selected;
  }
  onKeydownTel1($event:any): void {
    this.focusNextElement(this.tel1, 3, 'tel2', $event.key)
  }
  onKeydownTel2($event:any): void {
    this.focusNextElement(this.tel2, 4, 'tel3', $event.key)
    this.focusPrevElement(this.tel2, 'tel1', $event)
  }
  onKeydownTel3($event:any): void {
    this.focusPrevElement(this.tel3, 'tel2', $event)
  }

  onKeydownMobile1($event:any): void {
    this.focusNextElement(this.mobile1, 3, 'mobile2', $event.key)
  }
  onKeydownMobile2($event:any): void {
    this.focusNextElement(this.mobile2, 4, 'mobile3', $event.key)
    this.focusPrevElement(this.mobile2, 'mobile1', $event)
  }
  onKeydownMobile3($event:any): void {
    this.focusPrevElement(this.mobile3, 'mobile2', $event)
  }

  focusNextElement(crrEle: string, maxLength: number, nextEleName: string, key:string) {
    if (crrEle.length == maxLength && key!='Delete' && key!='Backspace') {
      const input = document.getElementById(nextEleName);
      if (input) {
        input.focus()
      }
    }
  }
  focusPrevElement(crrEle: string, prevEleName: string, $event:any) {
    if (crrEle.length == 0 && $event.key == 'Backspace') {
      const input = document.getElementById(prevEleName);
      if (input) {
        input.focus()
      }
    }
  }

  resMem: MemInfo = {} as MemInfo
  handleOnFindMember(): void {
    if(!this.isLogined && ValidationUtil.isNullOrEmpty(this.rName)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgSponsorRecommendedPerson} }));
    } else {
      this._memberStore.dispatch(memberInforInquiryAction.clearMemState());
      this.searchMember = this.rName;
      this.handleOnClickShowMemPopup()
      this.popUpParent = false
    }

    // let memberLogin = AuthUtil.getLoginedInfo();
    // if (memberLogin && memberLogin.userid && ConvertUtil.convertToSring(memberLogin.userid).length > 0) {
    //   this.handleOnClickShowMemPopup()
    //   this.popUpParent = false
    // } else {
    //   if (this.isRidReadonly == true) {
    //     this.isRidReadonly = false;
    //     this.rName = ''
    //   } else {
    //     this.typeMem = this.TYPE_MEM_R
    //     this._memberStore.dispatch(memberInforInquiryAction.loadMemInfo(this.rName));
    //   }
    // }
  }
  handleOnFindMemberParent(): void {
    if(!this.isLogined && ValidationUtil.isNullOrEmpty(this.pName)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgSponsor} }));
    } else {
      this.searchMember = this.pName;
      this.handleOnClickShowMemPopup()
      this.popUpParent = true
    }

    

    // this._memberStore.dispatch(memberInforInquiryAction.clearMemState());
    // let memberLogin = AuthUtil.getLoginedInfo();
    // if (memberLogin && memberLogin.userid && ConvertUtil.convertToSring(memberLogin.userid).length > 0) {
    //   this.handleOnClickShowMemPopup()
    //   this.popUpParent = true
    // } else {
    //   if (this.isPidReadonly == true) {
    //     this.isPidReadonly = false;
    //     this.pName = ''
    //   } else {
    //     this.typeMem = this.TYPE_MEM_P
    //     this._memberStore.dispatch(memberInforInquiryAction.loadMemInfo(this.pName));
    //   }
    // }
  }

  handleOnClickToggleMemberPopup(show: boolean): void {
    this.showMemberPopup = show;
  }
  handleOnClickRowMemberPopup(member: Member): void {
    if (this.popUpParent == true) {
      this.isPidNotLogin = true
      this.pId = member.userid
      this.pName = member.userid + ' ' + member.username
      
      this.cntName = member.cntCd + ' ' + member.cntName

      if (this.memberLogin && this.memberLogin.userid && ConvertUtil.convertToSring(this.memberLogin.userid).length > 0) {
        this.isPidReadonly = true
      }

    } else {
      this.isRidNotLogin = true
      this.rId = member.userid
      this.rName = member.userid + ' ' + member.username
      if (this.smWownet && this.smWownet.musePId != 'Y' || this.isHideAccount) {
        this.cntName = member.cntCd + ' ' + member.cntName
      }

      if (this.memberLogin && this.memberLogin.userid && ConvertUtil.convertToSring(this.memberLogin.userid).length > 0) {
        this.isRidReadonly = true
      }

    }

  }
  handleOnClickShowMemPopup(): void {
    // modifyBackToCloseModal();
    this.showMemberPopup = true
  }


  handleOnClickToggleZipPopup(show: boolean): void {
    this.showZipPopup = show;
  }
  handleOnClickRowZipPopup(zip: Zip): void {
    this.rAddr1 = zip.zipCode
    this.rAddr2 = zip.jibun
    this.rPost = zip.address
  }
  handleOnClickShowZipPopup(): void {
    modifyBackToCloseModal();
    this.searchStrZip = this.rPost
    this.showZipPopup = true
  }

  hanldeOnChangeCountrySelectedValue(selected: SelectDropdownModel): void {
    this.countrySelected = selected;
  }
  hanldeOnChangeYearBSelectedValue(selected: SelectDropdownModel): void {
    this.yearBSelected = selected;
    this.setDateOptions(this.yearBSelected.value, this.monthBSelected.value)
  }
  hanldeOnChangeMonthBSelectedValue(selected: SelectDropdownModel): void {
    this.monthBSelected = selected;
    this.setDateOptions(this.yearBSelected.value, this.monthBSelected.value)
  }
  hanldeOnChangeDateBSelectedValue(selected: SelectDropdownModel): void {
    this.dayBSelected = selected;
  }

  changeRidPid(flag : any) {
    if(flag == 'rId') {
      this.isRidNotLogin = false;
    } else if(flag == 'pId') {
      this.isPidNotLogin = false;
    }
  }

}
