import { Component, OnInit } from '@angular/core';
import { CommonUtils } from '@app/common/util/common.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { Member } from '@app/models/myoffice/member/member.model';
import { CodeModel } from '@app/models/system/code.model';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, Subscription } from 'rxjs';
import { AbPosInfo } from '@app/models/myoffice/member/abpos-info.model';
import { Rank } from '@app/models/system/rank.model';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { loadAllRank } from '@app/selectors/system/rank.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import * as memPositionSelecttor from '@app/selectors/myoffice/member/member-position.selector';
import { binaryLegCountA, binaryLegCountB, binaryLegsInfoA, binaryLegsInfoASuccess, binaryLegsInfoB, binaryLegsInfoBSuccess, loadAbPosInfo, loadAbPosInfoSuccess } from '@app/actions/myoffice/member/member-inquiry-position.action';
import { loadSmWownetConfig } from '@app/actions/system/sm-wownet.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { loadRank } from '@app/actions/system/rank.action';
import { loadCodesY } from '@app/actions/system/code.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { environment } from '@enviroments/environment';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MemberConstants } from '@app/common/constant/member.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { RankState } from '@app/selectors/system/rank.selector';
import { LenConstant } from '@app/common/constant/len.constant';

declare const modifyBackToCloseModal: any;

@Component({
  selector: 'app-member-inquiry-by-leg',
  templateUrl: './member-inquiry-by-leg.component.html',
  styleUrls: ['./member-inquiry-by-leg.component.css']
})
export class MemberInquiryByLegComponent implements OnInit {

  pageA: number = 1;
  lenA: number = 10;
  pageB: number = 1;
  lenB: number = 10;
  
  collectionA: Member[] = [];
  collectionB: Member[] = [];
  totalColsA: number = 4;
  totalRowsA: number = 0;

  lenTableA: number = this.lenA;
  lenTableB: number = this.lenB;

  optionsA: SelectDropdownModel[] = [];
  selectedValueA: SelectDropdownModel = new SelectDropdownModel();
  optionsB: SelectDropdownModel[] = [];
  selectedValueB: SelectDropdownModel = new SelectDropdownModel();

  totalColsB: number = 4;
  totalRowsB: number = 0;
  rowsA: number[] = [];
  colsA: number[] = [];
  rowsB: number[] = [];
  colsB: number[] = [];
  userId: string = ''
  userName: string = ''
  codesY$ = new Observable<CodeModel[]>;
  yearOptions: SelectDropdownModel[] = [];
  showMemberPopup: boolean = false;

  binaryLegsA$ = new Observable<Member[]>;
  binaryLegsA = [] as Member[];

  binaryLegCountA$ = new Observable<Number>;
  totalItemsA: number = 0;

  binaryLegsB$ = new Observable<Member[]>;
  binaryLegsB = [] as Member[];

  binaryLegCountB$ = new Observable<Number>;
  totalItemsB: number = 0;
  
  subABPos = {} as Subscription
  
  configA: PaginationInstance = {
    id: 'tableRIdA',
    itemsPerPage: this.lenA,
    currentPage: this.pageA,
    totalItems: this.totalItemsA,
  }
  configB: PaginationInstance = {
    id: 'tableRIdB',
    itemsPerPage: this.lenB,
    currentPage: this.pageB,
    totalItems: this.totalItemsB,
  }

  abPosinfo$ = new Observable<AbPosInfo>;
  abPosinfo = {} as AbPosInfo;
  nameStrA: String = '';
  nameStrB: String = '';
  lv: number = 0;

  rankOptions: SelectDropdownModel[] = [];
  rankSelected: SelectDropdownModel = new SelectDropdownModel();
  ranks$ = new Observable<Rank[]>;

  dateFilterSelected: DateFilterModel = new DateFilterModel();

  smWownetConfig$ = new Observable<SmWownetConfigModel>;
  smWownetConfig: SmWownetConfigModel = {} as SmWownetConfigModel;
  wAlertStatus$ = new Observable<WAlertStatus>();

  
  constructor(
    private _smWownetStore: Store<SmWownetState>,
    private _codeStore: Store<CodeState>,
    private _rankStore: Store<RankState>,
    private _memPositionStore: Store<memPositionSelecttor.MemberPositionState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>
  ) {
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smWownetConfig$ = this._smWownetStore.select(getSmWownetConfig);
    this.codesY$ = this._codeStore.select(getCodesY);
    this.ranks$ = this._rankStore.select(loadAllRank);
    this.abPosinfo$ = this._memPositionStore.select(memPositionSelecttor.abPosinfo);
    this.binaryLegsA$ = this._memPositionStore.select(memPositionSelecttor.binaryLegSearchA);
    this.binaryLegCountA$ = this._memPositionStore.select(memPositionSelecttor.binaryLegCountA);
    this.binaryLegsB$ = this._memPositionStore.select(memPositionSelecttor.binaryLegSearchB);
    this.binaryLegCountB$ = this._memPositionStore.select(memPositionSelecttor.binaryLegCountB);
   }

   ngOnDestroy(): void {
    let hasValue = this.subABPos.closed != undefined
    if (this.subABPos && hasValue) {
      this.subABPos.unsubscribe()
    }
    this._memPositionStore.dispatch(loadAbPosInfoSuccess({ abPosinfo: {} as AbPosInfo }));
  }

  ngOnInit(): void {
    this._smWownetStore.dispatch(loadSmWownetConfig());
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }
    
