import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PopBoardService } from '@app/services/homepage/pop-board.service';
import { loadPopBoards, loadPopBoardsFailure, loadPopBoardsSuccess } from '@app/actions/homepage/pop-board.action';

@Injectable()
export class PopBoardEffect {

  constructor(
    private _actions$: Actions,
    private popBoardService: PopBoardService
  ) { }

  loadPopBoards$ = createEffect(() => this._actions$.pipe(
    ofType(loadPopBoards),
    mergeMap(() => this.popBoardService.loadPopBoards().pipe(
      map(res => loadPopBoardsSuccess({ popBoards: res })),
      catchError(res => of(loadPopBoardsFailure({ msg: res })))
    ))
  ));
}