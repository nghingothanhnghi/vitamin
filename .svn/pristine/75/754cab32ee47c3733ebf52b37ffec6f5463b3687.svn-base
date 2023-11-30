import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ADORegisterService } from '@app/services/myoffice/auto-ship/ado-register.service';
import { 
  countADOProducts, 
  countADOProductsFailure, 
  countADOProductsSuccess, 
  countTotalAdoCancelBetween90Days, 
  countTotalAdoCancelBetween90DaysFailre, 
  countTotalAdoCancelBetween90DaysSuccess, 
  countTotalOrdered, 
  countTotalOrderedFailre, 
  countTotalOrderedSuccess, 
  loadAdmitDate, 
  loadAdmitDateFailure, 
  loadAdmitDateSuccess, 
  loadAdoInfo, 
  loadAdoInfoFailure, 
  loadAdoInfoSuccess, 
  loadADOProducts, 
  loadADOProductsFailure, 
  loadADOProductsSuccess, 
  loadDeliInfo, 
  loadDeliInfoFailure, 
  loadDeliInfoSuccess, 
  registerADO,
  registerADOSuccess
} from '@app/actions/myoffice/auto-ship/ado-register.action';

@Injectable()
export class ADORegisterEffect {

  constructor(
    private _actions$: Actions,
    private adoRegisterService: ADORegisterService
  ) { }

  loadADOProducts$ = createEffect(() => this._actions$.pipe(
    ofType(loadADOProducts),
    mergeMap(({ params }) => this.adoRegisterService.loadADOProducts(params).pipe(
      map(res => loadADOProductsSuccess({ products: res })),
      catchError(res => of(loadADOProductsFailure({ msg: res })))
    ))
  ));

  countADOProducts$ = createEffect(() => this._actions$.pipe(
    ofType(countADOProducts),
    mergeMap(({ params }) => this.adoRegisterService.countADOProduct(params).pipe(
      map(res => countADOProductsSuccess({ total: res })),
      catchError(res => of(countADOProductsFailure({ msg: res })))
    ))
  ));

  loadAdmitDate$ = createEffect(() => this._actions$.pipe(
    ofType(loadAdmitDate),
    mergeMap(({ yyyymm }) => this.adoRegisterService.loadAdmitDate(yyyymm).pipe(
      map(res => loadAdmitDateSuccess({ dates: res })),
      catchError(res => of(loadAdmitDateFailure({ msg: res })))
    ))
  ));

  loadAdoInfo$ = createEffect(() => this._actions$.pipe(
    ofType(loadAdoInfo),
    mergeMap(({ userid }) => this.adoRegisterService.loadAdoInfo(userid).pipe(
      map(res => loadAdoInfoSuccess({ info: res })),
      catchError(res => of(loadAdoInfoFailure({ msg: res })))
    ))
  ));

  loadDeliInfo$ = createEffect(() => this._actions$.pipe(
    ofType(loadDeliInfo),
    mergeMap(() => this.adoRegisterService.loadDeliInfo().pipe(
      map(res => loadDeliInfoSuccess({ info: res })),
      catchError(res => of(loadDeliInfoFailure({ msg: res })))
    ))
  ));

  registerADO$ = createEffect(() => this._actions$.pipe(
    ofType(registerADO),
    mergeMap(({ data }) => this.adoRegisterService.registerADO(data).pipe(
      map(res => registerADOSuccess({ result: res })),
      catchError(res => of(loadDeliInfoFailure({ msg: res })))
    ))
  ));

  countTotalOrdered$ = createEffect(() => this._actions$.pipe(
    ofType(countTotalOrdered),
    mergeMap(({ userid }) => this.adoRegisterService.countTotalOrdered(userid).pipe(
      map(res => countTotalOrderedSuccess({ total: res })),
      catchError(res => of(countTotalOrderedFailre({ msg: res })))
    ))
  ));

  countTotalAdoCancelBetween90Days$ = createEffect(() => this._actions$.pipe(
    ofType(countTotalAdoCancelBetween90Days),
    mergeMap(({ userid }) => this.adoRegisterService.countTotalAdoCancelBetween90Days(userid).pipe(
      map(res => countTotalAdoCancelBetween90DaysSuccess({ total: res })),
      catchError(res => of(countTotalAdoCancelBetween90DaysFailre({ msg: res })))
    ))
  ))
};
