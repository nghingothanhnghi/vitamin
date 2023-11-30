import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countBoardList, searchBoardList} from '@app/actions/myoffice/notice/notice.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { counstBoardListTotalItems, NoticeSearchState, searchBoardListItems } from '@app/selectors/myoffice/notice/notice.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

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

  boardListItems$ = new Observable<NoticeModel[]>;
  boardListTotalItems$ = new Observable<Number>;

  
  collection: NoticeModel[] = [];
  rows: number[] = [];
  cols: number[] = new Array(4);
  totalCols: number = 5;
  totalRows: number = 0;
  totalRowsY: number = 0;
  searchKey : String = "";
  floorTotalCols= Math.floor((this.totalCols/2));

  constructor(
    private _noticeSearchStore: Store<NoticeSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    sessionStorage.setItem('boardNoDetail', JSON.stringify(boardNo));
    this.router.navigate(['/servicePage/archives-board-detail']);
  }

  getParams(): any {

    let params = {
      comId: environment.comId,
      comCd: environment.comCd,
      kindCd : environment.comCd + "B10",
      searchKey : this.searchKey.trim(),
      page: Number(this.page) - 1,
      len: this.len
    }

    return params;
  }

  onSearch(): void {

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    let params = this.getParams();

    this._noticeSearchStore.dispatch(searchBoardList({ params: params }));
    this._noticeSearchStore.dispatch(countBoardList({ params: params }));

    this.boardListItems$ = this._noticeSearchStore.select(searchBoardListItems);
    this.boardListTotalItems$ = this._noticeSearchStore.select(counstBoardListTotalItems);
    
     //Render Body
     this.boardListItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
        if (this.collection.length < 5) {
          this.rows = new Array(5 - this.collection.length);
        }
      } else {
        this.collection = [];
        this.rows = new Array(5);
      }

      this.setBlankRow();

      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    //Total Items Of data
    this.boardListTotalItems$.subscribe(res => {
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
    if (this.totalRows === 0 ) {
      this.rows = new Array(5);
    }
    this.cols = new Array(this.totalCols);
  }

}
