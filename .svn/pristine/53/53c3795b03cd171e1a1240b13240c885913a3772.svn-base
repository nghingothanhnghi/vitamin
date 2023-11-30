import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, mergeMap, catchError, debounceTime } from 'rxjs/operators';

import { MyProgramService } from 'src/app/services/system/my-program.service';
import * as myProgramAction from "src/app/actions/system/my-program.actions";

@Injectable()
export class MyProgramEffects {

  constructor(
    private _actions$: Actions,
    private myProgramService: MyProgramService
  ) { }

  loadMyPrograms$ = createEffect(() => this._actions$.pipe(
    ofType(myProgramAction.loadMyPrograms),
    switchMap(() => this.myProgramService.getMenu().pipe(
      map((res) => myProgramAction.loadMyProgramsSuccess({ myPrograms: res })),
      catchError((err) => of(myProgramAction.loadMyProgramsFailure({ msg: err })))
    ))
  ));
}