import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SmWownetService } from '@app/services/system/sm-wownet.service';

import { 
  loadSmWownet, loadSmWownetFailure, loadSmWownetSuccess,
  loadSmWownetConfig, loadSmWownetConfigFailure, loadSmWownetConfigSuccess,
  loadSmWownetPg, loadSmWownetPgFailure, loadSmWownetPgSuccess, loadFindPayHeader, loadFindPayHeaderSuccess, loadFindPayHeaderFailure, loadWowWord, loadWowWordSuccess, loadWowWordFailure
 } from '@app/actions/system/sm-wownet.action';

@Injectable()
export class SmWownetEffect {

  constructor(
    private _actions$: Actions,
    private smWownetService: SmWownetService
  ) { }

  loadSmWownet$ = createEffect(() => this._actions$.pipe(
    ofType(loadSmWownet),
    mergeMap(() => this.smWownetService.loadSmWownet().pipe(
      map(res => loadSmWownetSuccess({item: res})),
      catchError(res => of(loadSmWownetFailure({msg: res})))
    ))
  ));
  loadSmWowConfig$ = createEffect(() => this._actions$.pipe(
    ofType(loadSmWownetConfig),
    mergeMap(() => this.smWownetService.loadSmWownetConfig().pipe(
      map(res => loadSmWownetConfigSuccess({item: res})),
      catchError(res => of(loadSmWownetConfigFailure({msg: res})))
    ))
  ));
  loadSmWowPG$ = createEffect(() => this._actions$.pipe(
    ofType(loadSmWownetPg),
    mergeMap(() => this.smWownetService.loadSmWownetPg().pipe(
      map(res => loadSmWownetPgSuccess({item: res})),
      catchError(res => of(loadSmWownetPgFailure({msg: res})))
    ))
  ));

  loadFindPayHeader$ = createEffect(() => this._actions$.pipe(
    ofType(loadFindPayHeader),
    mergeMap(() => this.smWownetService.loadFindPayHeader().pipe(
      map(res => loadFindPayHeaderSuccess({item: res})),
      catchError(res => of(loadFindPayHeaderFailure({msg: res})))
    ))
  ));

  loadWowWord$ = createEffect(() => this._actions$.pipe(
    ofType(loadWowWord),
    mergeMap(() => this.smWownetService.loadWowWord().pipe(
      map(res => loadWowWordSuccess({item: res})),
      catchError(res => of(loadWowWordFailure({msg: res})))
    ))
  ));

}