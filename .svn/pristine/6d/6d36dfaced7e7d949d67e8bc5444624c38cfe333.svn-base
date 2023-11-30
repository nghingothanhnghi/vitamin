import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { countWitholdingTax, countWitholdingTaxFailure, countWitholdingTaxSuccess, detailWitholdingTax, detailWitholdingTaxFailure, detailWitholdingTaxSuccess, searchWitholdingTax, searchWitholdingTaxFailure, searchWitholdingTaxSuccess, sumDetailWitholdingTax, sumDetailWitholdingTaxFailure, sumDetailWitholdingTaxSuccess, sumWitholdingTax, sumWitholdingTaxFailure, sumWitholdingTaxSuccess, userWitholdingTax, userWitholdingTaxFailure, userWitholdingTaxSuccess } from '@app/actions/myoffice/benefit/witholding-tax.action';
import { WitholdingTaxService } from '@app/services/myoffice/benefit/witholding-tax.service';

@Injectable()
export class WitholdingTaxEffect {

  constructor(
    private actions$: Actions,
    private witholdingTaxService: WitholdingTaxService
  ) { }

  searchWitholdingTax$ = createEffect(() => this.actions$.pipe(
    ofType(searchWitholdingTax),
    mergeMap(({ params }) => this.witholdingTaxService.searchWitholdingTax(params).pipe(
      map(res => searchWitholdingTaxSuccess({ benefit: res })),
      catchError(msg => of(searchWitholdingTaxFailure({ msg: msg })))
    ))
  ));

  countWitholdingTax$ = createEffect(() => this.actions$.pipe(
    ofType(countWitholdingTax),
    mergeMap(({ params }) => this.witholdingTaxService.countWitholdingTax(params).pipe(
      map(res => countWitholdingTaxSuccess({ total: res })),
      catchError(msg => of(countWitholdingTaxFailure({ msg: msg })))
    ))
  ));

  sumWitholdingTax$ = createEffect(() => this.actions$.pipe(
    ofType(sumWitholdingTax),
    mergeMap(({ params }) => this.witholdingTaxService.sumWitholdingTax(params).pipe(
      map(res => sumWitholdingTaxSuccess({ benefit: res })),
      catchError(msg => of(sumWitholdingTaxFailure({ msg: msg })))
    ))
  ));

 // Start Report
  detailWitholdingTax$ = createEffect(() => this.actions$.pipe(
    ofType(detailWitholdingTax),
    mergeMap(({ params }) => this.witholdingTaxService.detailWitholdingTax(params).pipe(
      map(res => detailWitholdingTaxSuccess({ benefit: res })),
      catchError(msg => of(detailWitholdingTaxFailure({ msg: msg })))
    ))
  ));


  sumDetailWitholdingTax$ = createEffect(() => this.actions$.pipe(
    ofType(sumDetailWitholdingTax),
    mergeMap(({ params }) => this.witholdingTaxService.sumDetailWitholdingTax(params).pipe(
      map(res => sumDetailWitholdingTaxSuccess({ benefit: res })),
      catchError(msg => of(sumDetailWitholdingTaxFailure({ msg: msg })))
    ))
  ));

  userWitholdingTax$ = createEffect(() => this.actions$.pipe(
    ofType(userWitholdingTax),
    mergeMap(({ params }) => this.witholdingTaxService.userWitholdingTax(params).pipe(
      map(res => userWitholdingTaxSuccess({ benefit: res })),
      catchError(msg => of(userWitholdingTaxFailure({ msg: msg })))
    ))
  ));

 // end Report

};
