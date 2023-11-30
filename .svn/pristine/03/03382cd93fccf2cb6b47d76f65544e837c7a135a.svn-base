import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteQna, detailQna } from '@app/actions/myoffice/notice/qna.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { loadSmWownet } from '@app/actions/system/sm-wownet.action';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { CustomerConsultationGuideDetailModel } from '@app/models/myoffice/notice/customer-consultation-guide-detail.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getDetailQnaItems, getResultDelete, QnaSearchState } from '@app/selectors/myoffice/notice/qna.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const updateSrc: any;

@Component({
  selector: 'app-customer-consultation-guide-detail',
  templateUrl: './customer-consultation-guide-detail.component.html',
  styleUrls: ['./customer-consultation-guide-detail.component.css']
})
export class CustomerConsultationGuideDetailComponent implements OnInit {


  boardNo: Number = 0;

  qnaDetail$ = new Observable<CustomerConsultationGuideDetailModel>;

  qnaDetail: CustomerConsultationGuideDetailModel = {} as CustomerConsultationGuideDetailModel;
  params : any = "";

  smWownet$ = new Observable<SmWownetModel>;
  urlWownet : String = "";
  getResultDelete$ = new Observable<ResultProcessModel>;
  userId: string = "";
  actionDeleteQnaSuccessfull: string = "actionDeleteQnaSuccessfull";
  actionConfirmDeleteQna : String = "actionConfirmDeleteQna";
  wAlertStatus$ = new Observable<WAlertStatus>();
  
  constructor(
    private _qnaDetailStore: Store<QnaSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
    private _router: Router
  ) {
    this.getResultDelete$ = this._qnaDetailStore.select(getResultDelete);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }
  
  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
    }

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    this.params = sessionStorage.getItem("boardNoQna");
    this.boardNo = JSON.parse(this.params);
    
    this._qnaDetailStore.dispatch(detailQna({ boardNo: this.boardNo }))

    this.qnaDetail$ = this._qnaDetailStore.select(getDetailQnaItems);

    this.qnaDetail$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {

        this.qnaDetail = res;
      }
    })

    setTimeout(() => {
      this.updateSrcForElement();
    }, 500);

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));

    this.wAlertStatus$.subscribe(res => {
      if (res.action === this.actionConfirmDeleteQna && res.isConfirm) {
        this.deleteQna();
        this._wAlertStore.dispatch(clearWAlert());
      } else if (res.action === this.actionDeleteQnaSuccessfull) {
        this._router.navigate(["/serviceCenter/qna"]);
        this._wAlertStore.dispatch(clearWAlert());
      }
    });

  }

  updateSrcForElement() {
    let elementQ = document.getElementById('postBodyQ') as HTMLElement; 
    updateSrc(elementQ, this.urlWownet);

    let elementA = document.getElementById('postBodyA') as HTMLElement; 
    updateSrc(elementA, this.urlWownet);
  }

  confirmDelete() {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgQna1, action: this.actionConfirmDeleteQna } }));
  }

  deleteQna() {
    let params = {
      comId:  environment.comId,
      workUser : this.userId,
      formNo : '6090',
      boardNo : this.qnaDetail.boardNoQ,
      boardNoQ : this.qnaDetail.boardNoQ,
      boardNoA : this.qnaDetail.boardNoA,
      kindCd: environment.comCd + "B08",
    }

    this._qnaDetailStore.dispatch(deleteQna({params:params}));
    this.getResultDelete$.subscribe( result => {
      if(ValidationUtil.isNotNullAndNotEmpty(result) && result.retStr && result.retStr.length > 0) {
        if(result.retCode=='OK'){
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: result.retStr,action: this.actionDeleteQnaSuccessfull } }));
          } else {
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: result.retStr } }));
          }
      }
    });
  }

}
