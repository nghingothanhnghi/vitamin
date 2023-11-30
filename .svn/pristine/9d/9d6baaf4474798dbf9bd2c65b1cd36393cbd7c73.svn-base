import { AfterViewChecked, Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ResultProc } from '@app/models/system/result-proc.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { UserProfileModel } from '@models/myoffice/user-profile/user-profile.model';
import { Zip } from '@app/models/system/zip.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { CodeState, getCodesE } from '@app/selectors/system/code.selector';
import { CodeModel } from '@app/models/system/code.model';
import { loadCodesE } from '@app/actions/system/code.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { DateModel } from '@app/models/components/date.model';
import { FormBuilder } from '@angular/forms';
// import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';


import { environment } from '@enviroments/environment';
import { __await } from 'tslib';
import { checkEmail, checkMobile, MemberRegistState } from '@app/selectors/myoffice/member/member-regist.selector';
import  * as memRegistAction from '@app/actions/myoffice/member/member-regist.action';
import { ChangePerInforState, checkNickName, updatePerInfo } from '@app/selectors/myoffice/user-profile/change-persional-information.selector';
import * as changePerInfoAction from '@app/actions/myoffice/user-profile/change-persional-infor.actions';
import { AuthUtil } from '@app/common/util/auth.util';
import { getUserProfileItems, UserProfileState } from '@app/selectors/myoffice/user-profile/user-profile.selector';
import { Member } from '@app/models/myoffice/member/member.model';
import { loadUserProfile } from '@app/actions/myoffice/user-profile/user-profile.actions';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';


@Component({
  selector: 'app-change-personal-information',
  templateUrl: './change-personal-information.component.html',
  styleUrls: ['./change-personal-information.component.css',
  './../../../../assets/css/modules.css']
})
export class ChangePersonalInformationComponent implements OnInit, OnDestroy{

  yearOptions: SelectDropdownModel[] = [];

  userIfo$ = new Observable<UserProfileModel>;
  userIfo: UserProfileModel ={} as UserProfileModel;
  collection =  {} as UserProfileModel;

  birthYear: SelectDropdownModel = new SelectDropdownModel();
  birthMonth: SelectDropdownModel = new SelectDropdownModel();
  birthDate: SelectDropdownModel = new SelectDropdownModel();

  personalInfo$ = new Observable<Member>;
  personalInfo: Member = {} as Member;
  response:ResultProc = {} as ResultProc
  subWAler$ = {} as Subscription
  tel1:string = ''
  tel2:string = ''
  tel3:string = ''
  mobile1:string = ''
  mobile2:string = ''
  mobile3:string = ''

  tel: String | null ='';
  isValid: boolean = true;
  message: String='';
  showZipPopup: boolean = false;

  stringYear: string = "년";
  stringMonth: string = "월";
  stringDate: string = "일";
  temp:String [] = [];
  post: string ='';
  lastEmail: String='';

  userid: string = '';
  nickName: string = '';

  actionChangeInfo: string = "actionChangeInfo";

  centerSelected: SelectDropdownModel = new SelectDropdownModel();

  mailOptions: SelectDropdownModel[] = [];
  mailSelected: SelectDropdownModel = new SelectDropdownModel();

  genderSelected: SelectDropdownModel = new SelectDropdownModel();

  wAlertStatus$ = new Observable<WAlertStatus>();
  codesE$ = new Observable<CodeModel[]>;

  codesY$ = new Observable<CodeModel[]>;
  checkMail$ = new Observable<Boolean>;
  checkMobile$ = new Observable<Boolean>;
  checkNickName$ = new Observable<Boolean>;
  res$ = new Observable<ResultProc>;

  isMailInSelect:boolean = false;

  profileForm = this.fb.group({
    tel1: [''],
    tel2: [''],
    tel3: [''],
    mobile1: [''],
    mobile2: [''],
    mobile3: [''],
    firstEmail: [''],
    inputLastEmail: [''],
    rPost: [''],
    rAddr1: [''],
    rAddr2: [''],
    rAddr2_tmp: [''],
    agreementCheck1: false,
    agreementCheck2: false,
    nickName: ['']
  })

