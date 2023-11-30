import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {encryptPass, updatePassMem , encryptPassSuccess} from "@app/actions/myoffice/user-profile/change-password.actions"
import { ChangePassWordState, checkEncryptPass, updatePass} from '@app/selectors/myoffice/user-profile/change-password.selector'
import { ValidationUtil } from '@app/common/util/validation.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ResultProc } from '@app/models/system/result-proc.model';
import { environment } from '@enviroments/environment';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userId:string="";
  birthday:string="";
  loginId:string="";
  updDate:string="";
  encryptPass:String="";


  passOld:string="";
  passNew:string="";
  rePassword:string="";

  error:string="";
  result={} as ResultProc;
  update$= new Observable<ResultProc>;
  encryptPass$= new Observable<string>;

  wAlertStatus$ = new Observable<WAlertStatus>();
  actionConfirmChangePW: string = "actionConfirmChangePW";
  constructor(
    private _changePassStore: Store<ChangePassWordState>,
    private _wAlertStore: Store<WAlertState>,
  ) { 
    this.update$=this._changePassStore.select(updatePass);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.encryptPass$ = this._changePassStore.select(checkEncryptPass);
   
  }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.encryptPass=ConvertUtil.convertToSring(member.passwd);
      this.loginId = ConvertUtil.convertToSring(member.userid);
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.birthday=ConvertUtil.convertToSring(member.birthday);
    }
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }
  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmChangePW && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      let params=this.getParams();
        this._changePassStore.dispatch(updatePassMem({params}));
        this.update$.subscribe(res=>{
          if(ValidationUtil.isNotNullAndNotEmpty(res)){
            this.result=res;
            if(this.result.retCode=="OK"){
              this._wAlertStore.dispatch(setWAlert({ wAlert: {icon: WAlertConstant.successful, message: this.result.retStr } }));
            }else{
              this._wAlertStore.dispatch(setWAlert({ wAlert: {icon: WAlertConstant.warning, message: this.result.retStr } }));
            }
          }
        });
    }
  }

  changePass() {
    if (this.validation() === true) {
      this._changePassStore.dispatch(encryptPassSuccess({encryptpass:''}));

      let params = this.getParams();
      this._changePassStore.dispatch(encryptPass({params}));
      
      this.encryptPass$.subscribe(res =>{
        if(res && res.length>0){
          if(res!=this.encryptPass){
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgCurrentIncorrect } }));
          }else{

            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgSaveInformation, action: this.actionConfirmChangePW } }));
          }

        }
      });

    }
  }
  validation():boolean{
    var check=true;
    this.error="<p style='font-size:18px'>";
    
    if(ValidationUtil.isNullOrEmpty(this.passOld)){
      this.error+="현재 비밀번호를 입력하세요 " +"<br>";
      check=false;
    }
    if(ValidationUtil.isNullOrEmpty(this.passOld)||ValidationUtil.isNullOrEmpty(this.rePassword)){
      this.error+="변경할 패스워드를 입력합니다." +"<br>";
      check=false;
    }
    if(this.passNew.length<8 || this.rePassword.length<8 || this.passNew.length>15 ||this.rePassword.length>15){
      this.error+="최대 8~15자리의 비밀번호를 입력하세요." +"<br>";
      check=false;
    }else if(!(this.passNew==this.rePassword)){
      this.error+="잘못된 비밀번호를 입력했습니다." +"<br>";
      check=false;
    }
    this.error+="</p>";
    if(!check){
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: this.error } }));
    }
   return check;
  }
  getParams():any{
    
    let params={
      comId:environment.comId,
      curpasswd:this.passOld,
      passwd:this.passNew,
      repasswd:this.rePassword,
      userid:this.userId,
      birthday:this.birthday,
      loginId:this.loginId,
      workUser:this.userId

    }

    return params;
  }

}
