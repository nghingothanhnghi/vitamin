import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberConstants } from '@app/common/constant/member.constant';
import { IzexRes } from '@app/models/system/izex.model';
import { addOrUpdatePartner, IzexState } from '@app/selectors/system/izex.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as izexAction from '@app/actions/system/izex.action'
import { DateUtils } from '@app/common/util/date.util';
import { environment } from '@enviroments/environment';
import { ValidationUtil } from '@app/common/util/validation.util';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { setWAlert } from '@app/actions/w-alert.action';


@Component({
  selector: 'app-member-registration-step4',
  templateUrl: './member-registration-step4.component.html',
  styleUrls: ['./member-registration-step4.component.css']
})
export class MemberRegistrationStep4Component implements OnInit {
  izexRes$ = new Observable<IzexRes>();
  wAlertStatus$ = new Observable<WAlertStatus>();
  constructor(private _router: Router,
    private _izexStore: Store<IzexState>,
    private _wAlertStore: Store<WAlertState>,
    ) { 
      this.izexRes$ = this._izexStore.select(addOrUpdatePartner);
      this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    }

  userid: string | null = ''
  username: string | null = ''
  doneRegis: boolean = false

  ngOnInit(): void {
    let data = window.sessionStorage.getItem(MemberConstants.STR_IS_DONE_STEP_3);
    if (!(data == "true") && this.doneRegis == false) {
      this._router.navigate([MemberConstants.URL_STEP3]);
    }

    this.userid = localStorage.getItem("userid")
    this.username = localStorage.getItem("username")
    /* this.updatePartnerIzex(this.userid)  */ //TODO : call API beta-izex
    // var acc = localStorage.getItem("account")
    // var account = null
    // if (acc) {
    //   var account = JSON.parse(acc)
    // }

    setTimeout(function () {
      sessionStorage.removeItem(MemberConstants.STR_IS_DONE_STEP_1);
      sessionStorage.removeItem(MemberConstants.STR_IS_DONE_STEP_2);
      sessionStorage.removeItem(MemberConstants.STR_IS_DONE_STEP_3);
      sessionStorage.removeItem(MemberConstants.STR_IS_DONE_STEP_CHOOSE_REGISTER);
      sessionStorage.removeItem(MemberConstants.STR_RID);
      sessionStorage.removeItem(MemberConstants.STR_IS_CHECK_REGISTER);
      sessionStorage.removeItem(MemberConstants.STR_USERID_PARAM);
    }, 3000);

    
  }
  redirectPage() {
    this.doneRegis = true
    localStorage.removeItem("account")
    localStorage.removeItem("userid")
    localStorage.removeItem("username")
    localStorage.removeItem("ctrCd")
    localStorage.removeItem("ctrName")
    localStorage.removeItem('paramsRegist');
    this._router.navigate(['/login']);
  }
  updatePartnerIzex(usrId: string | null) {
    var paramsRegist = localStorage.getItem("paramsRegist")
    let parameters = null;
    if (paramsRegist) {
      var params = JSON.parse(paramsRegist)
      parameters = this.getParamIzex(usrId, params)
    }
    this._izexStore.dispatch(izexAction.addOrUpdatePartner({ params: parameters }))

    this.izexRes$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        if (res.status === 'Ok') {
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: res.description}}));
        } else if(res.status === 'Error'){
          this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: res.description}}));
        }
      }
    }) 
  }
 
  getParamIzex(usrId: string | null, params: any) {
    let activationDate = DateUtils.getCurrFullDateTimeStr();
    let paramsIzex = {
      action: 'partner',
      userId: usrId,
      firstName: params.givenName,
      lastName: params.familyName,
      midleName: params.middleName,
      email: params.email,
      status: 200,
      deleted: 0,
      activationDate: activationDate,
      sponsorId: params.rId,
      phone: params.tel,
      url: environment.urlBetaIzex,
      key: environment.keyBetaIzex,
      comId: environment.comId
    }
    return paramsIzex;
  }
}
