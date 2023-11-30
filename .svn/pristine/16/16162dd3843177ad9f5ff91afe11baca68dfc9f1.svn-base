import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberSearchService } from "@services/myoffice/member/member-search.service";
import * as memberSearchAction from "@app/actions/myoffice/member/member-search.action"

@Injectable()
export class MemberSearchEffect {

  constructor(
    private actions$: Actions,
    private memberSearchService: MemberSearchService
  ) { }


  loadMember$ = createEffect(() => this.actions$.pipe(
    ofType(memberSearchAction.searchMember),
    mergeMap(({ params }) => this.memberSearchService.searchMember(params)
      .pipe(
        map(
          res => (memberSearchAction.searchMemberSuccess({ members: res })
          )),
        catchError(
          msg => of(memberSearchAction.searchMemberFailure({ msg: msg })
          ))
      ))
  )
  );

  countMember$ = createEffect(() => this.actions$.pipe(
    ofType(memberSearchAction.countMember),
    mergeMap(({ params }) => this.memberSearchService.countMember(params)
      .pipe(
        map(
          res => (memberSearchAction.countMemberSuccess({ count: res })
          )),
        catchError(
          msg => of(memberSearchAction.countMemberFailure({ msg: msg })
          ))
      ))
  )
  );

}