    this.smWownetConfig$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWownetConfig = res;
        if (res.mBoxMyoffice) {
        }
      }
    });

    this._codeStore.dispatch(loadCodesY());
    this._rankStore.dispatch(loadRank());
    const defaultRankSelected = { label: "전체", value: "" };
    this.ranks$.subscribe(res => {
      this.rankOptions = [];
      this.rankOptions.push(defaultRankSelected);
      res.forEach((item) => this.rankOptions.push({ label: item.rankName, value: ConvertUtil.convertToSring(item.rankCd) }));
      this.rankSelected = this.rankOptions[0];
    });
    
    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    
    this.optionsA = LenConstant.listLen;
    this.selectedValueA = this.optionsA[0];

    this.optionsB = LenConstant.listLen;
    this.selectedValueB = this.optionsB[0];

    this.binaryLegsA$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionA = res;
      } else {
        this.collectionA = [];
      }
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.setBlankRowA()
    });

    this.binaryLegCountA$.subscribe(res => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItemsA = Number(res);
      } else {
        this.totalItemsA = 0;
      }
      this.configA.totalItems = this.totalItemsA;
    });

    this.binaryLegsB$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionB = res;
      } else {
        this.collectionB = [];
      }
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.setBlankRowB()
    });

    this.binaryLegCountB$.subscribe(res =>{
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItemsB = Number(res);
      } else {
        this.totalItemsB = 0;
      }
      this.configB.totalItems = this.totalItemsB;
    });

    this.subABPos = this.abPosinfo$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.userId)) {
        this.abPosinfo = res
        this.nameStrA = (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.ausername) ? res.ausername : '-') +
          '(' + (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.auserid) ? res.auserid : '-') + ')';

        this.nameStrB = (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.busername) ? res.busername : '-') +
          '(' + (ValidationUtil.isNotNullAndNotEmpty(this.abPosinfo.buserid) ? res.buserid : '-') + ')';
          this.onSearch()
          
      }
    });

  }

  handleOnChangePageA(pageA: number): void {
    this.pageA = Number(pageA);
    this.onSearch();
  }

  setBlankRowA() {
    this.totalRowsA = this.collectionA.length;
    if (this.totalRowsA === 0) {
      this.rowsA = new Array(5);
    } else if (this.totalRowsA < 5) {
      this.rowsA = new Array(5 - this.totalRowsA);
    }
    this.colsA = new Array(this.totalColsA);
  }
  handleOnChangePageB(pageB: number): void {
    this.pageB = Number(pageB);
    this.onSearch();
  }
  setBlankRowB() {
    this.totalRowsB = this.collectionB.length;
    if (this.totalRowsB === 0) {
      this.rowsB = new Array(5);
    } else if (this.totalRowsB <  5) {
      this.rowsB = new Array( 5 - this.totalRowsB);
    }
    this.colsB = new Array(this.totalColsB);
  }

  handleOnChangeSelectedValueA(selected: SelectDropdownModel): void {
    this.pageA = 1
    this.lenA= Number(selected.value);
    this.onSearch()
  }

  handleOnChangeSelectedValueB(selected: SelectDropdownModel): void {
    this.pageB = 1
    this.lenB= Number(selected.value);
    this.onSearch()
  }
  
  handleOnClickToggleMemberPopup(show: boolean): void {
    this.showMemberPopup = show;
  }
  handleOnClickRowMemberPopup(member: Member): void {
    this.userId = member.userid
    this.userName = member.username
    this._memPositionStore.dispatch(loadAbPosInfo(this.userId));
  }
  handleOnClickShowMemPopup(): void {
    modifyBackToCloseModal();
    this.showMemberPopup = true
  }
  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.pageA = 1;
    this.pageB = 1;
    this._memPositionStore.dispatch(loadAbPosInfo(this.userId));
    // this.onSearch();
  }

  handleOnChangeDate(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
  }

  onClickSearch(){
    this.pageA = 1;
    this.pageB =1
    this.onSearch();
  }

  onSearch(): void {
    this._memPositionStore.dispatch(binaryLegsInfoASuccess({ binaryLegsA: [] }));
    this._memPositionStore.dispatch(binaryLegsInfoBSuccess({ binaryLegsB: [] }));
    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);
    let paramsA = this.getParams(this.abPosinfo.auserid, 'A')
    this._memPositionStore.dispatch(binaryLegsInfoA({ params: paramsA }));
    this._memPositionStore.dispatch(binaryLegCountA({ params: paramsA }));
    let paramsB = this.getParams(this.abPosinfo.buserid, 'B')
    this._memPositionStore.dispatch(binaryLegsInfoB({ params: paramsB }));
    this._memPositionStore.dispatch(binaryLegCountB({ params: paramsB }));
  }

  getParams(id: string, type:string): any {
    let startDate = this.dateFilterSelected.fromDate.year.value + ""
      + this.dateFilterSelected.fromDate.month.value + ""
      + this.dateFilterSelected.fromDate.date.value;
    let endDate = this.dateFilterSelected.toDate.year.value + ""
      + this.dateFilterSelected.toDate.month.value + ""
      + this.dateFilterSelected.toDate.date.value;
    let params = {
      lang: environment.default_lang,
      comId: environment.comId,
      startDate: startDate
      , endDate: endDate
      , rankCd: this.rankSelected.value
      , id: id
      , value: this.lv
      , page: Number(type == 'A' ? this.pageA:this.pageB) - 1
      , len: type == 'A' ? this.lenA:this.lenB
    }
    return params;
  }

  increaseLv() {
    this.lv++;
  }
  decreaseLv() {
    if(this.lv <= 0){
      this.lv = 0
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgBoxLv}}));
      return
    }
    this.lv --
    this.lv--;
  }
  handleOnClickRow(item:Member)  {
    window.open(MemberConstants.URL_MEMBER_INQUIRY+"?userid=" + item.userid,"_blank")
  }
  hanldeOnChangeRankSelectedValue(selected: SelectDropdownModel): void {
    this.rankSelected = selected;
  }

    
  

}
