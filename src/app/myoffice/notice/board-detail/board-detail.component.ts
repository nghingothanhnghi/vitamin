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
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const adjustPostContent: any;
declare const downloadAttachment: any;
declare const backToTop: any;

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

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
    private _wAlertStore: Store<WAlertState>,
    private http : HttpClient,
  ) { 
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }

  ngOnInit(): void {
    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    this.params = sessionStorage.getItem("boardNoDetail");
    this.boardNo = JSON.parse(this.params);

    setTimeout(() => {
      this.onSearch();
    }, 300);
    
  }

  onSearch(): void {

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

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
      this.listFile = []
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.listFile = res;
      }
    })

    setTimeout(() => {
      this.updateSrcForElement();
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    }, 500);

    if (typeof backToTop === "function") {
      setTimeout(() => backToTop(), 500);
    }
  }

  onClickPrevNext(boardNo : String): void {
    sessionStorage.setItem('boardNoDetail', JSON.stringify(boardNo));
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

  downloadAttachment() {

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let msg = MessageConstant.msgDownloadFileFail;
    let icon = WAlertConstant.warning;
    const url =`${environment.apiUrl}/board/attachment?comId=${environment.comId}&boardNo=${this.boardNo}`;
    
    this.http.get(`${url}`).subscribe(response => {
      if (ValidationUtil.isNotNullAndNotEmpty(response)) {
        downloadAttachment(response,this.boardNo, this.urlWownet);
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
