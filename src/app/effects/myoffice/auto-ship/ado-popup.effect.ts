import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ADOPopupService } from '@app/services/myoffice/auto-ship/ado-popup.service';
import { loadListAdo, loadListAdoFailure, loadListAdoSuccess, loadTotalAdo, loadTotalAdoFailure, loadTotalAdoSuccess } from '@app/actions/myoffice/auto-ship/ado-popup.action';


@Injectable()
export class ADOPopupEffect {

  constructor(
    private _actions$: Actions,
    private adoPopupService: ADOPopupService
  ) { }

  loadADOProducts$ = createEffect(() => this._actions$.pipe(
    ofType(loadListAdo),
    mergeMap(({ params }) => this.adoPopupService.loadListAdo(params).pipe(
      map(res => loadListAdoSuccess({ items: res })),
      catchError(res => of(loadListAdoFailure({ msg: res })))
    ))
  ));

  loadTotalAdo$ = createEffect(() => this._actions$.pipe(
    ofType(loadTotalAdo),
    mergeMap(({ params }) => this.adoPopupService.loadTotalAdo(params).pipe(
      map(res => loadTotalAdoSuccess({ total: res })),
      catchError(res => of(loadTotalAdoFailure({ msg: res })))
    ))
  ));
};
