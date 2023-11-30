import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import { CenterService } from '@app/services/system/center.service';
import { loadCenter, loadCenterFailure, loadCenterSuccess } from '@app/actions/system/center.action';

@Injectable()
export class CenterEffect {

  constructor(
    private _actions$: Actions,
    private centerService: CenterService
  ) { }

  loadCenters$ = createEffect(() => this._actions$.pipe(
    ofType(loadCenter),
    mergeMap(() => this.centerService.getCenters("").pipe(
      map(res => loadCenterSuccess({ centers: res })),
      catchError(msg => of(loadCenterFailure({ msg: msg })))
    ))
  ));
  
}