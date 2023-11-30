import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderMonthlyService } from '@app/services/myoffice/order/order-monthly.service';
import { countOrderMonthly, countOrderMonthlyFailure, countOrderMonthlySuccess, searchOrderMonthly, searchOrderMonthlyFailure, searchOrderMonthlySuccess, sumOrderMonthly, sumOrderMonthlyFailure, sumOrderMonthlySuccess } from '@app/actions/myoffice/order/monthly-order-count.action';

@Injectable()
export class MonthlyOrderCountEffect {

  constructor(
    private _actions$: Actions,
    private orderMonthlyService: OrderMonthlyService
  ) { }

  searchOrderMonthly$ = createEffect(() => this._actions$.pipe(
    ofType(searchOrderMonthly),
    mergeMap(({ params }) => this.orderMonthlyService.searchOrderMonthly(params).pipe(
      map(res => searchOrderMonthlySuccess({ orderItems: res })),
      catchError(msg => of(searchOrderMonthlyFailure({ msg: msg })))
    ))
  ));

  countOrderMonthly$ = createEffect(() => this._actions$.pipe(
    ofType(countOrderMonthly),
    mergeMap(({ params }) => this.orderMonthlyService.countOrderMonthly(params).pipe(
      map(res => countOrderMonthlySuccess({ total: res })),
      catchError(msg => of(countOrderMonthlyFailure({ msg: msg })))
    ))
  ));

  sumOrderMonthly$ = createEffect(() => this._actions$.pipe(
    ofType(sumOrderMonthly),
    mergeMap(({ params }) => this.orderMonthlyService.sumOrderMonthly(params).pipe(
      map(res => sumOrderMonthlySuccess({ orderSum: res })),
      catchError(msg => of(sumOrderMonthlyFailure({ msg: msg })))
    ))
  ));
}