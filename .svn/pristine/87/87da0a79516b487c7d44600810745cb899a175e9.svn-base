import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { getLoginInfo } from '@app/actions/system/login2.action';
import { setWAlert } from '@app/actions/w-alert.action';
import { MemberConstants } from '@app/common/constant/member.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Login2State } from '@app/selectors/system/login2.select';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthUtil } from '@app/common/util/auth.util';
import { MessageConstant } from '@app/common/constant/message.constant';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  logId: String = "";
  userId2: string = "";
  passwd: String = "";

  countBonus = new Observable<Number>();

  smWownet$ = new Observable<SmWownetModel>();
  lMemRegYn: String = "";
  isLogined: boolean = AuthUtil.isLogined();
  urlMember: String = MemberConstants.URL_CHOOSE_REGISTER;

  wAlertStatus$ = new Observable<WAlertStatus>();

  constructor(
    private loginStore: Store<Login2State>,
    private overlayLoadingStore: Store<OverlayLoadingState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private wAlertStore: Store<WAlertState>,
    private router: Router
  ) {
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
    this.wAlertStatus$ = this.wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.lMemRegYn = res.lMemRegYn;
      }
    });
  }

  loginClick(): void {
    var msg = this.validation();
    if (msg != '') {
      this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: msg } }));
    } else {
      let id = this.logId;
      let passwd = this.passwd;

      let params = {
        comid: environment.comId,
        userid: id,
        password: passwd
      };
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this.loginStore.dispatch(getLoginInfo({ params: params }));
    }
  }

  validation() {
    var error = '';
    if (this.logId.trim() == '') {
      error += '아이디 입력해주세요';
      error += '<br>';
    }
    if (this.passwd.trim() == '') {
      error += '비밀번호 입력해주세요';
    }

    return error;
  }

  goToRegister(): void {
    if (this.lMemRegYn !== "Y" && !this.isLogined) {
      this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgRequiredLogin } }));
    } else {
      this.router.navigate([this.urlMember]);
    }
  }
}
