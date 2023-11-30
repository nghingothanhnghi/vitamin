import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { CodeModel } from '@app/models/system/code.model';
import {
  CodeState,
  getCodesY,
  getCodesO,
  getCodesT,
} from '@app/selectors/system/code.selector';
import {
  loadCodesY,
  loadCodesO,
  loadCodesT,
} from '@app/actions/system/code.action';
import { OrderSearchState } from '@app/selectors/myoffice/order/order-search.selector';
import {
  searchOrder,
  countOrder,
  sumOrder,
} from '@app/actions/myoffice/order/order-search.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { environment } from 'src/environments/environment';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LangConstant } from '@app/common/constant/lang.constant';
import { ValidationUtil } from '@app/common/util/validation.util';

@Component({
  selector: 'order-search-filter',
  templateUrl: './order-search-filter.component.html',
  styleUrls: ['./../order-search.component.css'],
})
export class OrderSearchFilterComponent implements OnInit, OnChanges {

  @Input()
  reload: boolean = false;

  @Input()
  page: number | String = 0;

  @Input()
  len: number | String = 10;

  @Input()
  userid: string = '';

  @Input()
  username: string = '';

  @Output()
  openMemberPopup = new EventEmitter<boolean>();

  @Output()
  search = new EventEmitter<any>();
  
  codesY$ = new Observable<CodeModel[]>();
  codesO$ = new Observable<CodeModel[]>();
  codesT$ = new Observable<CodeModel[]>();

  yearOptions: SelectDropdownModel[] = [];
  kindOptions: SelectDropdownModel[] = [];
  pathOptions: SelectDropdownModel[] = [];

  kindSelected: SelectDropdownModel = new SelectDropdownModel();
  pathSelected: SelectDropdownModel = new SelectDropdownModel();
  dateFilterSelected: DateFilterModel = new DateFilterModel();
  checkOrderSelected: Number = 2;

  constructor(
    private _codeStore: Store<CodeState>,
    private _orderSearchStore: Store<OrderSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.codesY$ = this._codeStore.select(getCodesY);
    this.codesO$ = this._codeStore.select(getCodesO);
    this.codesT$ = this._codeStore.select(getCodesT);
  }

  ngOnInit(): void {
    this._codeStore.dispatch(loadCodesY());
    this._codeStore.dispatch(loadCodesO());
    this._codeStore.dispatch(loadCodesT());

    const defaultSelected = { label: '전체 유형', value: '' };

    this.codesY$.subscribe((res) => {
      this.yearOptions = [];
      res.forEach((item) =>
        this.yearOptions.push({
          label: item.codeName,
          value: ConvertUtil.convertToSring(item.codeS1),
        })
      );
    });

    this.codesO$.subscribe((res) => {
      this.kindOptions = [];
      this.kindOptions.push(defaultSelected);
      res.forEach((item) =>
        this.kindOptions.push({
          label: item.codeName,
          value: ConvertUtil.convertToSring(item.codeCd),
        })
      );
      this.kindSelected = this.kindOptions[0];
    });

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    let pageChangeEvent = changes['page'];
    let lenChangeEvent = changes['len'];
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

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.search.emit();
  }

  handleOnChangeCheckOrder(value: Number): void {
    this.checkOrderSelected = value;
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
      chkUserId: '1',
      cntCd: '',
      ordKind: this.kindSelected.value,
      ordPath: this.pathSelected.value,
      page: Number(this.page) - 1,
      len: this.len,
    };

    return params;
  }

  handleOnSearch(): void {
    let params = this.getParams();

    this._overlayLoadingStore.dispatch(
      setShowOverlayLoading({ loading: true })
    );

    this._orderSearchStore.dispatch(searchOrder({ params: params }));
    this._orderSearchStore.dispatch(countOrder({ params: params }));
    this._orderSearchStore.dispatch(sumOrder({ params: params }));
  }

  handleChangePage(): void {
    let params = this.getParams();

    this._overlayLoadingStore.dispatch(
      setShowOverlayLoading({ loading: true })
    );

    this._orderSearchStore.dispatch(searchOrder({ params: params }));
  }

  handleOnClickOpenPopup(): void {
    this.openMemberPopup.emit(true);
  }
}
