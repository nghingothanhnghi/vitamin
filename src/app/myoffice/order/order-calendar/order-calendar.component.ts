import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ConvertUtil } from '@app/common/util/convert.util';
import { OrderCalendarState } from '@app/selectors/myoffice/order/order-calendar.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { searchOrderCalendar, sumOrderCalendar } from '@app/actions/myoffice/order/order-calendar.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { setWAlert } from '@app/actions/w-alert.action';

@Component({
  selector: 'app-order-calendar',
  templateUrl: './order-calendar.component.html',
  styleUrls: ['./order-calendar.component.css']
})
export class OrderCalendarComponent implements OnInit {

  year: string = "";
  month: string = "";
  userid: string = "";

  constructor(
    private _orderCalendarStore: Store<OrderCalendarState>,
    private _wAlertStore: Store<WAlertState>,
    private _overlayLoadingStore: Store<OverlayLoadingState> 
  ) { }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
    }

    let now = new Date();
    this.year = ConvertUtil.convertToSring(now.getFullYear());
    this.month = ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(now.getMonth() + 1));

    let params = this.getParams();
    setTimeout(() => {
      this._overlayLoadingStore.dispatch( setShowOverlayLoading({loading: true }));
    }, 1);
    this._orderCalendarStore.dispatch(searchOrderCalendar(params));
    this._orderCalendarStore.dispatch(sumOrderCalendar(params));
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
    this._orderCalendarStore.dispatch(searchOrderCalendar(params));

    if (newYear !== oldYear) {
      this._orderCalendarStore.dispatch(sumOrderCalendar(params));
    }
  }

  getParams(): any {
    let params = {
      userId: this.userid,
      year: this.year,
      month: this.month,
    };

    return params;
  }
}
