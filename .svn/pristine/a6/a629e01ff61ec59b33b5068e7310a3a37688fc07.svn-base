import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Member } from '@app/models/myoffice/member/member.model';
import { MemberBox } from '@app/models/myoffice/member/member-box.model';
import { ConvertUtil } from '@app/common/util/convert.util';
import { environment } from 'src/environments/environment';
import { loadCodesY} from '@app/actions/system/code.action';
import { CodeModel } from '@app/models/system/code.model';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import * as memBoxSelector from '@app/selectors/myoffice/member/member-box.selector';
import { findBox, clearBox, findBoxSuccess } from '@app/actions/myoffice/member/member-box.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { getLoading, OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import {  findTopLineMember, findTopLineMemberSuccess } from '@app/actions/myoffice/member/member-line.action';

import * as memLineSelector from '@app/selectors/myoffice/member/member-line.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getSmWownet, getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { MemberConstants } from '@app/common/constant/member.constant';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { loadSmWownetConfig } from '@app/actions/system/sm-wownet.action';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { Router } from '@angular/router';

declare const isDone_box: any;
declare const modifyBackToCloseModal: any;
declare const total_delay: any;
declare const drawChart: any;
declare const $: any;

@Component({
  selector: 'app-member-box',
  templateUrl: './member-box.component.html',
  styleUrls: ['./member-box.component.css']
})
export class MemberBoxComponent implements OnInit, OnDestroy {

  memberType: string = "P"
  urlWownet: string = "";
  dateKind: string = "2"
  lv: number = 5

  mUsePId: string = 'N';

  logid:string = '' 
  userId:string = '' 
  userName:string = '';
  showMemberPopup: boolean = false;
  membersDraws:MemberBox = {} as MemberBox;
  topLine$ = new Observable<Member>;
  topLine ={} as Member;
  dateFilterSelected: DateFilterModel = new DateFilterModel();
  codesY$ = new Observable<CodeModel[]>;
  yearOptions: SelectDropdownModel[] = [];
  box$ = new Observable<Member[]>;
  boxs:MemberBox[] = [];
  subboxs = {} as Subscription
  subTopLine = {} as Subscription
  isLoading$ = new Observable<Boolean>;
  isFirstLoaded : boolean = false
  smWownet$ = new Observable<SmWownetModel>;
  smWownetConfig$ = new Observable<SmWownetConfigModel>;
  smWownetConfig: SmWownetConfigModel = {} as SmWownetConfigModel;

  chart_mode: string = "";

  chart_wrapper: HTMLElement | null = null;
  chart: HTMLElement | null = null;

