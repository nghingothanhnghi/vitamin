import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import { CodeService } from '@app/services/system/code.service';
import { 
  loadCodesY, 
  loadCodesYSuccess, 
  loadCodesYFailure, 
  loadCodesO,
  loadCodesOSuccess,
  loadCodesOFailure,
  loadCodesT,
  loadCodesTSuccess,
  loadCodesTFailure,
  loadCodesE,
  loadCodesESuccess,
  loadCodesEFailure,
} from '@app/actions/system/code.action';

@Injectable()
export class CodeEffect {

  constructor(
    private _actions$: Actions,
    private codeService: CodeService
  ) { }

  loadCodesY$ = createEffect(() => this._actions$.pipe(
    ofType(loadCodesY),
    debounceTime(300),
    mergeMap(() => this.codeService.getCodes("Y").pipe(
      map((res) => loadCodesYSuccess({ codes: res })),
      catchError((msg) => of(loadCodesYFailure({ msg: msg })))
    ))
  ));

  loadCodesO$ = createEffect(() => this._actions$.pipe(
    ofType(loadCodesO),
    debounceTime(300),
    mergeMap(() => this.codeService.getCodes("O").pipe(
      map((res) => loadCodesOSuccess({ codes: res })),
      catchError((msg) => of(loadCodesOFailure({ msg: msg })))
    ))
  ));

  loadCodesT$ = createEffect(() => this._actions$.pipe(
    ofType(loadCodesT),
    debounceTime(300),
    mergeMap(() => this.codeService.getCodes("T").pipe(
      map((res) => loadCodesTSuccess({ codes: res })),
      catchError((msg) => of(loadCodesTFailure({ msg: msg })))
    ))
  ));
  loadCodesE$ = createEffect(() => this._actions$.pipe(
    ofType(loadCodesE),
    debounceTime(300),
    mergeMap(() => this.codeService.getCodes("E").pipe(
      map((res) => loadCodesESuccess({ codes: res })),
      catchError((msg) => of(loadCodesEFailure({ msg: msg })))
    ))
  ));
}