import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ScheduleModel } from '@app/models/myoffice/schedule/schedule.model';
import { getScheduleSearchItems, ScheduleState } from '@app/selectors/myoffice/schedule/schedule.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {

  @Input()
  year: string = "";

  @Input()
  month: string = "";

  @Output()
  clickScheduleButton = new EventEmitter<string>();

  searchItems$ = new Observable<ScheduleModel[]>;

  items: any[] = [];
  detailItems: any[] = [];
  total: Number =0

  message: string = "현재 이벤트가 아직 없습니다.";

  constructor(
    private _scheduleStore: Store<ScheduleState>,
    private _overlayLoadingStore: Store<OverlayLoadingState> ,
    private router: Router
  ) {
    this.searchItems$ = this._scheduleStore.select(getScheduleSearchItems);
   }

  ngOnInit(): void {
    this.searchItems$.subscribe(res => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));

      this.getScheduleDate(res);
    });
  }

  handleOnClickScheduleButton(type: string): void {
    this.clickScheduleButton.emit(type);
  }

  getScheduleDate(res: any) {
    res = JSON.parse(JSON.stringify(res))
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
      let i;
      let item;
      let classes = "";
      let total=0;

      let supportData = [];		
			let haveEvent = false;
			
			let arrEvent = [];
			let arrRegNos = [];
			let arrTitles = [];

      let endLastDay = new Date(thisYear, thisMonth -1, 0);
      let endLastCount = endLastDay.getDate();

      for (i = 0; i < startDay; i++) {
        weekArray.push({
          date: endLastCount - startDay + i + 1,
          haveEvent: false,
          classes: 'prev'
        });
      }

      for (i = 1; i <= endCount; i++) {	
        item = res[i - 1];
        if (weekArray.length == 7) {
          data.push(weekArray);
          weekArray = [];
        }

        arrEvent = [];
        classes = "";
        if (this.year == ConvertUtil.convertToSring(now.getFullYear()) && 
        this.month == ConvertUtil.convertToZeroDecimal(now.getMonth() + 1) && 
        i == now.getDate()) {
          classes = "current";
        }
        
        haveEvent = false;
				if (ValidationUtil.isNotNullAndNotEmpty(item.titles) && ValidationUtil.isNotNullAndNotEmpty(item.regNos)) {
					arrRegNos = ConvertUtil.convertToSring(item.regNos).split(";");
					arrTitles = ConvertUtil.convertToSring(item.titles).split(";");
					
					if (ValidationUtil.isNotNullAndNotEmpty(arrRegNos) && ValidationUtil.isNotNullAndNotEmpty(arrTitles) && arrRegNos.length == arrTitles.length) {
						haveEvent = true;
						
						for (var k = 0; k < arrRegNos.length; k++) {
							arrEvent.push({regNo: arrRegNos[k], title: arrTitles[k]})
              total++;
						}
            item.events = arrEvent
						supportData.push(item);
					}
				}
        weekArray.push({
          date: i,
          haveEvent: haveEvent,
          classes: classes
        });

      }

      if (weekArray.length  !=0 ) {
        if (weekArray.length < 7) {
          var len = weekArray.length;
          for (i = len; i < 7; i++) {
            weekArray.push({
              date: i - len + 1 ,
              haveEvent: false,
              classes: 'next'
            });
          }
        }
        data.push(weekArray);
      }
      this.items = data;
      this.detailItems = supportData;
      this.total=total;
    }
  }

  onClickEvents(regNo: string){
    sessionStorage.setItem('regNo', JSON.stringify(regNo));
    this.router.navigate([`/serviceCenter/schedule-detail`]);
  }

}
