import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { BenefitAnalysisService } from '@app/services/myoffice/benefit/benefit-analysis.service';
import { getChart1, getChart1Failure, getChart1Success, getChart3, getChart3Failure, getChart3Success, searchBenefitAnalysis, searchBenefitAnalysisFailure, searchBenefitAnalysisSuccess, sumBenefitAnalysis, sumBenefitAnalysisFailure, sumBenefitAnalysisSuccess } from '@app/actions/myoffice/benefit/benefit-analysis.action';

@Injectable()
export class BenefitAnalysisEffect {

  constructor(
    private actions$: Actions,
    private benefitAnalysisService: BenefitAnalysisService
  ) { }

  searchBenefitAnalysis$ = createEffect(() => this.actions$.pipe(
    ofType(searchBenefitAnalysis),
    mergeMap(({ params }) => this.benefitAnalysisService.searchBenefitAnalysisTax(params).pipe(
      map(res => searchBenefitAnalysisSuccess({ benefit: res })),
      catchError(msg => of(searchBenefitAnalysisFailure({ msg: msg })))
    ))
  ));

  sumBenefitAnalysis$ = createEffect(() => this.actions$.pipe(
    ofType(sumBenefitAnalysis),
    mergeMap(({ params }) => this.benefitAnalysisService.sumBenefitAnalysisTax(params).pipe(
      map(res => sumBenefitAnalysisSuccess({ benefit: res })),
      catchError(msg => of(sumBenefitAnalysisFailure({ msg: msg })))
    ))
  ));

  getChart1$ = createEffect(() => this.actions$.pipe(
    ofType(getChart1),
    mergeMap(({ params }) => this.benefitAnalysisService.getChart1(params).pipe(
      map(res => getChart1Success({ benefit: res })),
      catchError(msg => of(getChart1Failure({ msg: msg })))
    ))
  ));

  getChart2$ = createEffect(() => this.actions$.pipe(
    ofType(getChart3),
    mergeMap(({ params }) => this.benefitAnalysisService.getChart3(params).pipe(
      map(res => getChart3Success({ benefit: res })),
      catchError(msg => of(getChart3Failure({ msg: msg })))
    ))
  ));

};
