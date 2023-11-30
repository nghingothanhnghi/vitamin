import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { countSchedule, searchSchedule } from '@app/actions/myoffice/schedule/schedule.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ScheduleModel } from '@app/models/myoffice/schedule/schedule.model';
import { OrderCalendarState } from '@app/selectors/myoffice/order/order-calendar.selector';
import { getScheduleSearchItems, ScheduleState } from '@app/selectors/myoffice/schedule/schedule.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  year: string = "";
  month: string = "";

  constructor(
    private _scheduleStore: Store<ScheduleState>,
    private _wAlertStore: Store<WAlertState>,
    private _overlayLoadingStore: Store<OverlayLoadingState> 
  ) {}

  ngOnInit(): void {
    let now = new Date();
    this.year = ConvertUtil.convertToSring(now.getFullYear());
    this.month = ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(now.getMonth() + 1));

    let params = this.getParams();
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._scheduleStore.dispatch(searchSchedule(params));
    this._scheduleStore.dispatch(countSchedule(params));
  }
  handleOnClickScheduleButton(type: string): void {
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
    this._scheduleStore.dispatch(searchSchedule(params));

    if (newYear !== oldYear) {
      this._scheduleStore.dispatch(countSchedule(params));
    }
  }
  getParams(): any {
    let params = {
      year: this.year,
      month: this.month,
    };

    return params;
  }
}
