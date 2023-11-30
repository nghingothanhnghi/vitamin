import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderWithdrawalService } from '@app/services/myoffice/report/order-withdrawal.service';
import { loadListOrderPdtWithdrawal, loadListOrderPdtWithdrawalFailure, loadListOrderPdtWithdrawalSuccess, loadOrderMstWithdrawal, loadOrderMstWithdrawalFailure, loadOrderMstWithdrawalSuccess, loadSumOrderPdtWithdrawal, loadSumOrderPdtWithdrawalFailure, loadSumOrderPdtWithdrawalSuccess } from '@app/actions/myoffice/report/order-withrawal.action';

@Injectable()
export class OrderWithdrawalEffect {

  constructor(
    private _actions$: Actions,
    private orderWithdrawalService: OrderWithdrawalService
  ) { }

  loadOrderMstWithdrawal$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderMstWithdrawal),
    mergeMap(({ ordNo }) => this.orderWithdrawalService.loadOrderMstWithdralwal(ordNo).pipe(
      map(res => loadOrderMstWithdrawalSuccess({ ordMst: res })),
      catchError(res => of(loadOrderMstWithdrawalFailure({ msg: res })))
    ))
  ));

  loadListOrderPdtWithdrawal$ = createEffect(() => this._actions$.pipe(
    ofType(loadListOrderPdtWithdrawal),
    mergeMap(({ ordNo }) => this.orderWithdrawalService.loadListOrderPdtWithdralwal(ordNo).pipe(
      map(res => loadListOrderPdtWithdrawalSuccess({ ordPdts: res })),
      catchError(res => of(loadListOrderPdtWithdrawalFailure({ msg: res })))
    ))
  ));

  loadSumOrderPdtWithdrawal$ = createEffect(() => this._actions$.pipe(
    ofType(loadSumOrderPdtWithdrawal),
    mergeMap(({ ordNo }) => this.orderWithdrawalService.loadSumOrderPdtWithdralwal(ordNo).pipe(
      map(res => loadSumOrderPdtWithdrawalSuccess({ ordPdt: res })),
      catchError(res => of(loadSumOrderPdtWithdrawalFailure({ msg: res })))
    ))
  ));
}