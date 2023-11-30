import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { environment } from 'src/environments/environment';
import { countZipPopupItems, getZipPopupItems, ZipPopupState } from '@app/selectors/system/zip-popup.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { countZipPopup, searchZipPopup } from '@app/actions/system/zip-popup.action';
import { Observable } from 'rxjs';
import { Zip } from '@app/models/system/zip.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
@Component({
  selector: 'zip-popup',
  templateUrl: './zip-popup.component.html',
  styleUrls: ['./zip-popup.component.css']
})
export class ZipPopupComponent implements OnInit {

  @Input()
  post:string="";

  @Input()
  showZip: boolean = false;

  @Output()
  clickCloseZipPopup = new EventEmitter<boolean>();

  @Output()
  onclickRowZipPopup = new EventEmitter<Zip>();

  search$ = new Observable<Zip[]>;
  count$ = new Observable<Number>;
  items: Zip[] = [];
  total: number = 0;

  count = 0
  value: string = "1";
  page: number = 0;
  len: number = 10;

  options: SelectDropdownModel[] = [];
  selected: SelectDropdownModel = new SelectDropdownModel();

  config: PaginationInstance = {
    id: 'zip-popup-grid',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  constructor(
    private _zipPopupStore: Store<ZipPopupState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
  ) {
    this.search$ = this._zipPopupStore.select(getZipPopupItems);
    this.count$ = this._zipPopupStore.select(countZipPopupItems);
  }

  ngOnInit(): void {
    this.value=this.post;
    
    this.options = LenConstant.listLen;
    this.selected = this.options[0];
    this.len = Number(this.selected.value);

    this.search$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
       this.items =res
      } else {
        this.items = [];
      }
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.count$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.total = Number(res);
        // this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }else{
        this.total=0;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showZip) {
      this.selected = this.options[0];
      this.value = this.post;
      this.page = 1;
      this.len = Number(this.selected.value);
      this.handleOnClickSearch();
    }
  }

  handleOnClickCloseZipPopup(): void {
    this.clickCloseZipPopup.emit(false);
  }

  handleOnClickRow(item: Zip) {
    this.onclickRowZipPopup.emit(item);
    this.handleOnClickCloseZipPopup();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = this.page;

    let params = this.getParams();

    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._zipPopupStore.dispatch(searchZipPopup({ params: params }));
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
    this.value=this.value;
    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._zipPopupStore.dispatch(searchZipPopup({ params: params }));
    this._zipPopupStore.dispatch(countZipPopup({ params: params }));
  }

  getParams(): any {
    let value =(this.value)? this.value:'*'
    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      value:value,
      page: this.page,
      len: this.len,
    }
    return params;
  }



}
