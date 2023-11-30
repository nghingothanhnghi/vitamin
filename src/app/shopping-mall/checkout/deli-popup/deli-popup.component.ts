import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { LenConstant } from '@app/common/constant/len.constant';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { DeliPopupState, getListDeli, getTotalDeli } from '@app/selectors/shoppingmall/deli-popup.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { countDelis, loadDelis } from '@app/actions/shoppingmall/deli-popup.action';

@Component({
  selector: 'deli-popup',
  templateUrl: './deli-popup.component.html',
  styleUrls: ['./deli-popup.component.css']
})
export class DeliPopupComponent implements OnInit, OnChanges {

  @Input()
  show: boolean = false;

  @Output()
  clickClosePopup = new EventEmitter<boolean>();

  @Output()
  clickRowItem = new EventEmitter<OrderMstModel>();

  lenOptions: SelectDropdownModel[] = LenConstant.listLen;
  lenSelected: SelectDropdownModel = this.lenOptions[0];

  search$ = new Observable<OrderMstModel[]>();
  count$ = new Observable<Number>();

  items: OrderMstModel[] = [];
  total: number = 0;

  userid: string = "";
  page: number = 0;
  len: number = 10;

  rows: number[] = [];

  config: PaginationInstance = {
    id: 'deli-popup-grid',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _deliPopupStore: Store<DeliPopupState>
  ) {
    this.search$ = this._deliPopupStore.select(getListDeli);
    this.count$ = this._deliPopupStore.select(getTotalDeli);
  }

  ngOnInit(): void {
    const logined = AuthUtil.getLoginedInfo();
    if (logined) {
      this.userid = ConvertUtil.convertToSring(logined.userid);
    }

    this.len = Number(this.lenSelected.value);

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this.search$.subscribe(res => {
      this.items = res;
      this.rows = new Array(5 - res.length);
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.count$.subscribe(res => {
      this.total = +res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.page = 1;
      this.lenSelected = this.lenOptions[0];
      this.len = Number(this.lenSelected.value);
      this.handleOnClickSearch();
    }
  }

  handleOnClickClosePopup(): void {
    this.clickClosePopup.emit(false);
  }

  handleOnChangeLenSelected(selected: SelectDropdownModel): void {
    this.lenSelected = selected;

    this.page = 1;
    this.len = Number(this.lenSelected.value);

    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;

    this.handleOnClickSearch();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = page;

    if (this.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._deliPopupStore.dispatch(loadDelis({ userid: this.userid, page: this.page - 1, len: this.len }));
  }

  handleOnClickSearch(): void {
    this.page = 1;
    this.config.currentPage = 1;

    if (this.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._deliPopupStore.dispatch(loadDelis({ userid: this.userid, page: this.page - 1, len: this.len }));
    this._deliPopupStore.dispatch(countDelis({ userid: this.userid, page: this.page - 1, len: this.len }));
  }

  handleOnClickRow(item: OrderMstModel): void {
    this.clickRowItem.emit(item);
    this.handleOnClickClosePopup();
  }
}
