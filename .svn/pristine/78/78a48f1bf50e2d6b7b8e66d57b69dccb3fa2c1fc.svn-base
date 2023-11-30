import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderScheduleService } from '@app/services/myoffice/order/order-schedule.service';
import { searchOrderCalendar, searchOrderCalendarFailure, searchOrderCalendarSuccess, sumOrderCalendar, sumOrderCalendarFailure, sumOrderCalendarSuccess } from '@app/actions/myoffice/order/order-calendar.action';

@Injectable()
export class OrderCalendarEffect {

  constructor(
    private _actions$: Actions,
    private orderScheduleService: OrderScheduleService
  ) { }

  searchCalendar$ = createEffect(() => this._actions$.pipe(
    ofType(searchOrderCalendar),
    mergeMap(({ userId, year, month }) => this.orderScheduleService.searchOrderCalendar(userId, year, month).pipe(
      map(res => searchOrderCalendarSuccess({ items: res })),
      catchError(msg => of(searchOrderCalendarFailure({ msg: msg })))
    ))
  ));

  sumCalendar$ = createEffect(() => this._actions$.pipe(
    ofType(sumOrderCalendar),
    mergeMap(({ userId, year, month }) => this.orderScheduleService.sumOrderCalendar(userId, year, month).pipe(
      map(res => sumOrderCalendarSuccess({ items: res })),
      catchError(msg => of(sumOrderCalendarFailure({ msg: msg })))
    ))
  ));
}