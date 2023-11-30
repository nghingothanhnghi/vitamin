import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { VbBankService } from '@app/services/shoppingmall/vbbank.service';
import { payVBank, payVBankFailure, payVBankSuccess } from '@app/actions/shoppingmall/vbbank.action';

@Injectable()
export class VbBankEffect {

  constructor(
    private _actions$: Actions,
    private vbBankService: VbBankService
  ) { }

  payVBank$ = createEffect(() => this._actions$.pipe(
    ofType(payVBank),
    mergeMap(({ params }) => this.vbBankService.payVBank(params).pipe(
      map(res => payVBankSuccess({ cardResponse: res })),
      catchError(res => of(payVBankFailure({ msg: res })))
    ))
  ));

}