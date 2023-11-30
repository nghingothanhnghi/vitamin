import { Component, OnDestroy, OnInit } from '@angular/core';
import { getActivityStatusDashBoard, getActivityStatusDashBoardCount, getInfoDashBoard, getListMonthPaymentDate, getListPaymentDate, getListPaymentDateSuccess, getSatusOfRankDashBoard, getSatusOfRankDashBoardSum } from '@app/actions/myoffice/dashboard/dashboard.action';
import { getInfoMemImage, getInfoMemImageSuccess } from '@app/actions/myoffice/member/member-box.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { DashBoardModel } from '@app/models/myoffice/dashboard/dashboard.model';
import { Member } from '@app/models/myoffice/member/member.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { DashBoardState, getActivityStatusDashBoardItems, getActivityStatusDashBoardTotalItems, getInfoDashBoardItems, getListMonthPaymentDateItems, getListPaymentDateItems, getSatusOfRankDashBoardItem, getSatusOfRankDashBoardSumItem } from '@app/selectors/myoffice/dashboard/dashboard.selector';
import { getInfoMemImageItem, MemberBoxState } from '@app/selectors/myoffice/member/member-box.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, Subscription } from 'rxjs';




declare const selectorDraggableWrappers: any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit, OnDestroy {

  userid : String = "";
  userName : String = "";
  regDate : String = "";
  cntName : String = "";
  indexMonthPayDate : number  = 0;
  indexPayDate : number = 0;

  getListMonthPaymentDate$ = new Observable<DashBoardModel[]>;
  getListPaymentDate$ = new Observable<DashBoardModel[]>;
  getInfoDashBoard$ = new Observable<DashBoardModel>;
  getActivityStatusDashBoard$ = new Observable<DashBoardModel[]>;
  getActivityStatusDashBoardTotal$ = new Observable<Number>;
  getSatusOfRankDashBoard$ = new Observable<DashBoardModel[]>;
  getSatusOfRankDashBoardSum$ = new Observable<DashBoardModel>;

  collectionInfoDashBoard: any = {} as DashBoardModel;
  collectionInfoDashBoardSum: any = {} as DashBoardModel;

  collectionMonthPayDate: DashBoardModel[] = [];
  paymentMonthDate : String = "";
  payKind : String = "";

  collectionPayDate: DashBoardModel[] = [];
  paymentDate : String = "";

  collectionActivityStatusDashBoard: DashBoardModel[] = [];
  collectionSatusOfRankDashBoard: DashBoardModel[] = [];
  
  subscriptions: Subscription[] = [];

  // Start Paging
  page: number = 1;

  len: number = 10;

  totalItems: number = 0;

  config: PaginationInstance = {
    id: 'benefit-accounting-inquiry',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }
  options: SelectDropdownModel[] = [];
  selectedValue: SelectDropdownModel = new SelectDropdownModel();
  // End Paging

  rows: number[] = [];
  cols: number[] = new Array(16);
  totalCols: number = 13;
  totalRows: number = 0;

  getInfoMemImage$ = new Observable<Member>;
  smWownet$ = new Observable<SmWownetModel>;
  urlWownet: string = "";

  pathMemImage: String = "";

  calcTime : String = "";

  constructor(
    private dashBoardState: Store<DashBoardState>,
    private _wAlertStore: Store<WAlertState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _memBoxStore: Store<MemberBoxState>,
    private _smWownetStateStore: Store<SmWownetState>
  ) {
    this.getListMonthPaymentDate$ = this.dashBoardState.select(getListMonthPaymentDateItems);
    this.getListPaymentDate$ = this.dashBoardState.select(getListPaymentDateItems);
    this.getInfoDashBoard$ = this.dashBoardState.select(getInfoDashBoardItems);
    this.getActivityStatusDashBoard$ = this.dashBoardState.select(getActivityStatusDashBoardItems);
    this.getActivityStatusDashBoardTotal$ = this.dashBoardState.select(getActivityStatusDashBoardTotalItems);
    this.getSatusOfRankDashBoard$ = this.dashBoardState.select(getSatusOfRankDashBoardItem);
    this.getSatusOfRankDashBoardSum$ = this.dashBoardState.select(getSatusOfRankDashBoardSumItem);
    this.getInfoMemImage$ = this._memBoxStore.select(getInfoMemImageItem);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
   }

  ngOnInit(): void {
    sessionStorage.setItem('DBMemImage', "next");
   

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
      this.cntName = ConvertUtil.convertToSring(member.cntName);
      this.regDate = ConvertUtil.ufDate(environment.default_lang,"L",ConvertUtil.convertToSring(member.regDate),".");
    }


    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
          this.urlWownet = res.urlWownet;
          let DBMemImage  = sessionStorage.getItem("DBMemImage");
          if(DBMemImage == 'next') {
           this.DBMemImage();
           sessionStorage.setItem('DBMemImage', "stop");
          }
      }
    });

    this.options = LenConstant.listLen;

    this.selectedValue = this.options[0];

    let params = this.getParams();
   
    this.dashBoardState.dispatch(getListMonthPaymentDate({ params: params }));

    this.getListMonthPaymentDate$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionMonthPayDate = res;
        this.paymentMonthDate = res[0].payMonth;
        this.getListPaymentDate("");
      }
    })

  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.dashBoardState.dispatch(getListPaymentDateSuccess({ dashBoard: [] }));
  }

  DBMemImage() {
    // Start MEM_IMAGE
    let paramMemImage = {
      comId : environment.comId,
      kindCD : environment.comCd + 'u10',
      userid : this.userid,

    }
    this._memBoxStore.dispatch(getInfoMemImage({ params: paramMemImage }));
    this.getInfoMemImage$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.filePath)) {
          this.pathMemImage = this.urlWownet + '/' +  res.filePath;
      } else {
        this.pathMemImage = "../../../../assets/img/my-office/logo.svg";
      }
      
    })
    // END  MEM_IMAGE
  }

  //Start Paging
  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.len = Number(selected.value);
      this.page = 1;
      this.onSearchgetInfoActivityStatusDashBoard();
    }
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.onSearchgetInfoActivityStatusDashBoard();
  }

  getParams() {
    let params = {
      comId: environment.comId,
      lang : environment.default_lang,
      userId : this.userid,
      payDate : this.paymentDate,
      paymentMonthDate : this.paymentMonthDate,
      payKind : this.payKind,

      page: Number(this.page) - 1,
      len: this.len

    }

    return params;
  }  
  
  getListPaymentDate(flag : String) {

    let params = this.getParams();
    this.dashBoardState.dispatch(getListPaymentDate({ params: params }));

    this.subscriptions.push(
      this.getListPaymentDate$.subscribe(res => {
        if (ValidationUtil.isNotNullAndNotEmpty(res)) {
          this.collectionPayDate = res;
          this.paymentDate = res[0].payDate;
          this.payKind = res[0].payKind;
          if(ValidationUtil.isNotNullAndNotEmpty(flag)) {
            let lengthRes = res.length - 1;
            this.indexPayDate = lengthRes;
            this.paymentDate = res[lengthRes].payDate;
            this.payKind = res[lengthRes].payKind;
          }
          this.getInfoDashBoard();
          this.dashBoardState.dispatch(getListPaymentDateSuccess({ dashBoard: [] }));
        }
      })
    )

  }

 getInfoDashBoard() {

  setTimeout(() => {
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
  }, 1);

  let params = this.getParams();

  this.dashBoardState.dispatch(getInfoDashBoard({ params: params }));
  this.dashBoardState.dispatch(getActivityStatusDashBoard({ params: params }));
  this.dashBoardState.dispatch(getActivityStatusDashBoardCount({ params: params }));
  this.dashBoardState.dispatch(getSatusOfRankDashBoard({ params: params }));
  this.dashBoardState.dispatch(getSatusOfRankDashBoardSum({ params: params }));

  this.getInfoDashBoardItem();
  this.getInfoActivityStatusDashBoard("");
  this.getSatusOfRankDashBoard();
  this.getSatusOfRankDashBoardSum();
 }

 getInfoDashBoardItem() {
  this.subscriptions.push(
    this.getInfoDashBoard$.subscribe(res => {
      this.collectionInfoDashBoard = {};
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionInfoDashBoard = res;
        if(ValidationUtil.isNotNullAndNotEmpty(res.calcTime)) {
          this.calcTime = res.calcTime.split('~')[0];
        }
      }
    })
  );
 }

 getInfoActivityStatusDashBoard(flag : String) {
  this.subscriptions.push(
    this.getActivityStatusDashBoard$.subscribe(res => {
      this.collectionActivityStatusDashBoard = [];
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionActivityStatusDashBoard = res;
        
        if (this.collectionActivityStatusDashBoard.length < 5) {
          this.rows = new Array(5 - this.collectionActivityStatusDashBoard.length);
        }
      } else {
        this.collectionActivityStatusDashBoard = [];
        this.rows = new Array(5);
      }

      this.setBlankRow();

    })
  );

  this.subscriptions.push(
    this.getActivityStatusDashBoardTotal$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;

      if (ValidationUtil.isNotNullAndNotEmpty(flag)) {
        setTimeout(() => {
          this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        }, 250);
      }
    })
  );


 }

 getSatusOfRankDashBoard() {
  this.subscriptions.push(
    this.getSatusOfRankDashBoard$.subscribe(res => {
      this.collectionSatusOfRankDashBoard = [];
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionSatusOfRankDashBoard = res;
      }
    })
  );
 }

 getSatusOfRankDashBoardSum() {
  this.subscriptions.push(
    this.getSatusOfRankDashBoardSum$.subscribe(res => {
      this.collectionInfoDashBoardSum = {};
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionInfoDashBoardSum = res;
      }
      setTimeout(() => {
        selectorDraggableWrappers();
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }, 250);
    })
  );
 }

 onClickPrev() {
  this.subscriptions.forEach((subscription) => subscription.unsubscribe());

  let lengthCollectionMonthPayDate = this.collectionMonthPayDate.length -1 ;
  let lengthCollectionPayDate = this.collectionPayDate.length - 1;

  if(this.indexMonthPayDate == lengthCollectionMonthPayDate && this.indexPayDate == lengthCollectionPayDate) {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgDashBoad2} }));
  }else if(this.indexPayDate == lengthCollectionPayDate) {
    this.indexPayDate = 0;
    this.indexMonthPayDate = this.indexMonthPayDate + 1;
    this.paymentMonthDate = this.collectionMonthPayDate[this.indexMonthPayDate].payMonth;
    this.getListPaymentDate("");
  } else if(this.indexPayDate < lengthCollectionPayDate) {
    this.indexPayDate = this.indexPayDate + 1;
    this.paymentDate = this.collectionPayDate[this.indexPayDate].payDate;
    this.payKind = this.collectionPayDate[this.indexPayDate].payKind;
    this.getInfoDashBoard();
  } 

 }

 onClickNext() {

  this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  
  let lengthCollectionPayDate = this.collectionPayDate.length - 1;

  if(this.indexMonthPayDate == 0 && this.indexPayDate == 0) {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgDashBoad1} }));
  } else if (this.indexPayDate == 0) {
      this.indexPayDate = 0;
      this.indexMonthPayDate = this.indexMonthPayDate - 1;
      this.paymentMonthDate = this.collectionMonthPayDate[this.indexMonthPayDate].payMonth;
      this.getListPaymentDate("next");
  } else if(this.indexPayDate <= lengthCollectionPayDate) {
    this.indexPayDate = this.indexPayDate - 1;
    this.paymentDate = this.collectionPayDate[this.indexPayDate].payDate;
    this.payKind = this.collectionPayDate[this.indexPayDate].payKind;
    this.getInfoDashBoard();
  }
 }

 onSearchgetInfoActivityStatusDashBoard() {

  setTimeout(() => {
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
  }, 1);

  let params = this.getParams();

  this.dashBoardState.dispatch(getActivityStatusDashBoard({ params: params }));
  this.dashBoardState.dispatch(getActivityStatusDashBoardCount({ params: params }));
  this.getInfoActivityStatusDashBoard("1");
 }

 setBlankRow() {
  this.totalRows = this.collectionActivityStatusDashBoard.length;
  if (this.totalRows === 0) {
    this.rows = new Array(5);
  } else if (this.totalRows < 5) {
    this.rows = new Array(5 - this.totalRows);
  }

  this.cols = new Array(this.totalCols);
}

}


