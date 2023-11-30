import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { BenefitRemittanceDetailsService } from '@app/services/myoffice/benefit/benefit-remittance-details.service';
import { countBenefitRemittanceDetails, countBenefitRemittanceDetailsFailure, countBenefitRemittanceDetailsSuccess, searchBenefitRemittanceDetails, searchBenefitRemittanceDetailsFailure, searchBenefitRemittanceDetailsSuccess, sumBenefitRemittanceDetails, sumBenefitRemittanceDetailsFailure, sumBenefitRemittanceDetailsSuccess } from '@app/actions/myoffice/benefit/benefit-remittance-details.action';

@Injectable()
export class BenefitRemittanceDetailsEffect {

  constructor(
    private actions$: Actions,
    private benefitRemittanceDetailsService: BenefitRemittanceDetailsService
  ) { }

  searchBenefitRemittanceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(searchBenefitRemittanceDetails),
    mergeMap(({ params }) => this.benefitRemittanceDetailsService.searchBenefitRemittanceDetails(params).pipe(
      map(res => searchBenefitRemittanceDetailsSuccess({ benefit: res })),
      catchError(msg => of(searchBenefitRemittanceDetailsFailure({ msg: msg })))
    ))
  ));

  countBenefitRemittanceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(countBenefitRemittanceDetails),
    mergeMap(({ params }) => this.benefitRemittanceDetailsService.countBenefitRemittanceDetails(params).pipe(
      map(res => countBenefitRemittanceDetailsSuccess({ total: res })),
      catchError(msg => of(countBenefitRemittanceDetailsFailure({ msg: msg })))
    ))
  ));

  sumBenefitRemittanceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(sumBenefitRemittanceDetails),
    mergeMap(({ params }) => this.benefitRemittanceDetailsService.sumBenefitRemittanceDetails(params).pipe(
      map(res => sumBenefitRemittanceDetailsSuccess({ benefit: res })),
      catchError(msg => of(sumBenefitRemittanceDetailsFailure({ msg: msg })))
    ))
  ));

};
