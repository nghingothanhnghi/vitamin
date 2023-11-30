import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { KICCPaymentService } from '@app/services/shoppingmall/kicc-payment.service';
import { payCard, payCardFailure, payCardSuccess } from '@app/actions/shoppingmall/kicc-payment.action';

@Injectable()
export class KICCPaymentEffect {

  constructor(
    private _actions$: Actions,
    private kiccPaymentService: KICCPaymentService
  ) { }

  payCard$ = createEffect(() => this._actions$.pipe(
    ofType(payCard),
    mergeMap(({ params }) => this.kiccPaymentService.payCard(params).pipe(
      map(res => payCardSuccess({ cardResponse: res })),
      catchError(res => of(payCardFailure({ msg: res })))
    ))
  ));
}