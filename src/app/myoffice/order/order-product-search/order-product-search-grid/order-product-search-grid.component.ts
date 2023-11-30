import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { PaginationInstance } from 'ngx-pagination';
import { getOrderProductSearchItems, getOrderProductTotalItems, getOrderProductSumItem, OrderPdtState } from '@app/selectors/myoffice/order/order-product-search.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { OpenOrderInfoUtil } from '@app/common/util/open-order-info-page.util';
import { LenConstant } from '@app/common/constant/len.constant';
import { UserKindConstant } from '@app/common/constant/user-kind.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getFindPayHeader, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

declare const getYnPayHeader: any;

@Component({
  selector: 'order-product-search-grid',
  templateUrl: './order-product-search-grid.component.html',
  styleUrls: ['./order-product-search-grid.component.css']
})
export class OrderProductSearchGridComponent implements OnInit, OnChanges {

  @Input()
  page: number = 0;

  @Input()
  len: number = 10;

  @Output()
  changeLen = new EventEmitter<SelectDropdownModel>();
  
  @Output()
  changePage = new EventEmitter<number>();

  @Output()
  resetReload = new EventEmitter<boolean>();

  userKindCd: string = "";
  consumerKindCd: string = UserKindConstant.consumerKindCd;

  totalItems: number = 0;

  items$ = new Observable<OrderPdtModel[]>;
  total$ = new Observable<Number>;
  sum$ = new Observable<OrderPdtModel>;

  items: OrderPdtModel[] = [];
  options: SelectDropdownModel[] = LenConstant.listLen;

  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  totalCols: number = 10;
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  smPayHeader$ = new Observable<SmPayHeaderModel>();
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;

  config: PaginationInstance = {
    id: 'order-product-grid',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }

  constructor(
    private _orderProductSearchStore: Store<OrderPdtState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.items$ = this._orderProductSearchStore.select(getOrderProductSearchItems);
    this.total$ = this._orderProductSearchStore.select(getOrderProductTotalItems);
    this.sum$ = this._orderProductSearchStore.select(getOrderProductSumItem);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    let loginedInfo = AuthUtil.getLoginedInfo();
    if (loginedInfo) {
      this.userKindCd = ConvertUtil.convertToSring(loginedInfo.userKindCd);
    }

    this.selectedValue = this.options[0];

    this.smWowWord$.subscribe(res => this.smWowWord = res);
    
    this.smWownetPg$.subscribe(res => {
      this.isPoint = res.settMPoint === "Y";
      this.setBlankRow();
    });

    this.smPayHeader$.subscribe(res => {
      this.isPv1 = getYnPayHeader(res, "pv1");
      this.isPv2 = getYnPayHeader(res, "pv2");
      this.isPv3 = getYnPayHeader(res, "pv3");

      this.setBlankRow();
    });


    this.items$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }

      this.setBlankRow();
      this.resetReload.emit(false);
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.total$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
  }

  handleOnClickOrderNo(orderNo: String): void {
    OpenOrderInfoUtil.openOrderInfoPage(orderNo);
  }

  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    this.changeLen.emit(selected);
  }

  handleOnChangePage(page: number): void {
    this.changePage.emit(page);
  }

  setBlankRow() {
    this.totalCols = 9;
    if (this.isPv1) this.totalCols++;
    // if (this.isPv2) this.totalCols++;
    // if (this.isPv3) this.totalCols++;
    if (this.isPoint) this.totalCols++;

    this.totalRows = this.items.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.cols = new Array(this.totalCols);
  }
}
