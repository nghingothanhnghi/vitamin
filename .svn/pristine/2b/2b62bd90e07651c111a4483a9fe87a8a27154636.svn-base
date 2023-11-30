import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CenterState, getCenters } from '@app/selectors/system/center.selector';
import { CenterModel } from '@app/models/system/center.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { loadCenter } from '@app/actions/system/center.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { CheckUseridConstant } from '@app/common/constant/check-userid.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { CodeModel } from '@app/models/system/code.model';
import { loadCodesY } from '@app/actions/system/code.action';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { environment } from 'src/environments/environment';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { countOrderProduct, searchOrderProduct, sumOrderProduct } from '@app/actions/myoffice/order/order-product-search.action';
import { OrderPdtState } from '@app/selectors/myoffice/order/order-product-search.selector';
import { LangConstant } from '@app/common/constant/lang.constant';

declare const modifyBackToCloseModal: any;

@Component({
  selector: 'order-product-search-filter',
  templateUrl: './order-product-search-filter.component.html',
  styleUrls: ['./order-product-search-filter.component.css']
})
export class OrderProductSearchFilterComponent implements OnInit, OnChanges {

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
  center$ = new Observable<CenterModel[]>;

  yearOptions: SelectDropdownModel[] = [];
  centerOptions: SelectDropdownModel[] = [];
  checkUseridOptions: SelectDropdownModel[] = CheckUseridConstant.listCheckUserid;

  dateFilterSelected: DateFilterModel = new DateFilterModel();
  centerSelected: SelectDropdownModel = new SelectDropdownModel();
  checkUseridSelected: SelectDropdownModel = new SelectDropdownModel();
  pdtName: string = "";

  constructor(
    private _codeStore: Store<CodeState>,
    private _centerStore: Store<CenterState>,
    private _orderProductSearchStore: Store<OrderPdtState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.codesY$ = this._codeStore.select(getCodesY);
    this.center$ = this._centerStore.select(getCenters);
  }

  ngOnInit(): void {
    this._codeStore.dispatch(loadCodesY());
    this._centerStore.dispatch(loadCenter());

    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
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
    let reloadChangeEvent = changes["reload"];

    if ((ValidationUtil.isNotNullAndNotEmpty(reloadChangeEvent) && this.reload) || ValidationUtil.isNotNullAndNotEmpty(lenChangeEvent)) {
      if (ValidationUtil.isValidDateFilter(this.dateFilterSelected)) {
        this.handleOnSearch();
      }
    } else if (ValidationUtil.isNotNullAndNotEmpty(pageChangeEvent)) {
      this.handleChangePage();
    }
  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.search.emit();
  }

  hanldeOnChangeCenterSelectedValue(selected: SelectDropdownModel): void {
    this.centerSelected = selected;
  }

  hanldeOnChangeCheckUseridSelectedValue(selected: SelectDropdownModel): void {
    this.checkUseridSelected = selected;
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
      sDate: startDate,
      eDate: endDate,
      userId: this.userid,
      chkUserId: this.checkUseridSelected.value,
      cntCd: this.centerSelected.value,
      pdtId: this.pdtName,
      page: Number(this.page) - 1,
      len: this.len,
    }

    return params;
  }

  handleOnSearch(): void {
    let params = this.getParams();

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._orderProductSearchStore.dispatch(searchOrderProduct({ params: params }));
    this._orderProductSearchStore.dispatch(countOrderProduct({ params: params }));
    this._orderProductSearchStore.dispatch(sumOrderProduct({ params: params }));
  }

  handleChangePage(): void {
    let params = this.getParams();

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._orderProductSearchStore.dispatch(searchOrderProduct({ params: params }));
  }

  handleOnClickOpenPopup(): void {
    modifyBackToCloseModal();
    this.openMemberPopup.emit(true);
  }
}
