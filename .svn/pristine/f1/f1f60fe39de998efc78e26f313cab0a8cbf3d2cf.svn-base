import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MemberPointService } from '@app/services/shoppingmall/member-point.service';
import { loadMemberPoint, loadMemberPointFailure, loadMemberPointSuccess } from '@app/actions/shoppingmall/member-point.action';

@Injectable()
export class MemberPointEffect {

  constructor(
    private _actions$: Actions,
    private memberPointService: MemberPointService
  ) { }

  loadMemberPoint$ = createEffect(() => this._actions$.pipe(
    ofType(loadMemberPoint),
    mergeMap(({ userid }) => this.memberPointService.loadMemberPoint(userid).pipe(
      map(res => loadMemberPointSuccess({ orderMst: res })),
      catchError(res => of(loadMemberPointFailure({ msg: res })))
    ))
  ));
}