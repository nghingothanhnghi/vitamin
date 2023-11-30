import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaccoService } from '@app/services/shoppingmall/macco.service';
import { callMacco, callMaccoFailure, callMaccoSuccess } from '@app/actions/shoppingmall/macco.action';


@Injectable()
export class MaccoEffect {

  constructor(
    private _actions$: Actions,
    private maccoService: MaccoService
  ) { }

  callMacco$ = createEffect(() => this._actions$.pipe(
    ofType(callMacco),
    mergeMap(({ kind, ordNo, userid }) => this.maccoService.callMacco(kind, ordNo, userid).pipe(
      map(res => callMaccoSuccess({ payload: res })),
      catchError(res => of(callMaccoFailure({ msg: res })))
    ))
  ));
}