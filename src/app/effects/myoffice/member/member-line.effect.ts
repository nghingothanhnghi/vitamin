import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberLineService } from "@services/myoffice/member/member-line.service";
import * as memberLineAction from "@app/actions/myoffice/member/member-line.action"

@Injectable()
export class MemberLineEffect {

  constructor(
    private actions$: Actions,
    private memberLineService: MemberLineService
  ) { }


  findLine$ = createEffect(() => this.actions$.pipe(
    ofType(memberLineAction.findLine),
    mergeMap(({ params }) => this.memberLineService.findLine(params)
      .pipe(
        map(
          res => (memberLineAction.findLineSuccess({ lineMembers: res })
          )),
        catchError(
          msg => of(memberLineAction.findLineFailure({ msg: msg })
          ))
      ))
  )
  );
  countLine$ = createEffect(() => this.actions$.pipe(
    ofType(memberLineAction.countLine),
    mergeMap(({ params }) => this.memberLineService.countLine(params)
      .pipe(
        map(
          res => (memberLineAction.countLineSuccess({ total: res })
          )),
        catchError(
          msg => of(memberLineAction.countLineFailure({ msg: msg })
          ))
      ))
  )
  );
  findTopLineMember$ = createEffect(() => this.actions$.pipe(
    ofType(memberLineAction.findTopLineMember),
    mergeMap((action) => this.memberLineService.findTopLineMember(action.userId, action.logId, action.memberType)
      .pipe(
        map(
          res => (memberLineAction.findTopLineMemberSuccess({ topLineMembers: res })
          )),
        catchError(
          msg => of(memberLineAction.findTopLineMemberFailure({ msg: msg })
          ))
      ))
  )
  );

}
