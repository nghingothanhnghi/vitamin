import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { getLoginInfoSuccess } from "@app/actions/system/login2.action";
import { AuthUtil } from "@app/common/util/auth.util";
import { MemberModel } from "@app/models/system/member.model";
import { Login2State, memberLogin } from "@app/selectors/system/login2.select";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root'
  })
export class AutologoutService { 
    constructor(
        private router: Router,
        private ngZone: NgZone,
        private loginStore: Store<Login2State>,
    ) {
      this.check()
      this.lastAction(Date.now());
      this.check();
      this.initListener();
      this.initInterval();
    }

   /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000*60);
    })
  }


   /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      //document.body.addEventListener('mouseover',()=> this.reset());
      //document.body.addEventListener('mouseout',() => this.reset());
      document.body.addEventListener('keydown',() => this.reset());
      document.body.addEventListener('keyup',() => this.reset());
      document.body.addEventListener('keypress',() => this.reset());
    });
  }

  /**
   * reset timer
   */
   reset() {
    this.lastAction(Date.now());
  }

   /**
   * last action
   */
   getLastAction() {
    return localStorage.getItem('lastAction');
   }

  check() {
    this.ngZone.run(() => {
      if (AuthUtil.isSessionExpired() && AuthUtil.isLogined()) {
        AuthUtil.actionLogOut()
        this.loginStore.dispatch(getLoginInfoSuccess({ member: {} as MemberModel }));
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
    });
  }

   /**
   * set last action
   * @param value
   */
  lastAction(value: any) {
    localStorage.setItem('lastAction', JSON.stringify(value))
  }

}