  constructor(
    private _codeStore: Store<CodeState>,
    private _personalInfoStore: Store<UserProfileState>,
    private _changePerInforState: Store<ChangePerInforState>,
    private _memberRegistState: Store<MemberRegistState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private fb: FormBuilder
  ) {
    this.personalInfo$ = this._personalInfoStore.select(getUserProfileItems);
    this.codesE$ = this._codeStore.select(getCodesE);
    this.checkMail$ = this._memberRegistState.select(checkEmail);
    this.checkMobile$ = this._memberRegistState.select(checkMobile);
    this.checkNickName$ = this._changePerInforState.select(checkNickName);
    this.res$ = this._changePerInforState.select(updatePerInfo);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }
  ngOnDestroy(): void {
    this.subWAler$.unsubscribe()
  }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
    }
    var date = new Date();
    for(var i=date.getFullYear(); i>date.getFullYear()-100; i--){
      this.yearOptions.push({label: ConvertUtil.convertToSring(i), value: ConvertUtil.convertToSring(i)});
    }

    this._personalInfoStore.dispatch(loadUserProfile(this.userid ))

    let mail =[];

    this.personalInfo$.subscribe(res => {
        if (ValidationUtil.isNotNullAndNotEmpty(res)) {
          this.personalInfo = res;

          this.getUserLogined(this.personalInfo)
          
          const a =this.personalInfo.email;
          if(a!==undefined && a !==null){
          mail = a.split("@");
          }
          const birthday = this.personalInfo.birthday;
          if(birthday!==undefined && birthday !== null) {
          this.temp = birthday.split("-");
          }
          const y = this.temp[0];
          const m = this.temp[1];
          const d = this.temp[2];
      
          this.birthYear = this.getSelectDropdown(y, y, this.stringYear);
          this.birthMonth = this.getSelectDropdown(m, m, this.stringMonth);
          this.birthDate = this.getSelectDropdown(d, d, this.stringDate);
          }

    });

    this._codeStore.dispatch(loadCodesE());
    this.codesE$.subscribe(res => {
      if(res){
         this.mailOptions = [];
         res.forEach((item) => this.mailOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeName) }));
         
         if(ValidationUtil.isNullOrEmpty(this.personalInfo.email) || mail.length<2){
          this.mailSelected=this.mailOptions[0];
         }else{
          for(var i = 0;i<this.mailOptions.length;i++){
            if(this.mailOptions[i].label==this.lastEmail){
              this.isMailInSelect = true
              this.mailSelected =this.mailOptions[i]
            }
           }
          //  if(this.isMailInSelect === false){
            this.mailSelected =this.mailOptions[0]
            this.profileForm.patchValue({
              inputLastEmail: this.lastEmail.toString()
            })
          //  }
         }
      }
    });
    this.subWAler$ = this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
    
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

  getSelectDropdown(value: String | Number, label: String | Number, unit: any): SelectDropdownModel {
    return {
      value: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(value)),
      label: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(label)) + ConvertUtil.convertToSring(unit),
    }
  }
  hanldeOnGetToDateSelectedValue(value: DateModel): void {
    this.birthYear = value.year;
    this.birthMonth = value.month;
    this.birthDate = value.date;
  }
  onKeydownTel1($event: any): void {
    this.focusNextElement(`${this.profileForm.value.tel1}`, 3, 'tel2', $event.key)
  }
  onKeydownTel2($event: any): void {
    this.focusNextElement(`${this.profileForm.value.tel2}`, 4, 'tel3', $event.key);
    this.focusPrevElement(`${this.profileForm.value.tel2}`, 'tel1', $event)
  }
  onKeydownTel3($event:any): void {
    this.focusPrevElement(`${this.profileForm.value.tel3}`, 'tel2', $event)
  }
  onKeydownMobile1($event: any): void {
    this.focusNextElement(`${this.profileForm.value.mobile1}`, 3, 'mobile2', $event.key)
  }
  onKeydownMobile2($event: any): void {
    this.focusNextElement(`${this.profileForm.value.mobile2}`, 4, 'mobile3', $event.key)
    this.focusPrevElement(`${this.profileForm.value.mobile2}`, 'mobile1', $event)
  }
  onKeydownMobile3($event:any): void {
    this.focusPrevElement(`${this.profileForm.value.mobile3}`, 'mobile2', $event)
  }
  focusNextElement(crrEle:string,maxLength:number, nextEleName:string, key:string){
    if(crrEle.length == maxLength && key!='Delete' && key!='Backspace'){
      const input = document.getElementById(nextEleName);
      if(input){
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

  onSubmit(){

    this.isValid=true;

    if (this.isValid) {
      this.validationTel();
    }
    
    if (this.isValid) {
      this.validationMobile(1);
    }
    
    if (this.isValid) {
      this.validationEmail(1);
    }
    
    if (this.isValid) {
      this.validationAddress();
    }
    if (this.isValid) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { 
        icon: WAlertConstant.confirm, 
        message: MessageConstant.msgConfirmChangeInfo ,
        action: this.actionChangeInfo
      } }))
    }
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionChangeInfo && status.isConfirm) {
      let params = this.setData()
      let hasResponse = false;
      this._wAlertStore.dispatch(clearWAlert());
      this._changePerInforState.dispatch(changePerInfoAction.updatePerInfo({params: params}));
      this.res$.subscribe(res => {
        this.response = res;
        if (ValidationUtil.isNotNullAndNotEmpty(this.response)&& this.response.retCode && hasResponse == false) {
          let tamp= `${this.response.retStr}`;
          hasResponse = true
          setTimeout(() => {
            if (this.response.retCode == 'OK') {
              this._wAlertStore.dispatch(setWAlert({ wAlert: { 
                icon: WAlertConstant.successful, 
                message: tamp 
              } }));
            } else {
              this._wAlertStore.dispatch(setWAlert({ wAlert: { 
                icon: WAlertConstant.warning, 
                message: tamp 
              } }));
            }
           this._personalInfoStore.dispatch(loadUserProfile(this.userid ))
           this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
          }, 100);
        }
      });
    }
  }

  hanldeOnChangeMailSelectedValue(selected: SelectDropdownModel): void {
    this.mailSelected = selected;
  }

  handleOnClickShowZipPopup(): void {
    this.post=`${this.profileForm.value.rPost}`;
    this.showZipPopup = true
  }
  handleOnClickRowZipPopup(zip: Zip): void {
    this.profileForm.patchValue({
      rAddr1: zip.zipCode,
      rAddr2: zip.jibun,
      rPost: zip.address
    })
  }
  handleOnClickToggleZipPopup(show: boolean): void {
    this.showZipPopup = show;
  }

  setData(): any {
    const tel1 = this.profileForm.value.tel1;
    const tel2 = this.profileForm.value.tel2;
    const tel3 = this.profileForm.value.tel3;

    this.tel = tel1 + '-' + tel2 + '-' + tel3;

    if (ValidationUtil.isNullOrEmpty(tel1) || ValidationUtil.isNullOrEmpty(tel2) || ValidationUtil.isNullOrEmpty(tel3)) {
      this.tel = null;
    }
    let email = this.profileForm.value.firstEmail  + '@'+ (ValidationUtil.isNotNullAndNotEmpty(this.profileForm.value.inputLastEmail)? 
      this.profileForm.value.inputLastEmail : this.mailSelected.value);
    
    let addr2 = this.profileForm.value.rAddr2_tmp;
    if(ValidationUtil.isNullOrEmpty(addr2)){
      addr2 = this.profileForm.value.rAddr2;
    }
      
    let params = {
      nickname: this.profileForm.value.nickName,
      userid: this.userid,
      comId: environment.comId,
      workUser: this.userid,
      birthday: ''+this.birthYear.value+this.birthMonth.value+this.birthDate.value,
      tel: this.tel,
      mobile: this.profileForm.value.mobile1 + '-' + this.profileForm.value.mobile2 + '-' + this.profileForm.value.mobile3,
      post: this.profileForm.value.rPost,
      email:  email,
      okSMS: this.profileForm.value.agreementCheck1 ? 'Y' : 'N',
      okEmail: this.profileForm.value.agreementCheck2 ? 'Y' : 'N',
      addr1: this.profileForm.value.rAddr1,
      addr2: addr2,
    }

    return params;
  }

  getUserLogined(data:any): void {
    var temp = [];
    const tel = data.tel;
    if (ValidationUtil.isNotNullAndNotEmpty(tel)) {
      if (tel.includes("-")) {
        temp = tel.split("-");
        this.profileForm.patchValue({
          tel1: temp[0],
          tel2: temp[1],
          tel3: temp[2]
        });
      } else {
        this.profileForm.patchValue({
          tel1: tel.substring(0, 3),
          tel2: tel.substring(3, 7),
          tel3: tel.substring(7),
        });
      }
    }

    const mobile = data.mobile;
    if (ValidationUtil.isNotNullAndNotEmpty(mobile)) {
      if (mobile.includes("-")) {
        temp = mobile.split("-");
        this.profileForm.patchValue({
          mobile1: temp[0],
          mobile2: temp[1],
          mobile3: temp[2]
        });
      } else {
        this.profileForm.patchValue({
          mobile1: mobile.substring(0, 3),
          mobile2: mobile.substring(3, 7),
          mobile3: mobile.substring(7),
        });
      }
    }
    
    const email = data.email;
    if (ValidationUtil.isNotNullAndNotEmpty(email)) {
      temp = email.split("@");
      this.profileForm.patchValue({
        firstEmail: temp[0],
      });
      this.lastEmail= temp[1];
    }

    this.profileForm.patchValue({ nickName: data.nickname })

    this.profileForm.patchValue({
      rPost: data.post,
      rAddr1: data.addr1,
      rAddr2: data.addr2
    })
    
    const okDateEmail = data.okDateEMail;
    const okDateSms = data.okDateSms;
    
    if (ValidationUtil.isNotNullAndNotEmpty(okDateSms)) {
      this.profileForm.patchValue({
        agreementCheck1: true,
      })
    }
    
    if (ValidationUtil.isNotNullAndNotEmpty(okDateEmail)) {
      this.profileForm.patchValue({
        agreementCheck2: true,
      })   
    }
  }

  validationTel(): boolean {
    const tel1 = this.profileForm.value.tel1;
    const tel2 = this.profileForm.value.tel2;
    const tel3 = this.profileForm.value.tel3;
    
    if (ValidationUtil.isNotNullAndNotEmpty(tel1) || ValidationUtil.isNotNullAndNotEmpty(tel2) || ValidationUtil.isNotNullAndNotEmpty(tel3)) {
      if (ValidationUtil.isNullOrEmpty(tel1) || ValidationUtil.isNullOrEmpty(tel2) || ValidationUtil.isNullOrEmpty(tel3)) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: MessageConstant.msgInvalidPhoneNumber 
        } }));
        this.isValid= false;
      }
    }
    return this.isValid;
  }
  
  validationMobile(type:any): boolean{
    const mobile1 = this.profileForm.value.mobile1;
    const mobile2 = this.profileForm.value.mobile2;
    const mobile3 = this.profileForm.value.mobile3;
    
    if (ValidationUtil.isNullOrEmpty(mobile1) || ValidationUtil.isNullOrEmpty(mobile2) || ValidationUtil.isNullOrEmpty(mobile3)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { 
        icon: WAlertConstant.warning, 
        message: MessageConstant.msgValidPhone
      } }));
      this.isValid = false;
    }

    if (type == 1) return this.isValid;
    
    this._memberRegistState.dispatch(memRegistAction.checkMobile(`${mobile1}-${mobile2}-${mobile3}`));
    this.checkMobile$.subscribe(res => {
      if (res == false) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.successful, 
          message: MessageConstant.msgValidPhoneNumber
        } }));
      } else {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: MessageConstant.msgRegisteredPhone 
        } }));
        this.isValid = false;
      }
    });
    return this.isValid
  }
  
  validationEmail (type:any):boolean {
    
    const firstEmail = `${this.profileForm.value.firstEmail}`;
    const lastEmail = (ValidationUtil.isNotNullAndNotEmpty(this.profileForm.value.inputLastEmail)? 
    this.profileForm.value.inputLastEmail : this.mailSelected.value);
    
    if (ValidationUtil.isNullOrEmpty(firstEmail) || ValidationUtil.isNullOrEmpty(lastEmail)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { 
        icon: WAlertConstant.warning, 
        message: MessageConstant.msgEmailInvalidation
      } }));
      this.isValid = false;
    }
    
    if(firstEmail.includes('@')) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { 
        icon: WAlertConstant.warning, 
        message: MessageConstant.msgWrongEmail
      } }));
      this.isValid = false;
    }

    if (type == 1) return this.isValid;

    this._memberRegistState.dispatch(memRegistAction.checkEmail(firstEmail+'@'+lastEmail));
    this.checkMail$.subscribe(res => {
      if (res === false) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.successful, 
          message: MessageConstant.msgValidRegisEmail 
        } }));
      } else {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: MessageConstant.msgRegisteredEmail
        } }));
        this.isValid = false;
      }
    });
    return this.isValid;
  }
  
  validationAddress (): boolean {
    const post = this.profileForm.value.rPost;
    const address1 = this.profileForm.value.rAddr1;
    const address2 = this.profileForm.value.rAddr2;
    if (ValidationUtil.isNullOrEmpty(post) || ValidationUtil.isNullOrEmpty(address1) || ValidationUtil.isNullOrEmpty(address2)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { 
        icon: WAlertConstant.warning, 
        message: MessageConstant.msgAddrValid 
      } }));
      this.isValid=false;
    }
    return this.isValid;
  }

  countNickName (): boolean {
    let params = this.getParams();
    
    this._changePerInforState.dispatch(changePerInfoAction.checkNickName(params));

    this.checkNickName$.subscribe(res => {
      if (res === true) {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.successful, 
          message: '닉네임 사용할 수 있습니다.' 
        } }));
      } else {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { 
          icon: WAlertConstant.warning, 
          message: '닉네임 이미 존재.'
        } }));
        this.isValid = false;
      }
    });
    return this.isValid;
  }

  getParams(): any {
    let params = {
      userid: this.userid,
      nickname: this.profileForm.value.nickName,
    };

    return params;
  }
}