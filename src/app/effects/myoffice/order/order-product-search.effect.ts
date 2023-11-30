import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderProductSearchService } from '@app/services/myoffice/order/order-product-search.service';
import { 
  countOrderProduct,
  countOrderProductFailure,
  countOrderProductSuccess,
  searchOrderProduct, 
  searchOrderProductFailure, 
  searchOrderProductSuccess, 
  sumOrderProduct,
  sumOrderProductFailure,
  sumOrderProductSuccess
} from '@app/actions/myoffice/order/order-product-search.action';

@Injectable()
export class OrderProductSearchEffect {

  constructor(
    private _actions$: Actions,
    private orderProductSearchService: OrderProductSearchService
  ) { }

  searchOrderProduct$ = createEffect(() => this._actions$.pipe(
    ofType(searchOrderProduct),
    mergeMap(({ params }) => this.orderProductSearchService.searchOrderProduct(params).pipe(
      map(res => searchOrderProductSuccess({ ordPdts: res })),
      catchError(msg => of(searchOrderProductFailure({ msg: msg })))
    ))
  ));

  countOrderProduct$ = createEffect(() => this._actions$.pipe(
    ofType(countOrderProduct),
    mergeMap(({ params }) => this.orderProductSearchService.countOrderProduct(params).pipe(
      map(res => countOrderProductSuccess({ total: res })),
      catchError(msg => of(countOrderProductFailure({ msg: msg })))
    ))
  ));

  sumOrderProduct$ = createEffect(() => this._actions$.pipe(
    ofType(sumOrderProduct),
    mergeMap(({ params }) => this.orderProductSearchService.sumOrderProduct(params).pipe(
      map(res => sumOrderProductSuccess({ ordPdt: res })),
      catchError(msg => of(sumOrderProductFailure({ msg: msg })))
    ))
  ));
}