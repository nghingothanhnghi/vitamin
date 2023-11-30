import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setWAlert } from '@app/actions/w-alert.action';
import { MemberConstants } from '@app/common/constant/member.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const addReWriteSpan: any;

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./../../../../assets/css/home/aplgo/management.css',
              './management.component.css']
})
export class ManagementComponent implements OnInit {

  smWownet$ = new Observable<SmWownetModel>;
  lMemRegYn : String = "";
  isLogined: boolean = AuthUtil.isLogined();
  wAlertStatus$ = new Observable<WAlertStatus>();
  actionConfirmRegister: string = "action_confirm_register";

  constructor(
    private _smWownetStateStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
    private router: Router,
  ) {
    
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
   }

  ngOnInit(): void {

    setTimeout(() => {
      addReWriteSpan();
    }, 200);

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
          this.lMemRegYn = res.lMemRegYn;
      }
    });

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));

  }

  registerAccount() {
    
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
