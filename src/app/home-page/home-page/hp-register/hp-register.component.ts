import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setWAlert } from '@app/actions/w-alert.action';
import { MemberConstants } from '@app/common/constant/member.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'hp-register',
  templateUrl: './hp-register.component.html',
  styleUrls: ['./hp-register.component.css']
})
export class HpRegisterComponent implements OnInit {
  @Input() lMemRegYn: String = '' ;  

  isLogined: boolean = AuthUtil.isLogined();
  
  wAlertStatus$ = new Observable<WAlertStatus>();
  actionConfirmRegister: string = "action_confirm_register";

  constructor(private router: Router,  private _wAlertStore: Store<WAlertState>,) { 
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }
  
  goToRegister() : void {
    if (this.lMemRegYn !== "Y" && !this.isLogined) {
      this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgRequiredLogin, action: this.actionConfirmRegister } }));
    } else {
      window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_CHOOSE_REGISTER, 'true');
      window.sessionStorage.setItem(MemberConstants.STR_IS_CHECK_REGISTER, MemberConstants.USER_KIND_MEMBER);
      this.router.navigate([MemberConstants.URL_STEP1]);
    }
  }

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmRegister && status.isConfirm) {
      this.router.navigate(["/login"]);
    }
  }

}
