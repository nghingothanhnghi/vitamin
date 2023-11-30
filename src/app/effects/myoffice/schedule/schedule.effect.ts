import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ScheduleService } from '@app/services/myoffice/schedule/schedule.service';
import { eventVideos, eventVideosFailure, eventVideosSuccess, searchSchedule, searchScheduleFailure, searchScheduleSuccess } from '@app/actions/myoffice/schedule/schedule.action';

@Injectable()
export class ScheduleEffect {

  constructor(
    private _actions$: Actions,
    private scheduleService: ScheduleService
  ) { }

  searchItems$ = createEffect(() => this._actions$.pipe(
    ofType(searchSchedule),
    mergeMap(({ year, month  }) => this.scheduleService.search(year, month ).pipe(
      map(res => searchScheduleSuccess({ schedule: res })),
      catchError(msg => of(searchScheduleFailure({ msg: msg })))
    ))
  ));

  eventVideos$ = createEffect(() => this._actions$.pipe(
    ofType(eventVideos),
    mergeMap(({ regNo  }) => this.scheduleService.eventVideos(regNo ).pipe(
      map(res => eventVideosSuccess({ board: res })),
      catchError(msg => of(eventVideosFailure({ msg: msg })))
    ))
  ));

}