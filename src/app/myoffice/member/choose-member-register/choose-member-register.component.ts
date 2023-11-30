import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberConstants } from '@app/common/constant/member.constant';
import { ActivatedRoute } from '@angular/router';
import { ValidationUtil } from '@app/common/util/validation.util';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { Store } from '@ngrx/store';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { Observable } from 'rxjs';
import { AuthUtil } from '@app/common/util/auth.util';
import { Company } from '@app/models/system/company.model';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector';
import { loadCompany } from '@app/actions/system/company.actions';

@Component({
  selector: 'app-choose-member-register',
  templateUrl: './choose-member-register.component.html',
  styleUrls: ['./choose-member-register.component.css']
})
export class ChooseMemberRegisterComponent implements OnInit {

  kind_member : string = ''
  kind_consumer : string = ''
  oConsumerMemYn : string = '';
  smWownet$ = new Observable<SmWownetModel>();
  company$ = new Observable<Company>();

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _smWownetStateStore: Store<SmWownetState>,
    private _companyStore: Store<CompanyState>,
  ) {
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
    this.company$ = this._companyStore.select(getCompany);
  }

  ngOnInit(): void {
    this.kind_member = MemberConstants.USER_KIND_MEMBER
    this.kind_consumer = MemberConstants.USER_KIND_CONSUMER
    this._companyStore.dispatch(loadCompany());

    this.route.queryParams.subscribe(params => {
      let userIdParam = params['userid'];
      if (ValidationUtil.isNotNullAndNotEmpty(userIdParam)) {
        window.sessionStorage.setItem(MemberConstants.STR_USERID_PARAM, userIdParam);
      }
    });

    this.smWownet$.subscribe(res => {      
      if (ValidationUtil.isNotNullAndNotEmpty(res)){
        if(res.lMemRegYn) {
          if(!AuthUtil.isLogined() && res.lMemRegYn !== "Y"){
            this._router.navigate(["/login"]);
          }
        }
        this.oConsumerMemYn = res.oConsumerMemYn;
      }
    });
  }

  goToRegister(type:string){
    window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_CHOOSE_REGISTER, 'true');
    window.sessionStorage.setItem(MemberConstants.STR_IS_CHECK_REGISTER, type);
    this._router.navigate([MemberConstants.URL_STEP1]);
  }
}
