import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';

import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ADOPopupState, getListAdo, getTotalAdo } from '@app/selectors/myoffice/auto-ship/ado-popup.selector';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { environment } from '@enviroments/environment';
import { loadListAdo, loadTotalAdo } from "@actions/myoffice/auto-ship/ado-popup.action";
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { LenConstant } from '@app/common/constant/len.constant';

@Component({
  selector: 'ado-list-popup',
  templateUrl: './ado-list-popup.component.html',
  styleUrls: ['./ado-list-popup.component.css']
})
export class AdoListPopupComponent implements OnInit, OnChanges {

  @Input()
  show: boolean = false;

  @Output()
  closePopup = new EventEmitter<boolean>();

  @Output()
  clickRow = new EventEmitter<ADORegisterModel>();

  adoList$ = new Observable<ADORegisterModel[]>();
  items: ADORegisterModel[] = [];

  adoTotal$ = new Observable<number>();
  total: number = 0;

  count = 0
  adoNo: string = "";
  page: number = 0;
  len: number = 10;

  options: SelectDropdownModel[] = [];
  selected: SelectDropdownModel = new SelectDropdownModel();

  rows: number[] = [];

  config: PaginationInstance = {
    id: 'ado-popup',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  constructor(
    private adoPopupStore: Store<ADOPopupState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.adoList$ = this.adoPopupStore.select(getListAdo);
    this.adoTotal$ = this.adoPopupStore.select(getTotalAdo);
  }

  ngOnInit(): void {
    this.options = LenConstant.listLen;
    this.selected = this.options[0];
    this.len = Number(this.selected.value);

    this.adoList$.subscribe(res => {
      this.items = res;
      this.rows = new Array(5 - res.length);
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.adoTotal$.subscribe(res => {
      this.total = res;
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.selected = this.options[0];
      this.adoNo = "";
      this.page = 1;
      this.len = Number(this.selected.value);
      this.handleOnClickSearch();
    }
  }

  handleOnClickClosePopup(): void {
    this.closePopup.emit(false);
  }

  handleOnClickRow(item: ADORegisterModel) {
    this.clickRow.emit(item);
    this.handleOnClickClosePopup();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = this.page;

    let params = this.getParams();

    if (params.page < 0) return;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoPopupStore.dispatch(loadListAdo({ params: params }));
  }

  handleOnChangeSelected(selected: SelectDropdownModel): void {
    this.selected = selected;
    this.len = Number(selected.value);
    this.page = 1;
    this.config.totalItems = this.len;
    this.config.currentPage = this.page;
    this.handleOnClickSearch();
  }

  handleOnClickSearch(): void {
    this.page = 1;
    let params = this.getParams();

    if (params.page < 0) return;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoPopupStore.dispatch(loadListAdo({ params: params }));
    this.adoPopupStore.dispatch(loadTotalAdo({ params: params }));
  }

  getParams(): any {
    const logined = AuthUtil.getLoginedInfo();

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      adoNo: this.adoNo,
      userid: ConvertUtil.convertToSring(logined?.userid),
      page: this.page - 1,
      len: this.len,
    }
    return params;
  }
}
