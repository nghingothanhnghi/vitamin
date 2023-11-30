import { Component, OnInit } from '@angular/core';
import { paymentStatusCount, paymentStatusSearch, paymentStatusSum } from '@app/actions/myoffice/auto-ship/auto-ship.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { loadCodesY } from '@app/actions/system/code.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { AutoShipModel } from '@app/models/myoffice/auto-ship/auto-ship.model';
import { CodeModel } from '@app/models/system/code.model';
import { AutoShipState, paymentStatusCountItems$, paymentStatusSearchItems$, paymentStatusSumItems$ } from '@app/selectors/myoffice/auto-ship/auto-ship.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-autoship-payment-status',
  templateUrl: './autoship-payment-status.component.html',
  styleUrls: ['./autoship-payment-status.component.css']
})
export class AutoshipPaymentStatusComponent implements OnInit {

  userId : String = "";

  // Start Data of select date
  codesY$ = new Observable<CodeModel[]>;

  yearOptions: SelectDropdownModel[] = [];
  dateFilterSelected: DateFilterModel = new DateFilterModel();
  // End Data of select date
   
  // Start Paging
  page: number = 1;

  len: number = 10;

  totalItems: number = 0;

  config: PaginationInstance = {
    id: 'auto-ship-payment-status',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }
  options: SelectDropdownModel[] = [];
  selectedValue: SelectDropdownModel = new SelectDropdownModel();
  // End Paging

  searchItems$ = new Observable<AutoShipModel[]>;
  sumItem$ = new Observable<AutoShipModel>;
  totalItems$ = new Observable<Number>;

  collection: AutoShipModel[] = [];
  rows: number[] = [];
  cols: number[] = new Array(16);
  totalCols: number = 7;
  totalRows: number = 0;

  constructor(
    private _codeStore: Store<CodeState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _autoShipState: Store<AutoShipState>
  ) {
    this.codesY$ = this._codeStore.select(getCodesY);
    this.searchItems$ = this._autoShipState.select(paymentStatusSearchItems$);
    this.totalItems$ = this._autoShipState.select(paymentStatusCountItems$);
    this.sumItem$ = this._autoShipState.select(paymentStatusSumItems$);
   }

  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
    }

    this.options = LenConstant.listLen;
    this.selectedValue = this.options[0];

    this._codeStore.dispatch(loadCodesY());

    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.page = 1;
    this.onSearch();
  }

  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.len = Number(selected.value);
      this.page = 1;
      this.onSearch();
    }
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.onSearch();
  }

  getParams(): any {
    let startDate = "" + this.dateFilterSelected.fromDate.year.value 
                  + this.dateFilterSelected.fromDate.month.value
                  + this.dateFilterSelected.fromDate.date.value;

    let endDate = "" + this.dateFilterSelected.toDate.year.value
                + this.dateFilterSelected.toDate.month.value
                + this.dateFilterSelected.toDate.date.value;

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      userid: this.userId,
      startDate: startDate,
      endDate: endDate,

      page: Number(this.page) - 1,
      len: this.len,
      
    }

    return params;
  }

  onSearch() {
    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let params = this.getParams();

    this._autoShipState.dispatch(paymentStatusSearch({ params: params }));
    this._autoShipState.dispatch(paymentStatusCount({ params: params }));
    this._autoShipState.dispatch(paymentStatusSum({ params: params }));

    //Render Body
    this.searchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
        if (this.collection.length < 5) {
          this.rows = new Array(5 - this.collection.length);
        }

      } else {
        this.collection = [];
        this.rows = new Array(5);
      }
      
      setTimeout(() => {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        this.setBlankRow();
      }, 250);
    });

    //Total Items Of data
    this.totalItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    })
  }

  setBlankRow() {
    this.totalRows = this.collection.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.cols = new Array(this.totalCols);
  }

}
