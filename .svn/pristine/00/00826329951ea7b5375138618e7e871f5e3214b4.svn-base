import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { eventVideos } from '@app/actions/myoffice/schedule/schedule.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { BoardModel } from '@app/models/myoffice/notice/board.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getEventVideoItems, ScheduleState } from '@app/selectors/myoffice/schedule/schedule.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const adjustPostContent: any;
declare const backToTop: any;

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {

  wAlertStatus$ = new Observable<WAlertStatus>();
  eventVideo$ = new Observable<BoardModel>();

  board: BoardModel = {} as BoardModel;

  boardNo: String = "";
  params : any = "";
  contents : any;

  smWownet$ = new Observable<SmWownetModel>;
  urlWownet : String = "";

  constructor(
    private _scheduleDetailStore: Store<ScheduleState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private http : HttpClient,
  ) { 
    this.eventVideo$ = this._scheduleDetailStore.select(getEventVideoItems);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }

  ngOnInit(): void {
    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    this.params = sessionStorage.getItem("regNo");
    this.boardNo = JSON.parse(this.params);
    this.onSearch();

  }

  onSearch(): void {
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._scheduleDetailStore.dispatch(eventVideos({ regNo: this.boardNo }))

    this.eventVideo$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.board = res;
        this.contents = res.contents;
      }
    })

    setTimeout(() => {
      this.updateSrcForElement();
    }, 500);

    if (typeof backToTop === "function") {
      setTimeout(() => backToTop(), 500);
    }

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

  onClickEvents(regNo: String){
    sessionStorage.setItem('regNo', JSON.stringify(regNo));
    this.boardNo = regNo;
    this.onSearch();
  }

  updateSrcForElement() {
    let e = document.getElementById('postBody') as HTMLElement; 
    adjustPostContent(e, this.urlWownet);
  }

  downFile() {
    const filePath = this.board.filePath;
    const fileName = ConvertUtil.convertToSring(this.board.fileName);
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
