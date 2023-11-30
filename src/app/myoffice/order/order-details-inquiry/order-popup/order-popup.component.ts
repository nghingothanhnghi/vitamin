import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from 'src/environments/environment';
import { countOrderPopupItems, getOrderPopupItems, OrderPopupState } from '@app/selectors/myoffice/order/order-popup.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { countOrderPopup, searchOrderPopup } from '@app/actions/myoffice/order/order-popup.action';
import { Observable } from 'rxjs';
import { OrderPopupModel } from '@app/models/myoffice/order/order-popup.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { LenConstant } from '@app/common/constant/len.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';

@Component({
  selector: 'order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css']
})
export class OrderPopupComponent implements OnInit, OnChanges {

  @Input()
  show: boolean = false;

  @Output()
  clickCloseOrderPopup = new EventEmitter<boolean>();

  search$ = new Observable<OrderPopupModel[]>;
  count$ = new Observable<Number>;
  items: OrderPopupModel[] = [];
  total: number = 0;

  userid: string = "";
  username: string = "";
  orderNo: string = "";
  page: number = 0;
  len: number = 10;

  options: SelectDropdownModel[] = LenConstant.listLen;
  selected: SelectDropdownModel = new SelectDropdownModel();

  config: PaginationInstance = {
    id: 'order-popup-grid',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }
  totalCols: number = 4;
  message: string = "조회된 데이타가 없습니다.";
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  smWownet$ = new Observable<SmWownetModel>();
  chkUserId: string = "6";

  constructor(
    private _orderPopupStore: Store<OrderPopupState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _router: Router,
    private _smWownetStateStore: Store<SmWownetState>
  ) { 
    this.search$ = this._orderPopupStore.select(getOrderPopupItems);
    this.count$ = this._orderPopupStore.select(countOrderPopupItems);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }

  ngOnInit(): void {

    this.smWownet$.subscribe(res => {
      this.chkUserId = "6";
      if (res.musePId === "Y" && (res.guildKind === "MACCO" || res.guildCd === 'KOSSA')) {
        this.chkUserId = "3";
      }
    });  

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
    }

    this.selected = this.options[0];
    this.len = Number(this.selected.value);

    this.search$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.setBlankRow();
    });

    this.count$.subscribe(res => {
      this.total = Number(res);
      this.config.totalItems = this.total;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.selected = this.options[0];
  
      this.username = "";
      this.orderNo = "";
      this.page = 1;
      this.len = Number(this.selected.value);
      this.handleOnClickSearch();
    }
  }

  handleOnClickCloseOrderPopup(): void {
    this.clickCloseOrderPopup.emit(false);
  }

  handleOnClickRow(item: OrderPopupModel) {
    this._router.navigateByUrl(`/my-office/order-management/order-details-inquiry?order-no=${item.ordNo}`);
    this.handleOnClickCloseOrderPopup();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = this.page;

    let params = this.getParams();

    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._orderPopupStore.dispatch(searchOrderPopup({ params: params }));
  }

  handleOnChangeSelected(selected: SelectDropdownModel): void {
    this.selected = selected;
    this.len = Number(selected.value);
    this.page = 1;
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
    this.handleOnClickSearch();
  }

  handleOnClickSearch(): void {
    this.page = 1;
    let params = this.getParams();

    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._orderPopupStore.dispatch(searchOrderPopup({ params: params }));
    this._orderPopupStore.dispatch(countOrderPopup({ params: params }));
  }

  getParams(): any {
    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      ordNo: this.orderNo,
      userName: this.username,
      userId: this.userid,
      chkUserId: this.chkUserId,
      page: this.page - 1,
      len: this.len,
    }

    return params;
  }

  setBlankRow() {
    this.totalRows = this.items.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.cols = new Array(this.totalCols);
  }
}
