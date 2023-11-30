import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberRegistService } from "@services/myoffice/member/member-regist.service";
import * as memberRegistAction from "@app/actions/myoffice/member/member-regist.action"

@Injectable()
export class MemberRegistEffect {

  constructor(
    private actions$: Actions,
    private memberRegistService: MemberRegistService
  ) { }


  checkMobile$ = createEffect(() => this.actions$.pipe(
    ofType(memberRegistAction.checkMobile),
    mergeMap((action) => this.memberRegistService.checkMobile(action.mobile)
      .pipe(
        map(
          res => (memberRegistAction.checkMobileSuccess({ isMobile: res })
          )),
        catchError(
          msg => of(memberRegistAction.checkMobileFailure({ msg: msg })
          ))
      ))
  )
  );
  checkEmail$ = createEffect(() => this.actions$.pipe(
    ofType(memberRegistAction.checkEmail),
    mergeMap((action) => this.memberRegistService.checkEmail(action.email)
      .pipe(
        map(
          res => (memberRegistAction.checkEmailSuccess({ isEmail: res })
          )),
        catchError(
          msg => of(memberRegistAction.checkEmailFailure({ msg: msg })
          ))
      ))
  )
  );
  save$ = createEffect(() => this.actions$.pipe(
    ofType(memberRegistAction.save),
    mergeMap(({params}) => this.memberRegistService.save(params)
      .pipe(
        map(
          res => (memberRegistAction.saveSuccess({ result: res })
          )),
        catchError(
          msg => of(memberRegistAction.saveFailure({ msg: msg })
          ))
      ))
  )
  );

}
