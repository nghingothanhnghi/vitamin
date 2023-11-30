import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { RankService } from '@app/services/system/rank.service';
import { loadRank, loadRankFailure, loadRankSuccess } from '@app/actions/system/rank.action';

@Injectable()
export class RankEffect {

  constructor(
    private _actions$: Actions,
    private rankService: RankService
  ) { }

  loadRanks$ = createEffect(() => this._actions$.pipe(
    ofType(loadRank),
    mergeMap(() => this.rankService.loadAllRank().pipe(
      map(res => loadRankSuccess({ ranks: res })),
      catchError(msg => of(loadRankFailure({ msg: msg })))
    ))
  ));
}