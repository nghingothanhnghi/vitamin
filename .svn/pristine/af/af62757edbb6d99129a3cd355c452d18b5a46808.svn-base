import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderSearchService } from '@app/services/myoffice/order/order-search.service';
import {
  countOrder,
  countOrderFailure,
  countOrderSuccess,
  searchOrder,
  searchOrderFailure,
  searchOrderSuccess,
  sumOrder,
  sumOrderFailure,
  sumOrderSuccess
} from '@app/actions/myoffice/order/order-search.action';

@Injectable()
export class OrderSearchEffect {

  constructor(
    private _actions$: Actions,
    private orderSearchService: OrderSearchService
  ) { }

  searchOrder$ = createEffect(() => this._actions$.pipe(
    ofType(searchOrder),
    mergeMap(({ params }) => this.orderSearchService.searchOrder(params).pipe(
      map(res => searchOrderSuccess({ orders: res })),
      catchError(msg => of(searchOrderFailure({ msg: msg })))
    ))
  ));

  countOrder$ = createEffect(() => this._actions$.pipe(
    ofType(countOrder),
    mergeMap(({ params }) => this.orderSearchService.countOrder(params).pipe(
      map(res => countOrderSuccess({ total: res })),
      catchError(msg => of(countOrderFailure({ msg: msg })))
    ))
  ));

  sumOrder$ = createEffect(() => this._actions$.pipe(
    ofType(sumOrder),
    mergeMap(({ params }) => this.orderSearchService.sumOrder(params).pipe(
      map(res => sumOrderSuccess({ order: res })),
      catchError(msg => of(sumOrderFailure({ msg: msg })))
    ))
  ));
}