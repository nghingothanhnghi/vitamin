import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberInforInquiryService } from "@services/myoffice/member/member-infor-inquiry.service";
import * as memberInforInquiryAction from "@app/actions/myoffice/member/member-infor-inquiry.actions"

@Injectable()
export class MemberInforInquiryEffect {

  constructor(
    private actions$: Actions,
    private memberInforInquiryService: MemberInforInquiryService
  ) { }

  loadMemInfo$ = createEffect(() => this.actions$.pipe(
    ofType(memberInforInquiryAction.loadMemInfo),
    mergeMap((action) => this.memberInforInquiryService.getMemInfo(action.userId).pipe(
      map(
        comp => (memberInforInquiryAction.loadMemInfoSuccess({ memInfo: comp })
        )),
      catchError(
        msg => of(memberInforInquiryAction.loadMemInfoFailure({ msg: msg })
        ))
    ))
  )
  );

  loadRankHistorys$ = createEffect(() => this.actions$.pipe(
    ofType(memberInforInquiryAction.loadRankHistorys),
    mergeMap((action) => this.memberInforInquiryService.getRankHistories(action.userId).pipe(
      map((res) => memberInforInquiryAction.loadRankHistorySuccess({ rankHistories: res })),
      catchError((err) => of(memberInforInquiryAction.loadRankHistoryFailure({ msg: err })))
    ))
  ));

  loadAffiliatedMember$ = createEffect(() => this.actions$.pipe(
    ofType(memberInforInquiryAction.loadAffiliatedMember),
    mergeMap((action) => this.memberInforInquiryService.findAffiliatedMember(action.userId)
      .pipe(
        map(
          res => (memberInforInquiryAction.loadAffiliatedMemberSuccess({ affiliatedMember: res })
          )),
        catchError(
          msg => of(memberInforInquiryAction.loadAffiliatedMemberFailure({ msg: msg })
          ))
      ))
  )
  );

  // loadOrdMonths$ = createEffect(() => this.actions$.pipe(
  //   ofType(memberInforInquiryAction.loadOrdMonth),
  //   mergeMap((action) =>
  //     this.memberInforInquiryService.getOrdMonth(action.userId, action.startDate, action.endDate)
  //       .pipe(
  //         map((res) => memberInforInquiryAction.loadOrdMonthSuccess({ ordMonths: res })),
  //         catchError((err) => of(memberInforInquiryAction.loadOrdMonthFailure({ msg: err })))
  //       ))
  // ));

  loadTreeInfo$ = createEffect(() => this.actions$.pipe(
    ofType(memberInforInquiryAction.loadTreeInfo),
    mergeMap((action) => this.memberInforInquiryService.getTreeInfo(action.userId, action.page, action.len)
      .pipe(
        map(
          res => (memberInforInquiryAction.loadTreeInfoSuccess({ members: res })
          )),
        catchError(
          msg => of(memberInforInquiryAction.loadTreeInfoFailure({ msg: msg })
          ))
      ))
  )
  );

  countTreeInfo$ = createEffect(() => this.actions$.pipe(
    ofType(memberInforInquiryAction.countTreeInfo),
    mergeMap((action) => this.memberInforInquiryService.countTreeInfo(action.userId)
      .pipe(
        map(
          res => (memberInforInquiryAction.countTreeInfoSuccess({ count: res })
          )),
        catchError(
          msg => of(memberInforInquiryAction.countTreeInfoFailure({ msg: msg })
          ))
      ))
  )
  );


  // loadMonthlyPositionDetail$ = createEffect(() => this.actions$.pipe(
  //   ofType(memberInforInquiryAction.loadMonthlyPositionDetails),
  //   mergeMap((action) =>
  //     this.memberInforInquiryService.getMonthlyPositionDetails(action.userId)
  //       .pipe(
  //         map((res) => memberInforInquiryAction.loadMonthlyPositionDetailsSuccess({ memRank: res })),
  //         catchError((err) => of(memberInforInquiryAction.loadMonthlyPositionDetailsFailure({ msg: err })))
  //       ))
  // ));

  // loadOrdMonthByMembers$ = createEffect(() => this.actions$.pipe(
  //   ofType(memberInforInquiryAction.loadSearchOrdMonthByMember),
  //   mergeMap((action) =>
  //     this.memberInforInquiryService.searchOrdMonthByMembers(action.userId)
  //       .pipe(
  //         map((res) => memberInforInquiryAction.loadSearchOrdMonthByMemberSuccess({ ordMonthly: res })),
  //         catchError((err) => of(memberInforInquiryAction.loadSearchOrdMonthByMemberFailure({ msg: err })))
  //       ))
  // ));

  // loadSumOrdMonthByMember$ = createEffect(() => this.actions$.pipe(
  //   ofType(memberInforInquiryAction.loadSumOrdMonthByMember),
  //   mergeMap((action) =>
  //     this.memberInforInquiryService.sumOrdMonthByMember(action.userId)
  //       .pipe(
  //         map((res) => memberInforInquiryAction.loadSumOrdMonthByMemberSuccess({ member: res })),
  //         catchError((err) => of(memberInforInquiryAction.loadSumOrdMonthByMemberFailure({ msg: err })))
  //       ))
  // ));


}
