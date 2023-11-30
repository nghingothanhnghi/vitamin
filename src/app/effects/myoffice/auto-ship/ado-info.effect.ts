import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ADOInfoService } from '@app/services/myoffice/auto-ship/ado-info.service';
import { loadAdoByAdoNo, loadAdoByAdoNoFailure, loadAdoByAdoNoSuccess, loadAdoPdtByAdoNo, loadAdoPdtByAdoNoFailure, loadAdoPdtByAdoNoSuccess } from '@app/actions/myoffice/auto-ship/ado-info.action';

@Injectable()
export class ADOInfoEffect {

  constructor(
    private _actions$: Actions,
    private adoInfoService: ADOInfoService
  ) { }

  loadAdoByAdoNo$ = createEffect(() => this._actions$.pipe(
    ofType(loadAdoByAdoNo),
    mergeMap(({ adoNo }) => this.adoInfoService.loadAdoByAdoNo(adoNo).pipe(
      map(res => loadAdoByAdoNoSuccess({ ado: res })),
      catchError(res => of(loadAdoByAdoNoFailure({ msg: res })))
    ))
  ));

  loadAdoPdtByAdoNo$ = createEffect(() => this._actions$.pipe(
    ofType(loadAdoPdtByAdoNo),
    mergeMap(({ adoNo }) => this.adoInfoService.loadAdoPdtByAdoNo(adoNo).pipe(
      map(res => loadAdoPdtByAdoNoSuccess({ pdts: res })),
      catchError(res => of(loadAdoPdtByAdoNoFailure({ msg: res })))
    ))
  ));
};
