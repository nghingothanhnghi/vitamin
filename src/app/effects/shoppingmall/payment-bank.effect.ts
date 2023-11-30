import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PaymentBankService } from '@app/services/shoppingmall/payment-bank.service';
import { loadPaymentBanks, loadPaymentBanksFailure, loadPaymentBanksSuccess } from '@app/actions/shoppingmall/payment-bank.action';

@Injectable()
export class PaymentBankEffect {

  constructor(
    private _actions$: Actions,
    private paymentBankService: PaymentBankService
  ) { }

  loadPaymentBanks$ = createEffect(() => this._actions$.pipe(
    ofType(loadPaymentBanks),
    mergeMap(() => this.paymentBankService.loadPaymentBanks().pipe(
      map(res => loadPaymentBanksSuccess({ banks: res })),
      catchError(res => of(loadPaymentBanksFailure({ msg: res })))
    ))
  ));
}