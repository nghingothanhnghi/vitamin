import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { IzexService } from 'src/app/services/system/izex.service';
import * as izexAction from "src/app/actions/system/izex.action";

@Injectable()
export class IzexEffects {

  constructor(
    private _actions$: Actions,
    private izexService: IzexService
  ) { }

  addOrUpdatePartner$ = createEffect(() => this._actions$.pipe(
    ofType(izexAction.addOrUpdatePartner),
    switchMap(({ params }) => this.izexService.addOrUpdatePartner(params).pipe(
      map((res) => izexAction.addOrUpdatePartnerSuccess({ izexRes: res})),
      catchError((err) => of(izexAction.addOrUpdatePartnerFailure({ msg: err })))
    ))
  ));
}