  wAlertStatus$ = new Observable<WAlertStatus>();
  constructor(
    private _router : Router,
    private _smWownetStore: Store<SmWownetState>,
    private _codeStore: Store<CodeState>,
    private _memBoxStore: Store<memBoxSelector.MemberBoxState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _memLineStore: Store<memLineSelector.MemberLineState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
    private elementRef: ElementRef
    ) { 
      this.smWownetConfig$ = this._smWownetStore.select(getSmWownetConfig);
      this.codesY$ = this._codeStore.select(getCodesY);
      this.box$ = this._memBoxStore.select(memBoxSelector.findBox);
      this.isLoading$ = this._overlayLoadingStore.select(getLoading);
      this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
      this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus); 
    }
  ngOnDestroy(): void {
    let hasValue = this.subboxs.closed != undefined
    if(this.subboxs && hasValue){
      this.subboxs.unsubscribe()
    }
    let hasValueTop = this.subTopLine.closed != undefined
    if(this.subTopLine && hasValueTop){
      this.subTopLine.unsubscribe()
    }
    this._memBoxStore.dispatch(findBoxSuccess({ members: [] }));
    this._memLineStore.dispatch((findTopLineMemberSuccess({topLineMembers: {} as Member})));
    this.userId = this.logid
  }

  ngOnInit(): void {
    this._memBoxStore.dispatch(findBoxSuccess({ members: [] }));
    this._memLineStore.dispatch((findTopLineMemberSuccess({topLineMembers: {} as Member})));
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.logid = ConvertUtil.convertToSring(member.userid);
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
      this.topLine$ = this._memLineStore.select(memLineSelector.findTopLineMember);
    }
    this._smWownetStore.dispatch(loadSmWownetConfig());
    this._memBoxStore.dispatch(findBoxSuccess({ members: [] }));

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
        this.mUsePId = res.musePId;
        if(res.musePId === 'Y'){
          this.memberType = 'P'
        }else if(res.musePId !== undefined){
          this.memberType = 'R'
        }
      }
    });
    this.smWownetConfig$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWownetConfig = res;
      }
    });
    
   

    this._codeStore.dispatch(loadCodesY());

    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    this.subTopLine = this.topLine$.subscribe(res => {
      this.topLine = res
      if(res && res.userid && res.userid != ""){
        this.userId = res.userid
        this.userName = res.username
        this.onSearch()
      }
    });  
    
    const orgChart = {
      orgChart01: 1,
      orgChart02: 2,
      orgChart03: 7,
      orgChart04: 5,
      orgChart05: 45,
      orgChart06: null,
      orgChart07: 3,
    };
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    localStorage.setItem('orgChart', JSON.stringify(orgChart));

    this.isLoading$.subscribe((res => {
      if (window.location.toString().endsWith('box-lineage') && this.isFirstLoaded == false && res == false) {
        setTimeout(() => {
          this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        }, 50);
      }
    }))
    this.subboxs = this.box$.subscribe(x => {
       
      if(ValidationUtil.isNotNullAndNotEmpty(x)){
        let firstItem = x[0]
        if(ValidationUtil.isNotNullAndNotEmpty(firstItem) && ValidationUtil.isNotNullAndNotEmpty(firstItem.username)){
          this.userName = firstItem.username
        }
        this.boxs = []
        x.forEach(res=>{
          let parentName: string = '';
          if(this.memberType == 'P'){
            parentName = res.rname;
          } else {
            parentName = res.pname;
          }

          this.boxs.push({
            id: res.userid, 
            name:  ValidationUtil.isNotNullAndNotEmpty(res.username) ? res.username : '&nbsp',
            level: Number(res.lv), r_id: res.userid1, path: "0",
            parental: 'azoic',
            status: res.status,
            filePath: res.filePath,
            wowUrl: this.urlWownet,
            regDate:  ValidationUtil.isNotNullAndNotEmpty(res.regDate) ? res.regDate : '&nbsp',
            rankName: res.rankName,
            pv: ConvertUtil.setComma(ValidationUtil.isNotNullAndNotEmpty(res.pv) ? res.pv : '0') + 'SV',
            rankColor: res.rankColor,
            bbname: ValidationUtil.isNotNullAndNotEmpty(res.bbname) ? res.bbname : '&nbsp',
            bbnameKana: ValidationUtil.isNotNullAndNotEmpty(res.bbnameKana) ? res.bbnameKana : '&nbsp',
            bbgivenName: ValidationUtil.isNotNullAndNotEmpty(res.bbgivenName) ? res.bbgivenName : '&nbsp',
            bbmiddleName: ValidationUtil.isNotNullAndNotEmpty(res.bbmiddleName) ? res.bbmiddleName : '&nbsp' ,
            bbfamilyName: ValidationUtil.isNotNullAndNotEmpty(res.bbfamilyName) ? res.bbfamilyName : '&nbsp',
            cntName: res.cntName,
            parentName: parentName,
          }) 
        })
        if(ValidationUtil.isNotNullAndNotEmpty(this.boxs[0])){
          this.membersDraws = this.boxs[0]
          if(ValidationUtil.isNotNullAndNotEmpty(this.userId)){
            this.isFirstLoaded = true
            this.onChart(x);
          }

        }
      }
    });   
    
    var intv = setInterval(() => {
      if(ValidationUtil.isNotNullAndNotEmpty(this.smWownetConfig)&&ValidationUtil.isNotNullAndNotEmpty(this.smWownetConfig.mBoxMyoffice)){
        this.clearChart()
        clearInterval(intv);
        if(this.isFirstLoaded == false){
          this.lv = Number(this.smWownetConfig.mBoxMyoffice)
        }
        this.onSearch()
      }
  }, 50);
  }
  getParams(): any {
    if(this.lv <= 1){
      this.lv = 1
    }
    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      rUserid: this.userId,
      rLv: this.lv,
      dateKind:  this.dateKind,
      // rStartDate: startDate,
      // rEndDate: endDate,
      page: 0,
      len: 10000,
      kind: this.memberType,
    }

    return params;
  }

  handleOpenMemInquiry(userId:string)  {
    window.open(MemberConstants.URL_MEMBER_INQUIRY+"?userid=" + userId,"_blank")
  }
  
  onSearchTopLine(): void{
    if(this.userId == this.logid){
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.topResult}}));
      return;
    }
    this._memLineStore.dispatch((findTopLineMemberSuccess({topLineMembers: {} as Member})));
    this._memLineStore.dispatch((findTopLineMember(this.userId, this.logid, this.memberType)));
   
  }
  onSearch(): void{
   
    this._memBoxStore.dispatch(findBoxSuccess({ members: [] }));
    this._overlayLoadingStore.dispatch( setShowOverlayLoading({loading: true }));
    this._memBoxStore.dispatch(clearBox());
    let params = this.getParams();
    this._memBoxStore.dispatch(findBox({ params: params }));
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

  increaseLv(){
    this.lv ++;
  }
  decreaseLv(){
    if(this.lv <= 1){
      return
    }
    this.lv --;
  }
  boxView:any = null;
  onZoom(){
    if(this.boxView){
      this.boxView.close()
    }

    var width = window.screen.width;
    var height = window.screen.height;

    let eleHeader = document.querySelector('head')?.outerHTML
    let ele = document.getElementById('chart-container')?.outerHTML

    this.boxView = window.open(' ', 'box-view', `width=${width},height=${height},left=10,top=10`);
    this.boxView!.document.write(eleHeader!);
    this.boxView!.document.write(`<body >
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./assets/js/my-office/box-lineage.js"></script>
    
    <div id = 'box-view-window'>
      <div id='box-lineage'>${ele}</div>
      <div class ="loading-box" id="box-loading">
        <div class ="spinner-three-bounce full-screen">
            <div class="bounce1"  style="background-color: rgb(255, 255, 255);"></div>
            <div class="bounce2"  style="background-color: rgb(255, 255, 255);"></div>
            <div class="bounce3"  style="background-color: rgb(255, 255, 255);"></div>
        </div>
      </div>
      
    </div>
    <script type="text/javascript">
      drawViewBoxLine(${this.userId});
    </script>
    <script type="text/javascript">
      draggableBox();
    </script>
    </body>
     `);

  }

  onChangeDateKind(event:any): void {
    this.dateKind = event.target.value; 
  }
  onChangeTypeMember(event:any): void {
    this.memberType = event.target.value;
    this.onSearch()
  }
  
  onChart(data: any){
    this.clearChart()
    setTimeout(() => {
      drawChart(this.userId, this.boxs, this.membersDraws, this.lv)
    }, 100);
    var intv2 = setInterval(() => {
      if(isDone_box ==true){
        clearInterval(intv2);
        setTimeout(() => {
          this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        }, 100);

          let eles = this.elementRef.nativeElement.querySelectorAll(".name-box-find") ;
          eles.forEach((el: HTMLElement)=>{
            if(el.id !== this.userId){
              el.addEventListener('click', ()=>{
                this.setUserId(el.id)
              });
            }
          })
      }
   }, 200);
  }
  setUserId(id:string|null){
    if(id){
      this.userId=id
      this.onSearch()
    }
  }

  clearChart(){
    let ele = document.getElementById('chart-wrapper-box') as HTMLElement
    ele.innerHTML = ""
  }
}
