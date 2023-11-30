import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Login2Service } from '@app/services/system/login2.service';
import { autoLogout, autoLogoutSuccess, coutBonus, coutBonusFailure, coutBonusSuccess, findId, findIdFialure, findIdSuccess, findPassWd, findPassWdFialure, findPassWdSuccess, 
  getLoginInfo, getLoginInfoFailure, getLoginInfoSuccess, loginUserid2Success, loginUserid2, loginUserid2Fialure, findMember, findMemberSuccess, findMemberFialure } from '@app/actions/system/login2.action';
import { AutologoutService } from '@app/services/system/autologout.service';
import { MemberModel } from '@app/models/system/member.model';

@Injectable()
export class LoginEffect2 {
  member = new Observable<MemberModel>;

  constructor(
    private actions$: Actions,
    private login2Service: Login2Service,
    private aotuLogoutService: AutologoutService
  ) { }

  getLoginInfo$ = createEffect(() => this.actions$.pipe(
    ofType(getLoginInfo),
    mergeMap(({ params }) => this.login2Service.getLoginInfo(params).pipe(
      map(res => {
        return getLoginInfoSuccess({ member: res });
      }),
      catchError(msg => of(getLoginInfoFailure({ msg: msg })))
    ))
  ));

  coutBonus$ = createEffect(() => this.actions$.pipe(
    ofType(coutBonus),
    mergeMap(({ params }) => this.login2Service.coutBonus(params).pipe(
      map(res => coutBonusSuccess({ count: res })),
      catchError(msg => of(coutBonusFailure({ msg: msg })))
    ))
  ));

  findId$ = createEffect(() => this.actions$.pipe(
    ofType(findId),
    mergeMap(({ params }) => this.login2Service.findId(params).pipe(
      map(res => {
       
        return findIdSuccess({ member: res });
        
      }),
      catchError(msg => of(findIdFialure({ msg: msg })))
    ))
  ));

  findPassWd$ = createEffect(() => this.actions$.pipe(
    ofType(findPassWd),
    mergeMap(({ params }) => this.login2Service.findPassWd(params).pipe(
      map(res => {
       
        return findPassWdSuccess({ result: res });
        
      }),
      catchError(msg => of(findPassWdFialure({ msg: msg })))
    ))
  ));

  memberUserId2$ = createEffect(() => this.actions$.pipe(
    ofType(loginUserid2),
    mergeMap((action) => this.login2Service.loginUserid2(action.userId2).pipe(
      map(res => {
       
        return loginUserid2Success({ memberUserId2: res });
        
      }),
      catchError(msg => of(loginUserid2Fialure({ msg: msg })))
    ))
  ));

  findMember$ = createEffect(() => this.actions$.pipe(
    ofType(findMember),
    mergeMap(({ params }) => this.login2Service.findMember(params).pipe(
      map(res => {
        return findMemberSuccess({ findMember: res });
      }),
      catchError(msg => of(findMemberFialure({ msg: msg })))
    ))
  ));
};
