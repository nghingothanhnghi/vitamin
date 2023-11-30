import { Component, OnInit } from '@angular/core';
import { ConvertUtil } from '@app/common/util/convert.util';
import { BenefitCalendarSearchState } from '@app/selectors/myoffice/benefit/benefit-calendar.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { searchBenefitCalendar } from '@app/actions/myoffice/benefit/benefit-calendar.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { Router } from '@angular/router';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';

@Component({
  selector: 'app-benefit-calendar',
  templateUrl: './benefit-calendar.component.html',
  styleUrls: ['./benefit-calendar.component.css',
              './../../../../../assets/css/my-office/benefit-management.css']
})
export class BenefitCalendarComponent implements OnInit {

  year: string = "";
  month: string = "";
  userId: string = "";
  userName: string = "";

  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState> ,
    private _benefitCalendarStore: Store<BenefitCalendarSearchState>,
    private _wAlertStore: Store<WAlertState>,
    private router: Router
   
  ) { }

  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    } else {
      this.router.navigate(['/login']);
    }


    let now = new Date();
    this.year = ConvertUtil.convertToSring(now.getFullYear());
    this.month = ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(now.getMonth() + 1));

    let params = this.getParams();
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._benefitCalendarStore.dispatch(searchBenefitCalendar({params:params}));
  }

  getParams(): any {
    let params = {
      userId: this.userId,
      giveDate : this.year + this.month
    };

    return params;
  }

  hanleOnClickCalendarButton(type: string): void {
    let d = new Date(+this.year, +this.month - 1, 1);
    let oldYear = d.getFullYear();

    if (type === "+") {
      d.setMonth(d.getMonth() + 1);
    } else if (type === "-") {
      d.setMonth(d.getMonth() - 1);
    }

    let newYear = d.getFullYear();
    
    const now = new Date();

    if (d.getFullYear() > now.getFullYear()) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgWarningCalendar} }));
      return;
    }
    if (d.getFullYear() == now.getFullYear() && d.getMonth() > now.getMonth()) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgWarningCalendar} }));
      return;
    }

    this.year = ConvertUtil.convertToSring(d.getFullYear());
    this.month = ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(d.getMonth() + 1));

    let params = this.getParams();

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._benefitCalendarStore.dispatch(searchBenefitCalendar({params:params}));

  }
}
