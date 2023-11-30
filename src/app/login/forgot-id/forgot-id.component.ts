import { Component, OnInit } from '@angular/core';
import { findId } from '@app/actions/system/login2.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { CodeModel } from '@app/models/system/code.model';
import { MemberModel } from '@app/models/system/member.model';
import { findIdSelector, Login2State } from '@app/selectors/system/login2.select';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-forgot-id',
  templateUrl: './forgot-id.component.html',
  styleUrls: ['./forgot-id.component.css']
})
export class ForgotIdComponent implements OnInit {
  username: String = "";
  phone: String = "";
  
  yearOptions: SelectDropdownModel[] = [];
  monthOptions: SelectDropdownModel[] = [];
  dateOptions: SelectDropdownModel[] = [];

  codesY$ = new Observable<CodeModel[]>;
  
  fromYear: SelectDropdownModel = {} as SelectDropdownModel;
  fromMonth: SelectDropdownModel = {} as SelectDropdownModel;
  fromDate: SelectDropdownModel = {} as SelectDropdownModel;
  
  memberModel = new Observable<MemberModel>;
  
  point: number = 0;
  wAlertStatus$ = new Observable<WAlertStatus>();
  constructor(private loginStore: Store<Login2State>,private _wAlertStore: Store<WAlertState>,) {
    this.memberModel = this.loginStore.select(findIdSelector);
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

    this.memberModel.subscribe(res => {
      if(this.point != 0){
        if(!res || res.logId == null){
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgConsumerNotFound}}));
        }else{
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: res.username + '님의 회원번호는 [' + res.logId + '] 입니다!'}}));
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

  findId(){
    var msg = this.validation();
    if(msg != ''){
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: msg}}));
    }else{
      let params = {
        birthday: this.fromYear.value + '' + this.fromMonth.value + '' + this.fromDate.value,
        username:  this.username,
        phone: this.phone
      }
          this.point = this.point + 1;
          this.loginStore.dispatch(findId({params: params}));                 
    }
     
        
  }
  
  validation(){
    var error = '';
    if(this.username.trim() == ''){
      error += '회원명 입력해주세요';
      error += '<br/>';
    }
    if(this.phone.trim() == ''){
      error += '휴대폰 입력해주세요';
    }

    return error;
  }

}
