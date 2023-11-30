import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashBoardService } from '@app/services/myoffice/dashboard/dashboard.service';
import { getActivityStatusDashBoard, getActivityStatusDashBoardCount, getActivityStatusDashBoardCountFailure, getActivityStatusDashBoardCountSuccess, getActivityStatusDashBoardFailure, getActivityStatusDashBoardSuccess, getInfoDashBoard, getInfoDashBoardFailure, getInfoDashBoardSuccess, getListMonthPaymentDate, getListMonthPaymentDateFailure, getListMonthPaymentDateSuccess, getListPaymentDate, getListPaymentDateFailure, getListPaymentDateSuccess, getSatusOfRankDashBoard, getSatusOfRankDashBoardFailure, getSatusOfRankDashBoardSuccess, getSatusOfRankDashBoardSum, getSatusOfRankDashBoardSumFailure, getSatusOfRankDashBoardSumSuccess } from '@app/actions/myoffice/dashboard/dashboard.action';

@Injectable()
export class DashBoardEffect {

  constructor(
    private actions$: Actions,
    private dashBoardService: DashBoardService
  ) { }

  getListMonthPaymentDate$ = createEffect(() => this.actions$.pipe(
    ofType(getListMonthPaymentDate),
    mergeMap(({ params }) => this.dashBoardService.getListMonthPaymentDate(params).pipe(
      map(res => getListMonthPaymentDateSuccess({ dashBoard: res })),
      catchError(msg => of(getListMonthPaymentDateFailure({ msg: msg })))
    ))
  ));

  getListPaymentDate$ = createEffect(() => this.actions$.pipe(
    ofType(getListPaymentDate),
    mergeMap(({ params }) => this.dashBoardService.getListPaymentDate(params).pipe(
      map(res => getListPaymentDateSuccess({ dashBoard: res })),
      catchError(msg => of(getListPaymentDateFailure({ msg: msg })))
    ))
  ));

  getInfoDashBoard$ = createEffect(() => this.actions$.pipe(
    ofType(getInfoDashBoard),
    mergeMap(({ params }) => this.dashBoardService.getInfoDashBoard(params).pipe(
      map(res => getInfoDashBoardSuccess({ dashBoard: res })),
      catchError(msg => of(getInfoDashBoardFailure({ msg: msg })))
    ))
  ));

  getActivityStatusDashBoard$ = createEffect(() => this.actions$.pipe(
    ofType(getActivityStatusDashBoard),
    mergeMap(({ params }) => this.dashBoardService.getActivityStatusDashBoard(params).pipe(
      map(res => getActivityStatusDashBoardSuccess({ dashBoard: res })),
      catchError(msg => of(getActivityStatusDashBoardFailure({ msg: msg })))
    ))
  ));

  getActivityStatusDashBoardCount$ = createEffect(() => this.actions$.pipe(
    ofType(getActivityStatusDashBoardCount),
    mergeMap(({ params }) => this.dashBoardService.getActivityStatusDashBoardCount(params).pipe(
      map(res => getActivityStatusDashBoardCountSuccess({ total: res })),
      catchError(msg => of(getActivityStatusDashBoardCountFailure({ msg: msg })))
    ))
  ));
  
  getSatusOfRankDashBoard$ = createEffect(() => this.actions$.pipe(
    ofType(getSatusOfRankDashBoard),
    mergeMap(({ params }) => this.dashBoardService.getSatusOfRankDashBoard(params).pipe(
      map(res => getSatusOfRankDashBoardSuccess({ dashBoard: res })),
      catchError(msg => of(getSatusOfRankDashBoardFailure({ msg: msg })))
    ))
  ));

  getSatusOfRankDashBoardSum$ = createEffect(() => this.actions$.pipe(
    ofType(getSatusOfRankDashBoardSum),
    mergeMap(({ params }) => this.dashBoardService.getSatusOfRankDashBoardSum(params).pipe(
      map(res => getSatusOfRankDashBoardSumSuccess({ dashBoard: res })),
      catchError(msg => of(getSatusOfRankDashBoardSumFailure({ msg: msg })))
    ))
  ));

};
