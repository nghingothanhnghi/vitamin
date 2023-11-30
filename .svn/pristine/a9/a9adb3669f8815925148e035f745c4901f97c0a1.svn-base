import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { DeliPopupService } from '@app/services/shoppingmall/deli-popup.service';
import { countDelis, countDelisFailure, countDelisSuceess, loadDelis, loadDelisFailure, loadDelisSuceess } from '@app/actions/shoppingmall/deli-popup.action';


@Injectable()
export class DeliPopupEffect {

  constructor(
    private _actions$: Actions,
    private deliPopupService: DeliPopupService
  ) { }

  loadDelis$ = createEffect(() => this._actions$.pipe(
    ofType(loadDelis),
    mergeMap(({ userid, page, len }) => this.deliPopupService.loadDelis(userid, page, len).pipe(
      map(res => loadDelisSuceess({ delis: res })),
      catchError(res => of(loadDelisFailure({ msg: res })))
    ))
  ));

  countDelis$ = createEffect(() => this._actions$.pipe(
    ofType(countDelis),
    mergeMap(({ userid, page, len }) => this.deliPopupService.countDeli(userid, page, len).pipe(
      map(res => countDelisSuceess({ total: res })),
      catchError(res => of(countDelisFailure({ msg: res })))
    ))
  ));
}