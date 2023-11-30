import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { getOrderCalendarSearchItems, OrderCalendarState } from '@app/selectors/myoffice/order/order-calendar.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Observable } from 'rxjs';
import { OrderScheduleModel } from '@app/models/myoffice/order/order-schedule.model';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'order-calendar-table',
  templateUrl: './order-calendar-table.component.html',
  styleUrls: ['./order-calendar-table.component.css']
})
export class OrderCalendarTableComponent implements OnInit {

  @Input()
  year: string = "";

  @Input()
  month: string = "";

  @Output()
  clickCalendarButton = new EventEmitter<string>();

  searchItems$ = new Observable<OrderScheduleModel[]>;


  items: any[] = [];
  detailItems: any[] = [];

  constructor(
    private _orderCalendarStore: Store<OrderCalendarState>,
    private _overlayLoadingStore: Store<OverlayLoadingState> 
  ) {
    this.searchItems$ = this._orderCalendarStore.select(getOrderCalendarSearchItems);
  }

  ngOnInit(): void {
    this.searchItems$.subscribe(res => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));

      this.getCanlendarDate(res);
    });
  }

  handleOnClickCalendarButton(type: string): void {
    this.clickCalendarButton.emit(type);
  }

  getCanlendarDate(res: OrderScheduleModel[]): void {
    if (ValidationUtil.isNotNullAndNotEmpty(res)) {
      let date = new Date(+this.year, +this.month, 0);
      let now = new Date();
      let thisYear = date.getFullYear();
      let thisMonth = date.getMonth() + 1;
      let startDate = new Date(thisYear, thisMonth -1, 1);
      let endDay = new Date(thisYear, thisMonth, 0);
      let startDay = startDate.getDay();
      let endCount = endDay.getDate();
      let weekArray = [];
      let data = [];
      let details = [];
      let i;
      let item;
      let classes = "";
      let endLastDay = new Date(thisYear, thisMonth -1, 0);
      let endLastCount = endLastDay.getDate();

      for (i = 0; i < startDay; i++) {
        weekArray.push({
          date: endLastCount - startDay + i + 1,
          cnt: '',
          amt: '',
          pv: '',
          pv2: '',
          pv3: '',
          point: '',
          classes: 'prev'
        });
      }

      for (i = 1; i <= endCount; i++) {	
        if (weekArray.length == 7) {
          data.push(weekArray);
          weekArray = [];
        }

        classes = "";
        if (this.year == ConvertUtil.convertToSring(now.getFullYear()) && 
          this.month == ConvertUtil.convertToZeroDecimal(now.getMonth() + 1) && 
          i == now.getDate()) {
          classes = "current";
        }

        if(res[i-1].ordAmt == "0" && res[i-1].ordPv1 == "0" && res[i-1].ordCnt == "0") {
          weekArray.push({
            date: i,
            cnt: '',
            amt: '',
            pv: '',
            pv2: '',
            pv3: '',
            point: '',
            classes: classes
          });
        } else {
          item = {
            date: i,
            cnt: res[i-1].ordCnt,
            amt: res[i-1].ordAmt,
            pv: res[i-1].ordPv1,
            pv2: res[i-1].ordPv2,
            pv3: res[i-1].ordPv3,
            point: res[i-1].ordPoint,
            classes: classes
          }
          weekArray.push(item);
          details.push(item);
        }
      }

      if (ValidationUtil.isNotNullAndNotEmpty(weekArray)) {
        if (weekArray.length < 7) {
          var len = weekArray.length;
          for (i = len; i < 7; i++) {
            weekArray.push({
              date: i - len + 1 ,
              cnt: '',
              amt: '',
              pv: '',
              pv2: '',
              pv3: '',
              point: '',
              classes: 'next'
            });
          }
        }

        data.push(weekArray);
        this.items = data;
        this.detailItems = details;
      }        
    }
  }
}
