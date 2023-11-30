import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { RankState } from '@app/selectors/system/rank.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Rank } from '@app/models/system/rank.model';
import { Member } from '@app/models//myoffice/member/member.model';
import { loadAllRank } from '@selectors/system/rank.selector';
import { loadRank } from '@app/actions/system/rank.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { environment } from 'src/environments/environment';
import { ValidationUtil } from '@app/common/util/validation.util';
import { MemberSearchState } from '@app/selectors/myoffice/member/member-search.selector';
import {countMember, searchMember} from "@app/actions/myoffice/member/member-search.action"
import { loadCodesY} from '@app/actions/system/code.action';
import { CodeModel } from '@app/models/system/code.model';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { AuthUtil } from '@app/common/util/auth.util';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { CheckUseridConstant } from '@app/common/constant/check-userid.constant';
import { loadSmWownetConfig } from '@app/actions/system/sm-wownet.action';
import { getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';

declare const modifyBackToCloseModal: any;

@Component({
  selector: 'app-member-search-filter',
  templateUrl: './member-search-filter.component.html',
  styleUrls: ['./member-search-filter.component.css']
})
export class MemberSearchFilterComponent implements OnInit, OnChanges {

  @Input()
  page: number | String = 0;

  @Input()
  len: number | String = 10;

  @Output()
  changePage = new EventEmitter<number>();
  
  userId:string = ''
  loginId:string = '' 
  userName:string = '';
  valueUserName:string = '';
  showMemberPopup: boolean = false;
  ranks$ = new Observable<Rank[]>;

  dateFilterSelected: DateFilterModel = new DateFilterModel();
  codesY$ = new Observable<CodeModel[]>;
  yearOptions: SelectDropdownModel[] = [];

  rankOptions: SelectDropdownModel[] = [];
  userKindOptions: SelectDropdownModel[] = CheckUseridConstant.listCheckUseridMember;

  rankSelected: SelectDropdownModel = new SelectDropdownModel();
  userKindSelected: SelectDropdownModel = new SelectDropdownModel();
  smWownetConfig$ = new Observable<SmWownetConfigModel>;
  smWownetConfig: SmWownetConfigModel = {} as SmWownetConfigModel;
  constructor(
    private _smWownetStore: Store<SmWownetState>,
    private _codeStore: Store<CodeState>,
    private _rankStore: Store<RankState>,
    private _memberSearchStore: Store<MemberSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
    ) { 
      this.codesY$ = this._codeStore.select(getCodesY);
      this.ranks$ = this._rankStore.select(loadAllRank);
      this.smWownetConfig$ = this._smWownetStore.select(getSmWownetConfig);
    }
    
  ngOnInit(): void {
    this._smWownetStore.dispatch(loadSmWownetConfig());
    this.smWownetConfig$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWownetConfig = res;
        // if(res.reqParent === 'Y'){
        //   this.userKindOptions = CheckUseridConstant.listCheckUseridMember;
        // }
      }
    });
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }
   
    this._rankStore.dispatch(loadRank());
    this._codeStore.dispatch(loadCodesY());
    this.userKindSelected = this.userKindOptions[0]
    
    const defaultRankSelected = { label: "전체", value: "" };
    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    this.ranks$.subscribe(res => {
      this.rankOptions = [];
      this.rankOptions.push(defaultRankSelected);
      res.forEach((item) => this.rankOptions.push({ label: item.rankName, value: ConvertUtil.convertToSring(item.rankCd) }));
      this.rankSelected = this.rankOptions[0];
    });

    setTimeout(() => {
      this.userKindOptions = CheckUseridConstant.getlistCheckUseridMember();
      this.userKindSelected = this.userKindOptions[0];
    }, 500);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    let pageChangeEvent = changes["page"];
    let lenChangeEvent = changes["len"];
    if (ValidationUtil.isNotNullAndNotEmpty(lenChangeEvent)) {
      if (this.isValidDateFilter(this.dateFilterSelected)) {
        this.onSearch();
      }
    } else if (ValidationUtil.isNotNullAndNotEmpty(pageChangeEvent)) {
      // this.handleChangePage();
      this.onSearch();
    }
  }

  onClickSearch(){
    this.page = 1;
    this.changePage.emit(1);
    this.onSearch();
  }
  handleChangePage(): void {
    let params = this.getParams();

    this._memberSearchStore.dispatch(searchMember({ params: params }));
  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.page = 1;
    this.changePage.emit(1);
    this.onSearch()
  }

  
  hanldeOnChangeRankSelectedValue(selected: SelectDropdownModel): void {
    this.rankSelected = selected;
  }
  hanldeOnChangeUserKindSelectedValue(selected: SelectDropdownModel): void {
    this.userKindSelected = selected;
  }

  getParams(): any {
    let startDate = this.dateFilterSelected.fromDate.year.value + "-" 
                  + this.dateFilterSelected.fromDate.month.value + "-" 
                  + this.dateFilterSelected.fromDate.date.value;
    let endDate = this.dateFilterSelected.toDate.year.value + "-" 
                + this.dateFilterSelected.toDate.month.value + "-" 
                + this.dateFilterSelected.toDate.date.value;

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      startDate: startDate
      , endDate: endDate
      , chkId :  this.userKindSelected.value
      , id: this.userId
      , status : null
       , userKind: null
       , rankCd: this.rankSelected.value
       , rankMaxCd: null
       , cntCd: null
       , grpCd: null
       , ctrCd: null
       , chkCnt: null
       , chkGrp: null
       , chkValue: 0
       , value: this.valueUserName
       , workUser: this.loginId
       , page: Number(this.page) -1
       , len: this.len

    }

    return params;
  }
  onChangeUserName(event: any) {
    this.valueUserName = event.target.value;
  }

  onSearch(): void{
    let params = this.getParams();
    setTimeout(() => {
      this._overlayLoadingStore.dispatch( setShowOverlayLoading({loading: true }));
    }, 1);
    
    this._memberSearchStore.dispatch(searchMember({ params: params }));
    this._memberSearchStore.dispatch(countMember({ params: params }));
    
  }

  isValidDateFilter(filter: DateFilterModel): boolean {
    if (ValidationUtil.isNullOrEmpty(filter)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.fromDate) || ValidationUtil.isNullOrEmpty(filter.toDate)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.fromDate.date.value) ||
      ValidationUtil.isNullOrEmpty(filter.fromDate.month.value) || 
      ValidationUtil.isNullOrEmpty(filter.fromDate.year.value)) return false;
    if (ValidationUtil.isNullOrEmpty(filter.toDate.date.value) ||
      ValidationUtil.isNullOrEmpty(filter.toDate.month.value) || 
      ValidationUtil.isNullOrEmpty(filter.toDate.year.value)) return false;

    return true;
  }

  handleOnClickToggleMemberPopup(show: boolean): void {
    this.showMemberPopup = show;
  }
  handleOnClickRowMemberPopup(member: Member): void {
    this.userId = member.userid
    this.userName=member.username
    this.onSearch()
  }
  handleOnClickShowMemPopup(): void {
    modifyBackToCloseModal();
    this.showMemberPopup = true
  }
  
}
