import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  countZipPopup,
  countZipPopupFailure,
  countZipPopupSuccess,
  searchZipPopup,
  searchZipPopupFailure,
  searchZipPopupSuccess
} from '@app/actions/system/zip-popup.action';

import { ZipPopupService } from '@app/services/system/zip-popup.service';

@Injectable()
export class ZipPopupEffect {
  
  constructor(
    private _actions$: Actions,
    private zipSearchService: ZipPopupService
  ) { }

  searchZipPopup$ = createEffect(() => this._actions$.pipe(
    ofType(searchZipPopup),
    mergeMap(({ params }) => this.zipSearchService.searchZipPopup(params).pipe(
      map(res => searchZipPopupSuccess({ zipItems: res })),
      catchError(res => of(searchZipPopupFailure({ msg: res })))
    ))
  ));

  countZipPopup$ = createEffect(() => this._actions$.pipe(
    ofType(countZipPopup),
    mergeMap(({ params }) => this.zipSearchService.countZipPopup(params).pipe(
      map(res => countZipPopupSuccess({ total: res })),
      catchError(res => of(countZipPopupFailure({ msg: res })))
    ))
  ));
}