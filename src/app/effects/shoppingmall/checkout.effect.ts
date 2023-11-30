import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { CheckoutService } from '@app/services/shoppingmall/checkout.service';
import { saveOrder, saveOrderFailure, saveOrderMoneyTmp, saveOrderMoneyTmpFailure, saveOrderMoneyTmpSuccess, saveOrderSuccess } from '@app/actions/shoppingmall/checkout.action';

@Injectable()
export class CheckoutEffect {

  constructor(
    private _actions$: Actions,
    private checkoutService: CheckoutService
  ) { }

  saveOrderMoneyTmp$ = createEffect(() => this._actions$.pipe(
    ofType(saveOrderMoneyTmp),
    mergeMap(({ params }) => this.checkoutService.saveOrderMoneyTmp(params).pipe(
      map(res => saveOrderMoneyTmpSuccess({ result: res })),
      catchError(res => of(saveOrderMoneyTmpFailure({ msg: res })))
    ))
  ));

  saveOrder$ = createEffect(() => this._actions$.pipe(
    ofType(saveOrder),
    mergeMap(({ params }) => this.checkoutService.saveOrder(params).pipe(
      map(res => saveOrderSuccess({ result: res })),
      catchError(res => of(saveOrderFailure({ msg: res })))
    ))
  ));
}