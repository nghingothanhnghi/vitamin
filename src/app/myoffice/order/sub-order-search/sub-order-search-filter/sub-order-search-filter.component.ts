import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { CodeState, getCodesO, getCodesT, getCodesY } from '@app/selectors/system/code.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { OrderSearchState } from '@app/selectors/myoffice/order/order-search.selector';
import { CenterState, getCenters } from '@app/selectors/system/center.selector';
import { CodeModel } from '@app/models/system/code.model';
import { CenterModel } from '@app/models/system/center.model';
import { loadCodesO, loadCodesT, loadCodesY } from '@app/actions/system/code.action';
import { loadCenter } from '@app/actions/system/center.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { CheckUseridConstant } from '@app/common/constant/check-userid.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from 'src/environments/environment';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { countOrder, searchOrder, sumOrder } from '@app/actions/myoffice/order/order-search.action';
import { LangConstant } from '@app/common/constant/lang.constant';

declare const modifyBackToCloseModal: any;

@Component({
  selector: 'sub-order-search-filter',
  templateUrl: './sub-order-search-filter.component.html',
  styleUrls: ['./sub-order-search-filter.component.css']
})
export class SubOrderSearchFilterComponent implements OnInit, OnChanges {

  @Input()
  reload: boolean = false;

  @Input()
  page: number | string = 0;

  @Input()
  len: number | string = 10;

  @Input()
  userid: string = "";

  @Input()
  username: string = "";

  @Output()
  openMemberPopup = new EventEmitter<boolean>();

  @Output()
  search = new EventEmitter<any>();

  codesY$ = new Observable<CodeModel[]>;
  codesO$ = new Observable<CodeModel[]>;
  codesT$ = new Observable<CodeModel[]>;
  center$ = new Observable<CenterModel[]>;

  yearOptions: SelectDropdownModel[] = [];
  kindOptions: SelectDropdownModel[] = [];
  pathOptions: SelectDropdownModel[] = [];
  centerOptions: SelectDropdownModel[] = [];
  checkUseridOptions: SelectDropdownModel[] = CheckUseridConstant.listCheckUserid;

  kindSelected: SelectDropdownModel = new SelectDropdownModel();
  pathSelected: SelectDropdownModel = new SelectDropdownModel();
  centerSelected: SelectDropdownModel = new SelectDropdownModel();
  checkUseridSelected: SelectDropdownModel = new SelectDropdownModel();
  dateFilterSelected: DateFilterModel = new DateFilterModel();
  checkOrderSelected: Number = 2;

  constructor(
    private _codeStore: Store<CodeState>,
    private _centerStore: Store<CenterState>,
    private _orderSearchStore: Store<OrderSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.codesY$ = this._codeStore.select(getCodesY);
    this.codesO$ = this._codeStore.select(getCodesO);
    this.codesT$ = this._codeStore.select(getCodesT);
    this.center$ = this._centerStore.select(getCenters);
  }

  ngOnInit(): void {
    this._codeStore.dispatch(loadCodesY());
    this._codeStore.dispatch(loadCodesO());
    this._codeStore.dispatch(loadCodesT());
    this._centerStore.dispatch(loadCenter());

    const defaultSelected = { label: "전체 유형", value: "" };

    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    this.codesO$.subscribe(res => {
      this.kindOptions = [];
      this.kindOptions.push(defaultSelected);
      res.forEach((item) => this.kindOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeCd) }));
      this.kindSelected = this.kindOptions[0];
    });

    this.codesT$.subscribe(res => {
      this.pathOptions = [];
      this.pathOptions.push(defaultSelected);
      res.forEach((item) => this.pathOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeCd) }));
      this.pathSelected = this.pathOptions[0];
    });

    this.center$.subscribe(res => {
      this.centerOptions = [];
      this.centerOptions.push({ label: "::: 전체 센터 :::", value: "" });
      res.forEach((item) => this.centerOptions.push({ label: item.cntCd + " " + item.cntName, value: ConvertUtil.convertToSring(item.cntCd) }));
      this.centerSelected = this.centerOptions[0];
    });

    if (ValidationUtil.isNotNullAndNotEmpty(this.checkUseridOptions)) {
      this.checkUseridSelected = this.checkUseridOptions[0];
    }

    setTimeout(() => {
      this.checkUseridOptions = CheckUseridConstant.getListCheckUserid();
      this.checkUseridSelected = this.checkUseridOptions[0];
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let pageChangeEvent = changes["page"];
    let lenChangeEvent = changes["len"];
    let reloadChangeEvent = changes['reload'];

    if ((ValidationUtil.isNotNullAndNotEmpty(reloadChangeEvent) && this.reload) || ValidationUtil.isNotNullAndNotEmpty(lenChangeEvent)) {
      if (ValidationUtil.isValidDateFilter(this.dateFilterSelected)) {
        this.handleOnSearch();
      }
    } else if (ValidationUtil.isNotNullAndNotEmpty(pageChangeEvent)) {
      this.handleChangePage();
    }
  }

  hanldeOnChangeKindSelectedValue(selected: SelectDropdownModel): void {
    this.kindSelected = selected;
  }

  hanldeOnChangePathSelectedValue(selected: SelectDropdownModel): void {
    this.pathSelected = selected;
  }

  hanldeOnChangeCenterSelectedValue(selected: SelectDropdownModel): void {
    this.centerSelected = selected;
  }

  hanldeOnChangeCheckUseridSelectedValue(selected: SelectDropdownModel): void {
    this.checkUseridSelected = selected;
  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.search.emit();
  }

  handleOnChangeCheckOrder(value: Number): void {
    this.checkOrderSelected = value;
  }

  handleOnClickOpenPopup(): void {
    modifyBackToCloseModal();
    this.openMemberPopup.emit(true);
  }

  getParams(): any {
    let startDate = ConvertUtil.convertToStringFromDateModelAndLang(
      this.dateFilterSelected.fromDate,
      LangConstant.LANG_KR
    );
    let endDate = ConvertUtil.convertToStringFromDateModelAndLang(
      this.dateFilterSelected.toDate,
      LangConstant.LANG_KR
    );

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      chkOrder: this.checkOrderSelected,
      sDate: startDate,
      eDate: endDate,
      userId: this.userid,
      chkUserId: this.checkUseridSelected.value,
      cntCd: this.centerSelected.value,
      ordKind: this.kindSelected.value,
      ordPath: this.pathSelected.value,
      page: Number(this.page) - 1,
      len: this.len,
    }

    return params;
  }

  handleOnSearch(): void {
    let params = this.getParams();

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._orderSearchStore.dispatch(searchOrder({ params: params }));
    this._orderSearchStore.dispatch(countOrder({ params: params }));
    this._orderSearchStore.dispatch(sumOrder({ params: params }));
  }

  handleChangePage(): void {
    let params = this.getParams();

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._orderSearchStore.dispatch(searchOrder({ params: params }));
  }
}
