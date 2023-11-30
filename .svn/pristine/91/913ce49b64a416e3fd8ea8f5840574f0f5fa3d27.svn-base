import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { searchBoardFindLasted} from '@app/actions/myoffice/notice/notice.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { getBoardFindLastedSearchItems, NoticeSearchState } from '@app/selectors/myoffice/notice/notice.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const downloadAttachment: any;

@Component({
  selector: 'hp-notice',
  templateUrl: './hp-notice.component.html',
  styleUrls: ['./hp-notice.component.css']
})
export class HpNoticeComponent implements OnInit {
  //Notice
  noticeSearchItems$ = new Observable<NoticeModel[]>;
  collection: NoticeModel[] = [];
  
  @Input() urlWownet : String = "";
  isLogined: boolean = AuthUtil.isLogined();
  wAlertStatus$ = new Observable<WAlertStatus>();
  actionConfirmDownload: string = "action_confirm_download";

  constructor(
    private _noticeSearchStore: Store<NoticeSearchState>,
    private router: Router,
    private http : HttpClient,
    private _wAlertStore: Store<WAlertState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.noticeSearchItems$ = this._noticeSearchStore.select(getBoardFindLastedSearchItems);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    this.onSearchNotice();

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
    
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmDownload && status.isConfirm) {
      this.router.navigate(["/login"]);
    }
  }

  onSearchNotice(): void {
    let params = this.getParams();

    this._noticeSearchStore.dispatch(searchBoardFindLasted({ params: params }));
    
     //Render Body
     this.noticeSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
      } else {
        this.collection = [];
      }
    });
  }

  getParams(): any {
    let params = {
      comId: environment.comId,
      comCd: environment.comCd,
    }
    return params;
  }

  handleOnClickBoardNo(boardNo: String): void {
    sessionStorage.setItem('boardNo', JSON.stringify(boardNo));
    this.router.navigate(['/serviceCenter/notice-detail']);
  }

  downloadAttachment(boardNo : any) {
    if (!this.isLogined) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgRequiredLogin, action: this.actionConfirmDownload } }));
    } else {
      setTimeout(() => {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      }, 1);
  
      let msg = MessageConstant.msgDownloadFileFail;
      let icon = WAlertConstant.warning;
      const url =`${environment.apiUrl}/board/attachment?comId=${environment.comId}&boardNo=${boardNo}`;
      
      this.http.get(`${url}`).subscribe(response => {
        if (ValidationUtil.isNotNullAndNotEmpty(response)) {
          downloadAttachment(response,boardNo, this.urlWownet);
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
}
