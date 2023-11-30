import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { countNotice, searchNotice, searchNoticeY } from '@app/actions/myoffice/notice/notice.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { getNoticeSearchItems, getNoticeTotalItems, getNoticeYSearchItems, NoticeSearchState } from '@app/selectors/myoffice/notice/notice.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PaginationInstance } from 'ngx-pagination';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  page: number = 1;

  len: number = 10;

  totalItems: number = 0;

  config: PaginationInstance = {
    id: 'notice',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }

  options: SelectDropdownModel[] = LenConstant.listLen;
  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  noticeSearchItems$ = new Observable<NoticeModel[]>;
  noticeYSearchItems$ = new Observable<NoticeModel[]>;
  noticeTotalItems$ = new Observable<Number>;

  
  collection: NoticeModel[] = [];
  collection2: NoticeModel[] = [];
  rows: number[] = [];
  cols: number[] = new Array(4);
  totalCols: number = 5;
  totalRows: number = 0;
  totalRowsY: number = 0;
  searchKey : String = "";
  floorTotalCols= Math.floor((this.totalCols/2));

  deviceType:string = ''

  constructor(
    private _noticeSearchStore: Store<NoticeSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
   
   }

  ngOnInit(): void {
    this.deviceType = this.deviceService.isDesktop()? 'PC':'MOBILE'

    this.selectedValue = this.options[0];

    this.onSearch();

  }

  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.len = Number(selected.value);
      this.page = 1;
      this.onSearch();
    }
  }

  handleOnChangePage(page: number): void {
     this.page = page;
    this.onSearch();
  }

  handleOnClickBoardNo(boardNo: String): void {

    sessionStorage.setItem('boardNo', JSON.stringify(boardNo));
    this.router.navigate(['/serviceCenter/notice-detail']);
  }

  getParams(flag : String): any {

    let topYn = "";

    if(flag == "1") {
      topYn = "N"
    } else if(flag == "2") {
      topYn = "Y"
    }

    let params = {
      comId: environment.comId,
      comCd: environment.comCd,
      topYn: topYn,
      searchKey : this.searchKey.trim(),
      kindCd : environment.comCd + "B02",
      page: Number(this.page) - 1,
      len: this.len
    }

    return params;
  }

  onSearch(): void {
    
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    let params = this.getParams("1");
    let params2 = this.getParams("2");

    this._noticeSearchStore.dispatch(searchNotice({ params: params }));
    this._noticeSearchStore.dispatch(countNotice({ params: params }));
    this._noticeSearchStore.dispatch(searchNoticeY({ params: params2 }));

    this.noticeSearchItems$ = this._noticeSearchStore.select(getNoticeSearchItems);
    this.noticeYSearchItems$ = this._noticeSearchStore.select(getNoticeYSearchItems);
    this.noticeTotalItems$ = this._noticeSearchStore.select(getNoticeTotalItems);
    
     //Render Body
     this.noticeSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
        this.rows =[];
      } else {
        this.collection = [];
      }
      
    
    });

    this.noticeYSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection2 = res;
        this.rows =[];
      } else {
        this.collection2 = [];
      }

      this.setBlankRow();

      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    //Total Items Of data
    this.noticeTotalItems$.subscribe(res => {
      debugger
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    })
  }
  
  setBlankRow() {
    this.totalRows = this.collection.length;
    this.totalRowsY = this.collection2.length;
    if (this.totalRows === 0 && this.totalRowsY === 0) {
      this.rows = new Array(5);
    }

    this.cols = new Array(this.totalCols);
  }

}
