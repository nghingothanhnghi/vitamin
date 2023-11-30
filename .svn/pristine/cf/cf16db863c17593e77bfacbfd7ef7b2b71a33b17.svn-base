import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AutoShipService } from '@app/services/myoffice/auto-ship/auto-ship.service';
import { paymentStatusCount, paymentStatusCountFailure, paymentStatusCountSuccess, paymentStatusSearch, paymentStatusSearchFailure, paymentStatusSearchSuccess, paymentStatusSum, paymentStatusSumFailure, paymentStatusSumSuccess, registrationDetailCount, registrationDetailCountFailure, registrationDetailCountSuccess, registrationDetailSearch, registrationDetailSearchFailure, registrationDetailSearchSuccess, registrationDetailSum, registrationDetailSumFailure, registrationDetailSumSuccess } from '@app/actions/myoffice/auto-ship/auto-ship.action';

@Injectable()
export class AutoShipEffect {

  constructor(
    private actions$: Actions,
    private autoShipService: AutoShipService
  ) { }

  //-------------------------------------------Autoship-Registration-Details--------------------------------------------------
  registrationDetailSearch$ = createEffect(() => this.actions$.pipe(
    ofType(registrationDetailSearch),
    mergeMap(({ params }) => this.autoShipService.registrationDetailSearch(params).pipe(
      map(res => registrationDetailSearchSuccess({ autoShip: res })),
      catchError(msg => of(registrationDetailSearchFailure({ msg: msg })))
    ))
  ));

  registrationDetailCount$ = createEffect(() => this.actions$.pipe(
    ofType(registrationDetailCount),
    mergeMap(({ params }) => this.autoShipService.registrationDetailCount(params).pipe(
      map(res => registrationDetailCountSuccess({ total: res })),
      catchError(msg => of(registrationDetailCountFailure({ msg: msg })))
    ))
  ));

  registrationDetailSum$ = createEffect(() => this.actions$.pipe(
    ofType(registrationDetailSum),
    mergeMap(({ params }) => this.autoShipService.registrationDetailSum(params).pipe(
      map(res => registrationDetailSumSuccess({ autoShip: res })),
      catchError(msg => of(registrationDetailSumFailure({ msg: msg })))
    ))
  ));

  //-------------------------------------------Autoship-Payment-Status--------------------------------------------------
  paymentStatusSearch$ = createEffect(() => this.actions$.pipe(
    ofType(paymentStatusSearch),
    mergeMap(({ params }) => this.autoShipService.paymentStatusSearch(params).pipe(
      map(res => paymentStatusSearchSuccess({ autoShip: res })),
      catchError(msg => of(paymentStatusSearchFailure({ msg: msg })))
    ))
  ));

  paymentStatusCount$ = createEffect(() => this.actions$.pipe(
    ofType(paymentStatusCount),
    mergeMap(({ params }) => this.autoShipService.paymentStatusCount(params).pipe(
      map(res => paymentStatusCountSuccess({ total: res })),
      catchError(msg => of(paymentStatusCountFailure({ msg: msg })))
    ))
  ));

  paymentStatusSum$ = createEffect(() => this.actions$.pipe(
    ofType(paymentStatusSum),
    mergeMap(({ params }) => this.autoShipService.paymentStatusSum(params).pipe(
      map(res => paymentStatusSumSuccess({ autoShip: res })),
      catchError(msg => of(paymentStatusSumFailure({ msg: msg })))
    ))
  ));
};
