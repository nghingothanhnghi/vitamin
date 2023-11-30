import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  countMemberPopup,
  countMemberPopupFailure,
  countMemberPopupSuccess,
  searchMemberPopup,
  searchMemberPopupFailure,
  searchMemberPopupSuccess
} from '@app/actions/myoffice/member/member-popup.action';
import { MemberSearchService } from '@app/services/myoffice/member/member-search.service';

@Injectable()
export class MemberPopupEffect {
  
  constructor(
    private _actions$: Actions,
    private memberSearchService: MemberSearchService
  ) { }

  searchMemberPopup$ = createEffect(() => this._actions$.pipe(
    ofType(searchMemberPopup),
    mergeMap(({ params }) => this.memberSearchService.searchMember(params).pipe(
      map(res => searchMemberPopupSuccess({ memberItems: res })),
      catchError(res => of(searchMemberPopupFailure({ msg: res })))
    ))
  ));

  countMemberPopup$ = createEffect(() => this._actions$.pipe(
    ofType(countMemberPopup),
    mergeMap(({ params }) => this.memberSearchService.countMember(params).pipe(
      map(res => countMemberPopupSuccess({ total: res })),
      catchError(res => of(countMemberPopupFailure({ msg: res })))
    ))
  ));
}