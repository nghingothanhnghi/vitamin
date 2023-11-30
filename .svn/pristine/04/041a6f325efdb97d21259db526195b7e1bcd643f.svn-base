import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { CenterInfoService } from '@app/services/shoppingmall/center-info.service';
import { loadCenterInfo, loadCenterInfoFailure, loadCenterInfoSuccess } from '@app/actions/shoppingmall/center-info.action';


@Injectable()
export class CenterInfoEffect {

  constructor(
    private _actions$: Actions,
    private centerInfoService: CenterInfoService
  ) { }

  loadCenterInfo$ = createEffect(() => this._actions$.pipe(
    ofType(loadCenterInfo),
    mergeMap(({ cntCd }) => this.centerInfoService.loadCenterInfo(cntCd).pipe(
      map(res => loadCenterInfoSuccess({ center: res })),
      catchError(res => of(loadCenterInfoFailure({ msg: res })))
    ))
  ));
}