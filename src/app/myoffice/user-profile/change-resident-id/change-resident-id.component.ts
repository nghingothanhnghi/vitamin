import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from "@app/models/myoffice/member/member.model";
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { addToCart, setIsBuyNow, setShowAlert } from '@app/actions/shoppingmall/cart.action';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { ChangeResdentIdState, updateJumin,getJumin, verifyJumin } from '@app/selectors/myoffice/user-profile/change-resident-id.selector';
import {  updateJuminMem,getJuminMem, verifyJuminMem, clearJumnin } from '@app/actions/myoffice/user-profile/change-resident-id.actions';


import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import { ResultJumin } from '@app/models/myoffice/user-profile/result-jumin.model';
import Swal from 'sweetalert2';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { MessageConstant } from '@app/common/constant/message.constant';
import { getUserProfileItems, UserProfileState } from '@app/selectors/myoffice/user-profile/user-profile.selector';

@Component({
  selector: 'app-change-resident-id',
  templateUrl: './change-resident-id.component.html',
  styleUrls: ['./change-resident-id.component.css',
              '../../../../assets/css/popup.css']
})
export class ChangeResidentIdComponent implements OnInit {

  @Output()
  clickCloseJumnio = new EventEmitter<boolean>();
 
  @Input()
  showPopup: boolean = false;

  @Input()
  clickEvent:boolean=false;

  jumin$= new Observable<Member>;
  juminMem= {} as Member;

  resultUpdate$= new Observable<ResultProcessModel>;
  resultUpdateMem= {} as ResultProcessModel;

  resultVerifyJumin$= new Observable<ResultJumin>;
  resultVerify= {} as ResultJumin;

  userInfo$ = new Observable<Member>;

  userId:string="";
  userName:string="";
  checkJumin:boolean = false;

  jumin1:string="";
  jumin2:string="";
  checked:boolean=true;

  jumin1Dis:string="";
  jumin2Dis:string="";

  actionSaveJuminNo: string = "actionSaveJuminNo";

  wAlertStatus$ = new Observable<WAlertStatus>();
  constructor(
    private _changeRedentIdStore: Store<ChangeResdentIdState>,
    private _userProfileStore : Store<UserProfileState>,
    private _wAlertStore: Store<WAlertState>
  ) {
    this.resultUpdate$ = this._changeRedentIdStore.select(updateJumin);
    this.jumin$ = this._changeRedentIdStore.select(getJumin);
    this.resultVerifyJumin$ = this._changeRedentIdStore.select(verifyJumin);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.userInfo$ = this._userProfileStore.select(getUserProfileItems);
  }

  ngOnInit(): void {
  
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      // this.userName = ConvertUtil.convertToSring(member.username);
      this.userInfo$.subscribe(res => {
        // this.userId = ConvertUtil.convertToSring(res.userid);
        this.userName = ConvertUtil.convertToSring(res.username);
      })
    }
      
    this._changeRedentIdStore.dispatch(getJuminMem(this.userId));
    this.jumin$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.juminMem=res;
        var juminNo=this.juminMem.juminNo;
        if(juminNo!=null){
          var arr=juminNo.split("-");
          this.jumin1=arr[0];
          this.jumin2=arr[1];
          this.clickEvent=true;
        }
      }else{
        this.juminMem={} as Member;
      }
    });
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
   
  }
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionSaveJuminNo && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      let params=this.getParamsUpdate();
      this._changeRedentIdStore.dispatch(updateJuminMem({params}));
      this.resultUpdate$.subscribe(res=>{
        if(ValidationUtil.isNotNullAndNotEmpty(res)){
          this.resultUpdateMem=res;
        }else{
          this.resultUpdateMem={} as ResultProcessModel;
        }
      })
      setTimeout(() => {
        this._wAlertStore.dispatch(setWAlert({ wAlert: {icon: WAlertConstant.successful, message: this.resultUpdateMem.retStr } }));
      }, 100);

    }
  }
  saveJuminNo(){
    if(this.checked===false){
      this._wAlertStore.dispatch(setWAlert({ wAlert: {icon: WAlertConstant.warning, message: MessageConstant.msgReqAgreeCondition} }));
      return;
    }
  
    if(ValidationUtil.isNullOrEmpty(this.jumin1) || ValidationUtil.isNullOrEmpty(this.jumin2)){
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message:  MessageConstant.msgInvalidJumin } }));
      return;
    }else{
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgConfirmSaveJumin, action: this.actionSaveJuminNo } }));
    }
    
  }
  handleOnClickClosePopup(): void {
   this.showPopup = false;
  }
  handleOnClickOpenPopup(): void {
      this.showPopup = true;
  }

  
  handleVerifyJumin(){
    this._changeRedentIdStore.dispatch(clearJumnin());
    if(ValidationUtil.isNullOrEmpty(this.jumin1Dis)===true || ValidationUtil.isNullOrEmpty(this.jumin2Dis)==true){
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgInvalidJumin } }));
      return;
    }
    let params=this.getParams();
    this._changeRedentIdStore.dispatch(verifyJuminMem({params}));
    this.resultVerifyJumin$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)&&ValidationUtil.isNotNullAndNotEmpty(res.msg)){
        this.resultVerify = res
        if(Number(this.resultVerify.resultCode)==1){
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: "실명인증 성공." } }));
          this.jumin1=this.jumin1Dis;
          this.jumin2=this.jumin2Dis;
          this.showPopup=false;
        }else{
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: this.resultVerify.resultMsg } }));
        }
      }
    })
  }
  onKeydownJumin1(): void {
    this.focusNextElement(this.jumin1Dis, 6, 'jumin1Dis')
  }
  onKeydownJumin2(): void {
    this.focusNextElement(this.jumin2Dis, 7, 'jumin2Dis')
  }

  focusNextElement(crrEle:string,maxLength:number, nextEleName:string){
    if(crrEle.length == maxLength){
      const input = document.getElementById(nextEleName);
      if(input){
        input.focus()
      }
    }
  }
  getParams():any{
    let params={
      certifyMethod:"10",
      comId:environment.comId,
      jumin1:this.jumin1Dis,
      jumin2:this.jumin2Dis,
      userName:this.userName
    }
   return params;

  }
  getParamsUpdate():any{
     let params={
      comId:environment.comId,
      userid:this.userId,
      juminNo:this.jumin1+"-"+this.jumin2
     }
     return params;
  }
 
}
