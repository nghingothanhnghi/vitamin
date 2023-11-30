import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { detailNotice, listFile } from '@app/actions/myoffice/notice/notice.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { BoardModel } from '@app/models/myoffice/notice/board.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getDetailNoticeItems, getListFileItems, NoticeDetailState } from '@app/selectors/myoffice/notice/notice-detail.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const adjustPostContent: any;
declare const backToTop: any;

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent implements OnInit {

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
    private http : HttpClient,
    private _wAlertStore: Store<WAlertState>
  ) {
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }
  
  ngOnInit(): void {

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    this.params = sessionStorage.getItem("boardNo");
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
      this.listFile = [];
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.listFile = res;
      }
    })

    setTimeout(() => this.updateSrcForElement(), 500);

    if (typeof backToTop === "function") {
      setTimeout(() => backToTop(), 500);
    }

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

  onClickPrevNext(boardNo : String): void {
    sessionStorage.setItem('boardNo', JSON.stringify(boardNo));
    this.boardNo = boardNo;
    this.onSearch();
  }
  
  updateSrcForElement() {
    let e = document.getElementById('postBody') as HTMLElement; 
    adjustPostContent(e, this.urlWownet);
  }



  downloadFile(item : any) {
    
    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let msg = MessageConstant.msgDownloadFileFail;
    let icon = WAlertConstant.warning;

    const filePath = item.filePath;
    const fileName = item.fileName;
    const url = this.urlWownet + "/" + filePath + "/" + fileName;

    this.http.get(`${url}`,{
      responseType: 'blob'} 
    ).subscribe(response => {
      if (ValidationUtil.isNotNullAndNotEmpty(response)) {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        msg = MessageConstant.msgDownloadFileSuccess;
        icon = WAlertConstant.successful
        setTimeout(() => {
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: icon, message: msg } }));
          this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        }, 250);
      } else {
        setTimeout(() => {
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: icon, message: msg } }));
          this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        }, 250);
      }
      
    });
  }

}
