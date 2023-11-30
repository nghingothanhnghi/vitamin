import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberAnalysisService } from "@services/myoffice/member/member-analysis.service";
import * as memberAnalysisAction from "@app/actions/myoffice/member/affiliate-member-analysis.action"

@Injectable()
export class MemberAnalysisEffect {

  constructor(
    private actions$: Actions,
    private memberAnalysisService: MemberAnalysisService
  ) { }


  chartMemberGender$ = createEffect(() => this.actions$.pipe(
    ofType(memberAnalysisAction.chartMemberGender),
    mergeMap((action) => this.memberAnalysisService.chartMemberGender(action.userId)
      .pipe(
        map(
          res => (memberAnalysisAction.chartMemberGenderSuccess({ analysisMembers: res })
          )),
        catchError(
          msg => of(memberAnalysisAction.chartMemberGenderFailure({ msg: msg })
          ))
      ))
  )
  );
  chartMemberMonth$ = createEffect(() => this.actions$.pipe(
    ofType(memberAnalysisAction.chartMemberMonth),
    mergeMap((action) => this.memberAnalysisService.chartMemberMonth(action.userId)
      .pipe(
        map(
          res => (memberAnalysisAction.chartMemberMonthSuccess({ analysisMemberMonths: res })
          )),
        catchError(
          msg => of(memberAnalysisAction.chartMemberMonthFailure({ msg: msg })
          ))
      ))
  )
  );
  chartMemberAge$ = createEffect(() => this.actions$.pipe(
    ofType(memberAnalysisAction.chartMemberAge),
    mergeMap((action) => this.memberAnalysisService.chartMemberAge(action.userId)
      .pipe(
        map(
          res => (memberAnalysisAction.chartMemberAgeSuccess({ analysisAges: res })
          )),
        catchError(
          msg => of(memberAnalysisAction.chartMemberAgeFailure({ msg: msg })
          ))
      ))
  )
  );
  chartMemberRank$ = createEffect(() => this.actions$.pipe(
    ofType(memberAnalysisAction.chartMemberRank),
    mergeMap((action) => this.memberAnalysisService.chartMemberRank(action.userId)
      .pipe(
        map(
          res => (memberAnalysisAction.chartMemberRankSuccess({ memberRanks: res })
          )),
        catchError(
          msg => of(memberAnalysisAction.chartMemberRankFailure({ msg: msg })
          ))
      ))
  )
  );

}
