import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { detailNotice, listFile } from '@app/actions/myoffice/notice/notice.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { BoardModel } from '@app/models/myoffice/notice/board.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getDetailNoticeItems, getListFileItems, NoticeDetailState } from '@app/selectors/myoffice/notice/notice-detail.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


declare const updateSrc: any;

@Component({
  selector: 'app-asv-notice-detail',
  templateUrl: './asv-notice-detail.component.html',
  styleUrls: ['./asv-notice-detail.component.css']
})
export class AsvNoticeDetailComponent implements OnInit {

  boardNo: String = "";
  contents : any;

  noticeDetail$ = new Observable<BoardModel>;
  listFile$ = new Observable<BoardModel[]>;

  noticeDetail: BoardModel = {} as BoardModel;
  listFile: BoardModel[] = [] as BoardModel[];

  params : any = "";

  smWownet$ = new Observable<SmWownetModel>;
  urlWownet : String = "";

  fileDownload : any = {};

  constructor(
    private _noticeDetailStore: Store<NoticeDetailState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private http : HttpClient
  ) {
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
   }

  ngOnInit(): void {

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    this.params = sessionStorage.getItem("boardNoAsv");
    this.boardNo = JSON.parse(this.params);

    this.onSearch();

  }

  onSearch(): void {

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this._noticeDetailStore.dispatch(detailNotice({ boardNo: this.boardNo }))
    this._noticeDetailStore.dispatch(listFile({ boardNo: this.boardNo }))

    this.noticeDetail$ = this._noticeDetailStore.select(getDetailNoticeItems);
    this.listFile$ = this._noticeDetailStore.select(getListFileItems);

    this.noticeDetail$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.noticeDetail = res;
        this.contents = res.contents;
      }
    })

    this.listFile$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {

        this.listFile = res;
      }
    })

    setTimeout(() => {
      this.updateSrcForElement();
    }, 500);

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

  onClickPrevNext(boardNo : String): void {
    sessionStorage.setItem('boardNoAsv', JSON.stringify(boardNo));
    this.boardNo = boardNo;
    this.onSearch();
  }
  
  updateSrcForElement() {
    let e = document.getElementById('postBody') as HTMLElement; 
    updateSrc(e, this.urlWownet);
  }



  downloadFile(item : any) {
    
    const filePath = item.filePath;
    const fileName = item.fileName;
    const url = this.urlWownet + "/" + filePath + "/" + fileName;

    this.http.get(`${url}`,{
      responseType: 'blob'} 
    ).subscribe(response => {

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

}
