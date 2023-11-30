import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ManagementComponent } from '@app/home-page/aplgo-korea/management/management.component';
import { BenefitCalendarModel } from '@app/models/myoffice/benefit/benefit-calendar.module';
import { BenefitCalendarSearchState, getBenefitCalendarSearchItems } from '@app/selectors/myoffice/benefit/benefit-calendar.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'benefit-calendar-table',
  templateUrl: './benefit-calendar-table.component.html',
  styleUrls: ['./benefit-calendar-table.component.css',
               './../../../../../../assets/css/my-office/benefit-management.css',
              './../../../../../../assets/css/modules-office.css']
})
export class BenefitCalendarTableComponent implements OnInit {

  @Input()
  year: string = "";

  @Input()
  month: string = "";

  @Output()
  clickCalendarButton = new EventEmitter<string>();

  searchItems$ = new Observable<BenefitCalendarModel[]>;


  items: any[] = [];
  itemsBodyTable: any[] = [];
  itemsFootterTotalAmt : number = 0;
  itemsFootterTaxAmt   : number = 0;
  itemsFootterTrueAmt  : number = 0;

  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState> ,
    private _benefitCalendarStore: Store<BenefitCalendarSearchState>
    
  ) {
    this.searchItems$ = this._benefitCalendarStore.select(getBenefitCalendarSearchItems);
   }

  ngOnInit( ): void {
    this.searchItems$.subscribe(res => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));

      this.getCanlendarDate(res);
    });
  }

  getCanlendarDate(res: BenefitCalendarModel[]): void {
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
      let endLastDay = new Date(thisYear, thisMonth -1, 0);
      let endLastCount = endLastDay.getDate();
      let supportData = [];	

      for (i = 0; i < startDay; i++) {
        weekArray.push({
          date: endLastCount - startDay + i + 1,
          classes: 'prev'
        });
      }
      for (i = 1; i <= endCount; i++) {	
        item = res[i - 1];

        if (weekArray.length == 7) {
          data.push(weekArray);
          weekArray = [];
        }

     

        classes = "";
        if (this.year == ConvertUtil.convertToSring(now.getFullYear()) && 
          this.month == ConvertUtil.convertToSring(now.getMonth() + 1) && 
          i == now.getDate()) {
          classes = "current";
        } else if (ValidationUtil.isNotNullAndNotEmpty(item.totalAmt) || ValidationUtil.isNotNullAndNotEmpty(item.taxAmt) || ValidationUtil.isNotNullAndNotEmpty(item.taxAmt)) {
					classes = "active";
				}

        if (ValidationUtil.isNotNullAndNotEmpty(item.totalAmt) || ValidationUtil.isNotNullAndNotEmpty(item.taxAmt) || ValidationUtil.isNotNullAndNotEmpty(item.taxAmt)) {
					supportData.push(item)
				}

        weekArray.push({
          date: i,
          class: classes
        });

      }

      if (ValidationUtil.isNotNullAndNotEmpty(weekArray)) {
        if (weekArray.length < 7) {
          var len = weekArray.length;
          for (i = len; i < 7; i++) {
            weekArray.push({
              date: i - len + 1 ,
              classes: 'next'
            });
          }
        }

        data.push(weekArray);
        this.items = data;
      }
      this.renderSupportTable(supportData);
    }
  }

  handleOnClickCalendarButton(type: string): void {
    this.clickCalendarButton.emit(type);
  }

  renderSupportTable(data: BenefitCalendarModel[]) : void {
    var item;
			
    var totalAmt;
    var taxAmt;
    var trueAmt;
    
    var sumTotalAmt = 0;
    var sumTaxAmt = 0;
    var sumTrueAmt = 0;
    
    this.itemsBodyTable = [];

    if (ValidationUtil.isNullOrEmpty(data)) {
      for (var i = 0; i < 5; i++) {
        let itemBody = {
          payDay   : "",
          totalAmt : "",
          taxAmt   : "",
          trueAmt  : ""
        }
        this.itemsBodyTable.push(itemBody);
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        item = data[i];
        
        totalAmt = 0;
        taxAmt = 0;
        trueAmt = 0;
        
        if (ValidationUtil.isNotNullAndNotEmpty(item.totalAmt)) {
          totalAmt = item.totalAmt;
          sumTotalAmt += Number(totalAmt);
        }
        
        if (ValidationUtil.isNotNullAndNotEmpty(item.taxAmt)) {
          taxAmt = item.taxAmt;
          sumTaxAmt += Number(taxAmt);
        }
        
        if (ValidationUtil.isNotNullAndNotEmpty(item.trueAmt)) {
          trueAmt = item.trueAmt;
          sumTrueAmt += Number(trueAmt);
        }
        
        let itemBody = {
          payDay   : item.payDay,
          totalAmt : totalAmt,
          taxAmt   : taxAmt,
          trueAmt  : trueAmt
        }

        this.itemsBodyTable.push(itemBody);

      }
      
      if (data.length < 5) {
        for (var i = data.length; i < 5; i++) {
          let itemBody = {
            payDay   : "",
            totalAmt : "",
            taxAmt   : "",
            trueAmt  : ""
          }
        this.itemsBodyTable.push(itemBody);
        }
      }
    }

    this.itemsFootterTotalAmt = sumTotalAmt;
    this.itemsFootterTaxAmt = sumTaxAmt;
    this.itemsFootterTrueAmt = sumTrueAmt;
  }

}
