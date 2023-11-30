import { Component, OnInit } from '@angular/core';
import { loadCodesT, loadCodesY } from '@app/actions/system/code.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { AbPosInfo } from '@app/models/myoffice/member/abpos-info.model';
import { Member } from '@app/models/myoffice/member/member.model';
import { CodeModel } from '@app/models/system/code.model';
import { CodeState, getCodesT, getCodesY } from '@app/selectors/system/code.selector';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';
import * as memPositionSelecttor from '@app/selectors/myoffice/member/member-position.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { loadAbPosInfo } from '@app/actions/myoffice/member/member-inquiry-position.action';
import { environment } from '@enviroments/environment';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { getInquiryPerformanceSearchItemsA, getInquiryPerformanceSearchItemsB, getInquiryPerformanceSumItemA, getInquiryPerformanceSumItemB, InquiryPerformanceSearchState } from '@app/selectors/myoffice/order/inquiry-performance-search.selector';
import { searchInquiryPerformanceA, searchInquiryPerformanceB, sumInquiryPerformanceA, sumInquiryPerformanceB } from '@app/actions/myoffice/order/inquiry-performance-search.action';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { getFindPayHeader, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { CommonUtils } from '@app/common/util/common.util';
import { LenConstant } from '@app/common/constant/len.constant';

declare const getYnPayHeader: any;

@Component({
  selector: 'app-performance-inquiry-by-leg',
  templateUrl: './performance-inquiry-by-leg.component.html',
  styleUrls: ['./performance-inquiry-by-leg.component.css']
})
export class PerformanceInquiryByLegComponent implements OnInit {

  pageA: number = 1;
  lenA: number = 10;
  pageB: number = 1;
  lenB: number = 10;

  totalColsA: number = 7;
  totalRowsA: number = 0;
  rowsA: number[] = [];
  colsA: number[] = [];
  totalColsB: number = 7;
  totalRowsB: number = 0;
  rowsB: number[] = [];
  colsB: number[] = [];

  userId: string = ''
  userName: string = ''
  
  codesY$ = new Observable<CodeModel[]>();

  yearOptions: SelectDropdownModel[] = [];
  showMemberPopup: boolean = false;

  totalItemsA: number = 0;
  totalItemsB: number = 0;

  inquiryPerItemsA$ = new Observable<OrderMstModel[]>();
  inquiryPerSumItemA$ = new Observable<OrderPdtModel>();

  inquiryPerItemsB$ = new Observable<OrderMstModel[]>();
  inquiryPerSumItemB$ = new Observable<OrderPdtModel>();

  inquiryPerItemsA: OrderMstModel[] = [];
  inquiryPerItemsB: OrderMstModel[] = [];
  
  configA: PaginationInstance = {
    id: 'tableRIdA',
    itemsPerPage: this.lenA,
    currentPage: this.pageA,
    totalItems: this.totalItemsA,
  }
  configB: PaginationInstance = {
    id: 'tableRIdB',
    itemsPerPage: this.lenB,
    currentPage: this.pageB,
    totalItems: this.totalItemsB,
  }

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;
  
  rowA: number=0;
  rowB: number=0;

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  checkOrderSelected: string = '1';
  abPosinfo$ = new Observable<AbPosInfo>;
  abPosinfo = {} as AbPosInfo;

  nameStrA: String = '';
  nameStrB: String = '';

  lv: number = 2;

  pathSelected: SelectDropdownModel = new SelectDropdownModel();
  pathOptions: SelectDropdownModel[] = [];
  codesT$ = new Observable<CodeModel[]>;
  smPayHeader$ = new Observable<SmPayHeaderModel>();

  dateFilterSelected: DateFilterModel = new DateFilterModel();

  countA: number = 0;
  countB: number = 0;

  // messsage = CommonUtils.getMessage();

  optionsA: SelectDropdownModel[] = LenConstant.listLen;
  selectedValueA: SelectDropdownModel = new SelectDropdownModel();
  optionsB: SelectDropdownModel[] = LenConstant.listLen;
  selectedValueB: SelectDropdownModel = new SelectDropdownModel();

  constructor(
    private _codeStore: Store<CodeState>,
    private _memPositionStore: Store<memPositionSelecttor.MemberPositionState>,
    private _inquiryPerformanceSearchStore: Store<InquiryPerformanceSearchState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.codesY$ = this._codeStore.select(getCodesY);
    this.codesT$ = this._codeStore.select(getCodesT);
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.abPosinfo$ = this._memPositionStore.select(memPositionSelecttor.abPosinfo);
    this.inquiryPerItemsA$ = this._inquiryPerformanceSearchStore.select(getInquiryPerformanceSearchItemsA);
    this.inquiryPerSumItemA$ = this._inquiryPerformanceSearchStore.select(getInquiryPerformanceSumItemA);
    this.inquiryPerItemsB$ = this._inquiryPerformanceSearchStore.select(getInquiryPerformanceSearchItemsB);
    this.inquiryPerSumItemB$ = this._inquiryPerformanceSearchStore.select(getInquiryPerformanceSumItemB);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
  }

  ngOnInit(): void {
    this.selectedValueA = this.optionsA[0];
    this.selectedValueB = this.optionsB[0];

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }
    
    this.smWowWord$.subscribe(res => this.smWowWord = res);

    this.loadABPos(this.userId)

    this.smPayHeader$.subscribe(res => {
      this.isPv1 = getYnPayHeader(res, "pv1");
      this.isPv2 = getYnPayHeader(res, "pv2");
      this.isPv3 = getYnPayHeader(res, "pv3");

      this.totalColsA = 5;
      if (this.isPv1) this.totalColsA++;
      // if (this.isPv2) this.totalColsA++;
      // if (this.isPv3) this.totalColsA++;
      this.setBlankRowA();

      this.totalColsB = 5;
      if (this.isPv1) this.totalColsB++;
      // if (this.isPv2) this.totalColsB++;
      // if (this.isPv3) this.totalColsB++;
      this.setBlankRowB();
    });

    this._codeStore.dispatch(loadCodesY());
    this._codeStore.dispatch(loadCodesT());

    const defaultSelected = { label: "All", value: "" };

    this.codesT$.subscribe((res) => {
      this.pathOptions = [];
      this.pathOptions.push(defaultSelected);
      res.forEach((item) =>
        this.pathOptions.push({
          label: item.codeName,
          value: ConvertUtil.convertToSring(item.codeCd),
        })
      );
      this.pathSelected = this.pathOptions[0];
    });

    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    this.abPosinfo$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.abPosinfo = res
        this.nameStrA = (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.ausername) ? res.ausername : '-') +
          '(' + (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.auserid) ? res.auserid : '-') + ')';

        this.nameStrB = (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.busername) ? res.busername : '-') +
          '(' + (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.buserid) ? res.buserid : '-') + ')';

        this.onSearch();
      }
    });

    this.inquiryPerItemsA$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.inquiryPerItemsA = res;
      } else {
        this.inquiryPerItemsA = [];
      }
      this.setBlankRowA()
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.inquiryPerSumItemA$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItemsA = Number(res.total);
      } else {
        this.totalItemsA = 0;
      }
      this.configA.totalItems = this.totalItemsA;
    });

    this.inquiryPerItemsB$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.inquiryPerItemsB = res;
      } else {
        this.inquiryPerItemsB = [];
      }
      this.setBlankRowB()
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.inquiryPerSumItemB$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItemsB = Number(res.total);
      } else {
        this.totalItemsB = 0;
      }
      this.configB.totalItems = this.totalItemsB;
    });
  }

  loadABPos(id: any){
    this._memPositionStore.dispatch(loadAbPosInfo(id));
  }

  setBlankRowA() {
    this.totalRowsA = this.inquiryPerItemsA.length;
    if (this.lenA>5) {
      this.rowA=10;
      if (this.totalRowsA === 0) {
        this.rowsA = new Array(10);
      } else if (this.totalRowsA < 10) {
        this.rowsA = new Array(10 - this.totalRowsA);
      }
    } else {
      this.rowA=5
      if (this.totalRowsA === 0) {
        this.rowsA = new Array(5);
      } else if (this.totalRowsA < 5) {
        this.rowsA = new Array(5 - this.totalRowsA);
      }
    }

    this.colsA = new Array(this.totalColsA);
  }

  setBlankRowB() {
    this.totalRowsB = this.inquiryPerItemsB.length;
    if(this.lenB>5){
      this.rowB=10;
      if (this.totalRowsB === 0) {
        this.rowsB = new Array(10);
      } else if (this.totalRowsB < 10) {
        this.rowsB = new Array(10 - this.totalRowsB);
      }
    }else{
      this.rowB=5
      if (this.totalRowsB === 0) {
        this.rowsB = new Array(5);
      } else if (this.totalRowsB < 5) {
        this.rowsB = new Array(5 - this.totalRowsB);
      }
    }

    this.colsB = new Array(this.totalColsB);
  }

  hanldeOnChangePathSelectedValue(selected: SelectDropdownModel): void {
    this.pathSelected = selected;
  }

  handleOnClickToggleMemberPopup(show: boolean): void {
    this.showMemberPopup = show;
  }

  handleOnClickRowMemberPopup(member: Member): void {
    this.userId = member.userid
    this.userName = member.username
    this.loadABPos(this.userId)
  }

  handleOnClickShowMemPopup(): void {
    this.showMemberPopup = true
  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;

    this.onSearch()
  }

  handleOnChangeDate(dateFilter: DateFilterModel): void {
    this.pageB = 1;
    this.pageA = 1;
    this.dateFilterSelected = dateFilter;
  }

  handleOnChangeSelectedValueA(selected: SelectDropdownModel): void {
    this.lenA = Number(selected.value);

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let paramsA = this.getParams(this.abPosinfo.auserid, this.pageA, this.lenA)

    this._inquiryPerformanceSearchStore.dispatch(searchInquiryPerformanceA({ params: paramsA }));
    this._inquiryPerformanceSearchStore.dispatch(sumInquiryPerformanceA({ params: paramsA }));
  }

  handleOnChangeSelectedValueB(selected: SelectDropdownModel): void {
    this.lenB = Number(selected);

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let paramsB = this.getParams(this.abPosinfo.buserid, this.pageB, this.lenB)
    this._inquiryPerformanceSearchStore.dispatch(searchInquiryPerformanceB({ params: paramsB }));
    this._inquiryPerformanceSearchStore.dispatch(sumInquiryPerformanceB({ params: paramsB }));
  }

  handleOnChangeCheckOrder(value: any): void {
    this.checkOrderSelected = value;
  }

  handleOnChangePageA(page: number): void {
    if (this.countA++ < 2) return;
    if (this.pageA === page) return;

    this.pageA = Number(page);

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let paramsA = this.getParams(this.abPosinfo.auserid, this.pageA, this.lenA)

    this._inquiryPerformanceSearchStore.dispatch(searchInquiryPerformanceA({ params: paramsA }));
    this._inquiryPerformanceSearchStore.dispatch(sumInquiryPerformanceA({ params: paramsA }));
  }

  handleOnChangePageB(page: number): void {
    if (this.countB++ < 2) return;
    if (this.pageB === page) return;

    this.pageB = Number(page);

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let paramsB = this.getParams(this.abPosinfo.buserid, this.pageB, this.lenB)

    this._inquiryPerformanceSearchStore.dispatch(searchInquiryPerformanceB({ params: paramsB }));
    this._inquiryPerformanceSearchStore.dispatch(sumInquiryPerformanceB({ params: paramsB }));
  }

  onSearch(): void {
    this.pageB = 1;
    this.pageA = 1;

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);
    
    let paramsA = this.getParams(this.abPosinfo.auserid, this.pageA, this.lenA)
    let paramsB = this.getParams(this.abPosinfo.buserid, this.pageB, this.lenB)

    if (paramsA.sDate == "--" || paramsA.eDate == "--") return;
    if (paramsB.sDate == "--" || paramsB.eDate == "--") return;

    if (!paramsA.userId) return;
    if (!paramsB.userId) return;

    this._inquiryPerformanceSearchStore.dispatch(searchInquiryPerformanceA({ params: paramsA }));
    this._inquiryPerformanceSearchStore.dispatch(sumInquiryPerformanceA({ params: paramsA }));
    
    this._inquiryPerformanceSearchStore.dispatch(searchInquiryPerformanceB({ params: paramsB }));
    this._inquiryPerformanceSearchStore.dispatch(sumInquiryPerformanceB({ params: paramsB }));
  }

  getParams(id: string, page:number, len:number): any {
    let startDate = this.dateFilterSelected.fromDate.year.value + ""
      + this.dateFilterSelected.fromDate.month.value + ""
      + this.dateFilterSelected.fromDate.date.value;
    let endDate = this.dateFilterSelected.toDate.year.value + ""
      + this.dateFilterSelected.toDate.month.value + ""
      + this.dateFilterSelected.toDate.date.value;

    let params = {
      lang: environment.default_lang,
      comId: "",
      sDate: startDate,
      eDate: endDate,
      ordPath: this.pathSelected.value,
      chkOrder: this.checkOrderSelected,
      userId: id,
      page: Number(page) - 1,
      len: len
    }
    return params;
  }
}
