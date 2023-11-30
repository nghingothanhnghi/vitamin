import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationUtil } from '@app/common/util/validation.util';
import { Store } from '@ngrx/store';
import { Login2State } from '@app/selectors/system/login2.select';
import { setLoginMember2 } from '@app/actions/system/login2.action';

@Component({
  selector: 'app-os.do',
  templateUrl: './os.do.component.html',
  styleUrls: ['./os.do.component.css']
})
export class OsDoComponent implements OnInit {

  userId2: string = ''

  constructor( 
    private route: ActivatedRoute,
    // private router: Router,
    private loginStore: Store<Login2State>
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.userId2 = params['member'];

    //   if(ValidationUtil.isNotNullAndNotEmpty(this.userId2)){
    //     setTimeout(() => this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true })), 50);
    //     this.loginStore.dispatch(loginAction.loginUserid2(this.userId2));

    //     // this.router.navigate(["/login"]);
    //   }
    // });

    this.route.queryParams.subscribe(params => {
      const m = params["m"];
      if (ValidationUtil.isNotNullAndNotEmpty(m)) {
        const logined = JSON.parse(decodeURIComponent(m));
        this.loginStore.dispatch(setLoginMember2({ payload: logined }));
      } else {
        location.href = "/";
      }
    });
  }

}
