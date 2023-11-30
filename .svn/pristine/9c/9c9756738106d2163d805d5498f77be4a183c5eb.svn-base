import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberInforPositionService } from "@services/myoffice/member/member-inquiry-position.service";
import * as memPositionAction from "@app/actions/myoffice/member/member-inquiry-position.action"

@Injectable()
export class MemberInforPositionEffect {

  constructor(
    private actions$: Actions,
    private memberPositionService: MemberInforPositionService
  ) { }

  getRankMember$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.getRankMember),
    mergeMap(({ params }) => this.memberPositionService.getRankMember(params).pipe(
      map(
        comp => (memPositionAction.getRankMemberSuccess({ ranks: comp })
        )),
      catchError(
        msg => of(memPositionAction.getRankMemberFailure({ msg: msg })
        ))
    ))
  )
  );

  getMemberRId$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.getMemberRId),
    mergeMap(({ params }) => this.memberPositionService.getMemberRId(params).pipe(
      map(
        comp => (memPositionAction.getMemberRIdSuccess({ members: comp })
        )),
      catchError(
        msg => of(memPositionAction.getMemberRIdFailure({ msg: msg })
        ))
    ))
  )
  );
  getCountMemberRId$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.countMemberRId),
    mergeMap(({ params }) => this.memberPositionService.countMemberRId(params).pipe(
      map(
        comp => (memPositionAction.countMemberRIdSuccess({ total: comp })
        )),
      catchError(
        msg => of(memPositionAction.countMemberRIdFailure({ msg: msg })
        ))
    ))
  )
  );
  getAbPosinfo$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.loadAbPosInfo),
    mergeMap((action) => this.memberPositionService.abPosinfo(action.userId).pipe(
      map(
        comp => (memPositionAction.loadAbPosInfoSuccess({ abPosinfo: comp })
        )),
      catchError(
        msg => of(memPositionAction.loadAbPosInfoFailure({ msg: msg })
        ))
    ))
  )
  );
  binaryLegsInfoA$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.binaryLegsInfoA),
    mergeMap(({ params }) => this.memberPositionService.binaryLegSearch(params).pipe(
      map(
        comp => (memPositionAction.binaryLegsInfoASuccess({ binaryLegsA: comp })
        )),
      catchError(
        msg => of(memPositionAction.binaryLegsInfoAFailure({ msg: msg })
        ))
    ))
  )
  );

  binaryLegCountA$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.binaryLegCountA),
    mergeMap(({ params }) => this.memberPositionService.binaryLegCount(params).pipe(
      map(
        res => (memPositionAction.binaryLegCountASuccess({ totalLegA: res })
        )),
      catchError(
        msg => of(memPositionAction.binaryLegCountAFailure({ msg: msg })
        ))
    ))
  )
  );

  binaryLegsInfoB$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.binaryLegsInfoB),
    mergeMap(({ params }) => this.memberPositionService.binaryLegSearch(params).pipe(
      map(
        comp => (memPositionAction.binaryLegsInfoBSuccess({ binaryLegsB: comp })
        )),
      catchError(
        msg => of(memPositionAction.binaryLegsInfoBFailure({ msg: msg })
        ))
    ))
  )
  );

  binaryLegCountB$ = createEffect(() => this.actions$.pipe(
    ofType(memPositionAction.binaryLegCountB),
    mergeMap(({ params }) => this.memberPositionService.binaryLegCount(params).pipe(
      map(
        res => (memPositionAction.binaryLegCountBSuccess({ totalLegB: res })
        )),
      catchError(
        msg => of(memPositionAction.binaryLegCountBFailure({ msg: msg })
        ))
    ))
  )
  );


}
