import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderPopupService } from '@app/services/myoffice/order/order-popup.service';
import { countOrderPopup, countOrderPopupFailure, countOrderPopupSuccess, searchOrderPopup, searchOrderPopupFailure, searchOrderPopupSuccess } from '@app/actions/myoffice/order/order-popup.action';

@Injectable()
export class OrderPopupEffect {
  
  constructor(
    private _actions$: Actions,
    private orderPopupService: OrderPopupService
  ) { }

  searchOrderPopup$ = createEffect(() => this._actions$.pipe(
    ofType(searchOrderPopup),
    mergeMap(({ params }) => this.orderPopupService.searchOrderPopup(params).pipe(
      map(res => searchOrderPopupSuccess({ orderItems: res })),
      catchError(res => of(searchOrderPopupFailure({ msg: res })))
    ))
  ));

  countOrderPopup$ = createEffect(() => this._actions$.pipe(
    ofType(countOrderPopup),
    mergeMap(({ params }) => this.orderPopupService.countOrderPopup(params).pipe(
      map(res => countOrderPopupSuccess({ total: res })),
      catchError(res => of(countOrderPopupFailure({ msg: res })))
    ))
  ));
}