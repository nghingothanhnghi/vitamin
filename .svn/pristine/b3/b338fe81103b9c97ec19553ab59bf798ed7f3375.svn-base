import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countBoardList, searchBoardList } from '@app/actions/myoffice/notice/notice.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { counstBoardListTotalItems, NoticeSearchState, searchBoardListItems } from '@app/selectors/myoffice/notice/notice.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';


declare const addEventListenerYoutubePlay: any;

@Component({
  selector: 'app-last-broadcast',
  templateUrl: './last-broadcast.component.html',
  styleUrls: ['./last-broadcast.component.css',
              './../../../../assets/css/home/media-center.css']
})
export class LastBroadcastComponent implements OnInit {

  boardListItems$ = new Observable<NoticeModel[]>;
  boardListTotalItems$ = new Observable<Number>;

  collection: NoticeModel[] = [];

  smWownet$ = new Observable<SmWownetModel>;
  urlWownet : String = "";

  searchKey : String = "";

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

  constructor(
    private _noticeSearchStore: Store<NoticeSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private router: Router,
    private _smWownetStateStore: Store<SmWownetState>
  ) {
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
   }

  ngOnInit(): void {

    this.selectedValue = this.options[0];

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    setTimeout(() => {
      this.onSearch();
    }, 300);
  }

  handleOnClickBoardNo(boardNo: String): void {
    sessionStorage.setItem('boardNoDetail', JSON.stringify(boardNo));
    this.router.navigate(['/servicePage/last-broadcast-detail']);
  }

  getParams(): any {

    let params = {
      comId: environment.comId,
      comCd: environment.comCd,
      searchKey : this.searchKey.trim(),
      kindCd : environment.comCd + "B11",
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
        let item = [];

        for(let i = 0; i<res.length;i++) {
          let pathImg = "./assets/img/noImage.jpg";
          if(ValidationUtil.isNotNullAndNotEmpty(res[i].filePath) && ValidationUtil.isNotNullAndNotEmpty(res[i].fileName)) {
             pathImg = this.urlWownet + "/" + res[i].filePath + "/" + res[i].fileName;
          }
          item.push({... res[i], "pathImg" : pathImg});
        }
        this.collection = item;
      } else {
        this.collection = [];
      }
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

    setTimeout(() => {
      addEventListenerYoutubePlay("#last-broadcast .ytp-play-button");
    }, 500);

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
}
