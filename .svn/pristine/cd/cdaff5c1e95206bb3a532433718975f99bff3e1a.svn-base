import { Component, OnInit } from '@angular/core';
import { findPassWd } from '@app/actions/system/login2.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { findPassWdSelector, Login2State } from '@app/selectors/system/login2.select';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  yearOptions: SelectDropdownModel[] = [];
  monthOptions: SelectDropdownModel[] = [];
  dateOptions: SelectDropdownModel[] = [];

  fromYear: SelectDropdownModel = {} as SelectDropdownModel;
  fromMonth: SelectDropdownModel = {} as SelectDropdownModel;
  fromDate: SelectDropdownModel = {} as SelectDropdownModel;

  logId: String = '';
  phone: String = '';
  username: String = '';
  point: number = 0;
  result = new Observable<ResultProcessModel>();
  flag : boolean = false;
  wAlertStatus$ = new Observable<WAlertStatus>();
  constructor(
    private loginStore: Store<Login2State>,
    private _wAlertStore: Store<WAlertState>,
  ) { 
    this.result = this.loginStore.select(findPassWdSelector);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    var date = new Date();
    for(var i=date.getFullYear(); i>date.getFullYear()-100; i--){
      this.yearOptions.push({label: ConvertUtil.convertToSring(i) + "년", value: ConvertUtil.convertToSring(i)});
    }

    for (let i = 0; i < 31; i++) {
      if (i < 12) {
        this.monthOptions.push({ label: ConvertUtil.convertToZeroDecimal(i + 1) + "월", value: ConvertUtil.convertToZeroDecimal(i + 1) })
      }
      this.dateOptions.push({ label: ConvertUtil.convertToZeroDecimal(i + 1) + "일", value: ConvertUtil.convertToZeroDecimal(i + 1) });
    }

    this.fromYear = this.yearOptions[0];
    this.fromMonth = this.monthOptions[0];
    this.fromDate = this.dateOptions[0];

    this.result.subscribe(res => {
      if(this.point != 0){
        if(res){
          if(res.retCode == 'OK'){
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: MessageConstant.msgResetedPass}}));
  
            this.flag = true;
          }else{
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: res.retStr}}));
          }
        }else{
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgMemberNotFound }}));
        }
        
      }
    })
  }

  handleOnChangeYearSeletedValue(selected: SelectDropdownModel): void {
    this.fromYear = selected;
  }

  handleOnChangeMonthSeletedValue(selected: SelectDropdownModel): void {
    this.fromMonth = selected;
  }

  handleOnChangeDateSeletedValue(selected: SelectDropdownModel): void {
    this.fromDate = selected;
  }

 findPass(): void{
  var msg = this.validation();
  if(msg != ''){
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: msg}}));
  }else{
    let params = {
      birthday: this.fromYear.value + '' + this.fromMonth.value + '' + this.fromDate.value,
      username:  this.username,
      phone: this.phone,
      logId: this.logId
    }
    this.point = this.point + 1;
    if(this.flag == false){
      this.loginStore.dispatch(findPassWd({params: params}));
    }else{
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgAlreadyChanged }}));
    }
  }
 }

 validation(){
  var error = '';
  if(this.logId.trim() == ''){
    error += '회원번호 입력해주세요';
    error += '<br/>';
  }
  if(this.username.trim() == ''){
    error += '회원명 입력해주세요';
    error += '<br/>';
  }
  if(this.phone.trim() == ''){
    error += '휴대폰 입력해주세요';
    error += '<br/>';
  }

  return error;
 }

}
