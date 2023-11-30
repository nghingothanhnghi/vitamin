import { Component, OnInit } from '@angular/core';
import { findMember } from '@app/actions/system/login2.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { CodeModel } from '@app/models/system/code.model';
import { MemberModel } from '@app/models/system/member.model';
import { findMemberItem, Login2State } from '@app/selectors/system/login2.select';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-assistance-inquiry',
  templateUrl: './sales-assistance-inquiry.component.html',
  styleUrls: ['./sales-assistance-inquiry.component.css']
})
export class SalesAssistanceInquiryComponent implements OnInit {

  yearOptions: SelectDropdownModel[] = [];
  monthOptions: SelectDropdownModel[] = [];
  dateOptions: SelectDropdownModel[] = [];

  codesY$ = new Observable<CodeModel[]>;
  
  fromYear: SelectDropdownModel = {} as SelectDropdownModel;
  fromMonth: SelectDropdownModel = {} as SelectDropdownModel;
  fromDate: SelectDropdownModel = {} as SelectDropdownModel;

  username : String = "";

  member$ = new Observable<MemberModel>;
  message : string = "등록된 회원정보가 없습니다.";
  icon : String = WAlertConstant.warning;
  wAlertStatus$ = new Observable<WAlertStatus>();
  
  constructor(
    private loginStore: Store<Login2State>,
    private _wAlertStore: Store<WAlertState>
    ) {
      this.member$ = this.loginStore.select(findMemberItem);
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

  findMember() {
    let params = this.getParams();

    if(params.username == null || params.username == '') {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgEnterMemberName} }));
    } else {
      
      this.loginStore.dispatch(findMember({ params: params }));
   
      //Total Items Of data
      this.member$.subscribe(res => {
        if(res.userid != null){
          this.message = "아인셀 등록된 회원입니다.";
          this.icon = WAlertConstant.successful;
        }
      })
  
      setTimeout(() => {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: this.icon, message: this.message } }));
      }, 350);
    }
  }

  getParams() {
    let params = {
      birthday: this.fromYear.value + '' + this.fromMonth.value + '' + this.fromDate.value,
      username:  this.username,
    }

    return params

  }
}
