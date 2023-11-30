import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { Member } from '@app/models/myoffice/member/member.model';
import { Rank } from '@app/models/system/rank.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { countMemberPopupItems, getMemberPopupItems, MemberPopupState } from '@app/selectors/myoffice/member/member-popup.selector';
import { loadAllRank, RankState } from '@app/selectors/system/rank.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import { countMemberPopup, searchMemberPopup } from '@app/actions/myoffice/member/member-popup.action';
import { loadRank } from '@app/actions/system/rank.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { MessageConstant } from '@app/common/constant/message.constant';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';

@Component({
  selector: 'member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.css']
})
export class MemberPopupComponent implements OnInit, OnChanges {

  @Input()
  show: boolean = false;

  @Input()
  dataSearch: string = "";

  @Output()
  clickClosePopup = new EventEmitter<boolean>();

  @Output()
  clickRowItem = new EventEmitter<Member>();

  
  totalCols: number = 4;
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  ranks$ = new Observable<Rank[]>;
  search$ = new Observable<Member[]>;
  count$ = new Observable<Number>;
  items: Member[] = [];
  total: number = 0;

  userid: string = "";
  username: string = "";
  page: number = 0;
  len: number = 10;

  smWownet$ = new Observable<SmWownetModel>();

  rankOptions: SelectDropdownModel[] = [];
  rankSelected: SelectDropdownModel = new SelectDropdownModel();

  lenOptions: SelectDropdownModel[] = LenConstant.listLen;
  lenSelected: SelectDropdownModel = new SelectDropdownModel();

  config: PaginationInstance = {
    id: 'member-popup-grid',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  logined = AuthUtil.getLoginedInfo();
  isLogined: boolean = AuthUtil.isLogined();

  chkUser: string = "6";

  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _memberPopupStore: Store<MemberPopupState>,
    private _rankStore: Store<RankState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>
  ) { 
    this.ranks$ = this._rankStore.select(loadAllRank);
    this.search$ = this._memberPopupStore.select(getMemberPopupItems);
    this.count$ = this._memberPopupStore.select(countMemberPopupItems);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }

  ngOnInit(): void {
    this.smWownet$.subscribe(res => {
      this.chkUser = "6";
      if (res.musePId === "Y" && (res.guildKind === "MACCO" || res.guildCd === 'KOSSA')) {
        this.chkUser = "3";
      }
    });    

    if (this.logined) {
      this.userid = ConvertUtil.convertToSring(this.logined.userid);
    }

    this.lenSelected = this.lenOptions[0];
    this.len = Number(this.lenSelected.value);
    this._rankStore.dispatch(loadRank());
    this.ranks$.subscribe(res => {
      if (res) {
        this.rankOptions = [{ label: "전체", value: "" }];
        res.forEach(item => this.rankOptions.push({ label: item.rankName, value: item.rankCd }));
        this.rankSelected = this.rankOptions[0];
      }
    });

    this.search$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.items = res;
      } else {
        this.items = [];
      }
      this.rows = new Array(res.length);
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.setBlankRow();
    });

    this.count$.subscribe(res => {
      this.total = Number(res);
      this.config.totalItems = this.total;
      // this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.lenSelected = this.lenOptions[0];
  
      if (ValidationUtil.isNotNullAndNotEmpty(this.rankOptions)) {
        this.rankSelected = this.rankOptions[0];
      }

      if (!this.isLogined) {

        const dataSearchSplit = this.dataSearch.split(" ")[1];
        if (ValidationUtil.isNotNullAndNotEmpty(dataSearchSplit)) {
          this.username = dataSearchSplit;
        } else {
          this.username = this.dataSearch;
        }
        
      } else {
        this.username = "";
      }

      this.page = 1;
      this.len = Number(this.lenSelected.value);
      this.handleOnClickSearch();
    }
  }

  handleOnClickClosePopup(): void {
    this.clickClosePopup.emit(false);
  }

  handleOnClickRow(item: Member): void {
    this.clickRowItem.emit(item);
    this.handleOnClickClosePopup();
  }

  handleOnChangePage(page: number): void {
    if(!this.isLogined && ValidationUtil.isNullOrEmpty(this.username)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgMember} }));
    } else {
      this.page = page;
      this.config.currentPage = this.page;
  
      let params = this.getParams();
  
      if (params.page < 0) return;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this._memberPopupStore.dispatch(searchMemberPopup({ params: params }));
    }
  }

  handleOnChangeLenSelected(selected: SelectDropdownModel): void {
    
    if(!this.isLogined && ValidationUtil.isNullOrEmpty(this.username)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgMember} }));
    } else {
      this.lenSelected = selected;

      this.page = 1;
      this.len = Number(this.lenSelected.value);
  
      this.config.itemsPerPage = this.len;
      this.config.currentPage = this.page;
  
      this.handleOnClickSearch();
    }
    
  }

  handleOnChangeRankSelected(selected: SelectDropdownModel): void {
    this.rankSelected = selected;
  }

  handleOnClickSearch(): void {

    if(!this.isLogined && ValidationUtil.isNullOrEmpty(this.username)) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgMember} }));
    } else {
      this.page = 1;
      let params = this.getParams();
  
      if (params.page < 0) return;
  
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this._memberPopupStore.dispatch(searchMemberPopup({ params: params }));
      this._memberPopupStore.dispatch(countMemberPopup({ params: params }));
    }
  }

  getParams(): any {
    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      id: this.userid,
      chkId: this.chkUser,
      value: this.username,
      chkValue: "0",
      rankCd: this.rankSelected.value,
      page: this.page - 1,
      len: this.len,
    }

    return params;
  }
  setBlankRow() {
    this.totalRows = this.items.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.cols = new Array(this.totalCols);
  }
}
