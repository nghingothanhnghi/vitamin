import { Component, OnDestroy, OnInit } from '@angular/core';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { getLoginInfoSuccess } from '@app/actions/system/login2.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { Member } from '@app/models/myoffice/member/member.model';
import { MemberModel } from '@app/models/system/member.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getLoginInfo2, Login2State, loginUserid2 } from '@app/selectors/system/login2.select';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'login-result',
  templateUrl: './login-result.component.html',
  styleUrls: ['./login-result.component.css']
})
export class LoginResultComponent implements OnInit, OnDestroy {
  member$ = new Observable<MemberModel>();
  member2$ = new Observable<Member>();

  member2Subscription$: Subscription = {} as Subscription;
  memberSubscription$: Subscription = {} as Subscription;

  wAlertStatus$ = new Observable<WAlertStatus>();

  actionClearInfo: string = "action_clear_user_info";

  constructor(
    private loginStore: Store<Login2State>,
    private wAlertStore: Store<WAlertState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.member$ = this.loginStore.select(getLoginInfo2);
    this.member2$ = this.loginStore.select(loginUserid2);
    this.wAlertStatus$ = this.wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    this.member2Subscription$ = this.member2$.subscribe((res) => {
      if (ValidationUtil.isNotNullAndNotEmpty(res.userid)) {
        this.loginProcess(res)
      }
    });

    this.memberSubscription$ = this.member$.subscribe((res) => {
      if (res.userid == null && res.baseDate != null) {
        this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgLoginedFailed, action: this.actionClearInfo } }));
      } else {
        if (res.userid != null) {
          this.loginProcess(res)
        }
      }
      setTimeout(() => this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false })), 1000);
    })

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }

  ngOnDestroy(): void {
    try {
      this.memberSubscription$.unsubscribe();
    } catch (e) {
    }

    try {
      this.member2Subscription$.unsubscribe();
    } catch (e) {
    }
  }

  loginProcess(res: MemberModel | Member) {
    localStorage.setItem('member', JSON.stringify(res));

    if (res.juminNo != null) {
      location.href = "/";
    } else {
      if (Number(res.count) == 0) {
        location.href = "/";
      } else {
        location.href = "/my-office/login-successful";
      }
    }
  }

  handleActionConfirm(res: WAlertStatus): void {
    if (res.action === this.actionClearInfo) {
      this.loginStore.dispatch(getLoginInfoSuccess({ member: {} as MemberModel }));
    }
  }
}
