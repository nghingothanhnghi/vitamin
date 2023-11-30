import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { CodeModel } from '@app/models/system/code.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { Store } from '@ngrx/store';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { loadCodesY } from '@app/actions/system/code.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { OrderMileagetypeConstant } from '@app/common/constant/order-mileage-type.constant';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { OrderMileageInquiryState } from '@app/selectors/myoffice/order/order-mileage-inquiry.selector';
import { countOrderMileageInquiry, searchOrderMileageInquiry, sumOrderMileageInquiry } from '@app/actions/myoffice/order/order-mileage-inquiry.action';
import { LangConstant } from '@app/common/constant/lang.constant';

@Component({
  selector: 'order-mileage-inquiry-filter',
  templateUrl: './order-mileage-inquiry-filter.component.html',
  styleUrls: ['./order-mileage-inquiry-filter.component.css']
})
export class OrderMileageInquiryFilterComponent implements OnInit, OnChanges {

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

  codesY$ = new Observable<CodeModel[]>;

  yearOptions: SelectDropdownModel[] = [];
  typeOptions: SelectDropdownModel[] = OrderMileagetypeConstant.listOrderMileageType;

  dateFilterSelected: DateFilterModel = new DateFilterModel();
  typeSelected: SelectDropdownModel = new SelectDropdownModel();

  constructor(
    private _codeStore: Store<CodeState>,
    private _orderMileageInquiryStore: Store<OrderMileageInquiryState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.codesY$ = this._codeStore.select(getCodesY);
  }

  ngOnInit(): void {
    this._codeStore.dispatch(loadCodesY());

    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    if (ValidationUtil.isNotNullAndNotEmpty(this.typeOptions)) {
      this.typeSelected = this.typeOptions[0];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let pageChangeEvent = changes["page"];
    let lenChangeEvent = changes["len"];
    let reloadChangeEvent = changes["reload"];

    if ((ValidationUtil.isNotNullAndNotEmpty(reloadChangeEvent) && this.reload) || ValidationUtil.isNotNullAndNotEmpty(lenChangeEvent)) {
      this.handleOnSearch();
    } else if (ValidationUtil.isNotNullAndNotEmpty(pageChangeEvent)) {
      this.handleChangePage();
    }
  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.handleOnSearch();
  }

  handleOnChangeTypeSelectedValue(selected: SelectDropdownModel): void {
    this.typeSelected = selected;
  }

  handleOnSearch(): void {
    let params = this.getParams();

    if (!ValidationUtil.isValidDateFilter(this.dateFilterSelected)) return;
    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._orderMileageInquiryStore.dispatch(searchOrderMileageInquiry({ params: params }));
    this._orderMileageInquiryStore.dispatch(countOrderMileageInquiry({ params: params }));
    this._orderMileageInquiryStore.dispatch(sumOrderMileageInquiry({ params: params }));
  }

  handleChangePage(): void {
    let params = this.getParams();

    if (ValidationUtil.isValidDateFilter(this.dateFilterSelected)) return;
    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._orderMileageInquiryStore.dispatch(searchOrderMileageInquiry({ params: params }));
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
      kind: this.typeSelected.value,
      page: Number(this.page) - 1,
      len: this.len,
    }

    return params;
  }

  handleOnOpenMemberPopup(): void {
    this.openMemberPopup.emit(true);
  }
}
