import { Component, OnInit } from '@angular/core';
import { loadUserProfile } from '@app/actions/myoffice/user-profile/user-profile.actions';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { Member } from '@app/models/myoffice/member/member.model';
import { getUserProfileItems, UserProfileState } from '@app/selectors/myoffice/user-profile/user-profile.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css',
  './../../../../assets/css/modules.css']
})
export class PersonalInformationComponent implements OnInit {

  personalInfo$ = new Observable<Member>;
  personalInfo: Member = {} as Member;
  address = '';
  userid = '';
  constructor(
    private _personalInfoStore: Store<UserProfileState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.personalInfo$ = this._personalInfoStore.select(getUserProfileItems);
   }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();

    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
    }
    this._personalInfoStore.dispatch(loadUserProfile(this.userid ))

    this.personalInfo$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {

        if (ValidationUtil.isNotNullAndNotEmpty(res.post)) {
          this.address = '(' + res.post + ')';
        }
        if (ValidationUtil.isNotNullAndNotEmpty(res.addr1)) {
          this.address += res.addr1;
        }
        if (ValidationUtil.isNotNullAndNotEmpty(res.addr2)) {
          this.address += res.addr2
        }
        this.personalInfo = res;
      }
    });
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

}
