import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUserProfile} from "@actions/myoffice/user-profile/user-profile.actions"
import { UserProfileState, getUserProfileItems } from '@app/selectors/myoffice/user-profile/user-profile.selector'
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { Member } from '@app/models/myoffice/member/member.model';
import { ClipboardService  } from 'ngx-clipboard';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { MessageConstant } from '@app/common/constant/message.constant';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getInfoMemImageItem, MemberBoxState } from '@app/selectors/myoffice/member/member-box.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { environment } from '@enviroments/environment';
import { getInfoMemImage } from '@app/actions/myoffice/member/member-box.action';





@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  userInfo$ = new Observable<Member>;
  userInfo= {} as Member;
  
  userId: string = "";
  userName:string="";
  rName:String ='';

  getInfoMemImage$ = new Observable<Member>;
  smWownet$ = new Observable<SmWownetModel>;
  urlWownet: string = "";
  urlShopping: string = "";

  pathMemImage: String = "";

  constructor(
    private clipboard: ClipboardService,
    private _userProfileStore : Store<UserProfileState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private _memBoxStore: Store<MemberBoxState>,
    private _smWownetStateStore: Store<SmWownetState>
  )
   { 
    this.userInfo$ = this._userProfileStore.select(getUserProfileItems);
    this.getInfoMemImage$ = this._memBoxStore.select(getInfoMemImageItem);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }
  ngOnInit(): void {
    sessionStorage.setItem('userMemImage', "next");

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }
    
    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
          this.urlWownet = res.urlWownet;
          this.urlShopping = res.urlShopping;
          let userMemImage  = sessionStorage.getItem("userMemImage");
          if(userMemImage == 'next') {
           this.memImage();
           sessionStorage.setItem('userMemImage', "stop");
          }
      }
    });

    this._userProfileStore.dispatch(loadUserProfile(this.userId));

    this.userInfo$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.userInfo=res;
      }else{
        this.userInfo={} as Member;
      }
      if (ValidationUtil.isNotNullAndNotEmpty(this.userInfo.rname)) {
        this.rName = this.userInfo.rname;
      }
      if (ValidationUtil.isNotNullAndNotEmpty(this.userInfo.rid)) {
        this.rName += ' (' + this.userInfo.rid + ')';
      }
      
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    })
  }

  memImage() {
    // Start MEM_IMAGE
    let paramMemImage = {
      comId : environment.comId,
      kindCD : environment.comCd + 'u10',
      userid : this.userId,

    }
    this._memBoxStore.dispatch(getInfoMemImage({ params: paramMemImage }));
    this.getInfoMemImage$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.filePath)) {
          this.pathMemImage = this.urlWownet + '/' +  res.filePath;
      } else {
        this.pathMemImage = "./assets/img/user-profile/general-member.svg";
      }
      
    })
    // END  MEM_IMAGE
  }

  handleOnClickCopy():void{
    this.clipboard.copyFromContent(this.urlShopping+"/my-office/member-management/choose-member-register?userid="+this.userId);
    this._wAlertStore.dispatch(setWAlert({ wAlert: {icon: WAlertConstant.successful, message: MessageConstant.msgCopyMemberRegisURL} }));
  }
}
