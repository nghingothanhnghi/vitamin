import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BenefitDetailsInquiryService } from '@app/services/myoffice/benefit/benefit-details-inquiry.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { countBenefit, countBenefitFailure, countBenefitSuccess, loadTitlePay, loadTitlePayFailure, loadTitlePaySuccess, searchBenefit, searchBenefitFailure, searchBenefitSuccess, sumBenefit, sumBenefitFailure, sumBenefitSuccess } from '@app/actions/myoffice/benefit/benefit-details-inquiry.action';

@Injectable()
export class BenefitDetailsInquiryEffect {

  constructor(
    private actions$: Actions,
    private benefitDetailsInquiryService: BenefitDetailsInquiryService
  ) { }

  getTiltePay$ = createEffect(() => this.actions$.pipe(
    ofType(loadTitlePay),
    mergeMap(({ params }) => this.benefitDetailsInquiryService.getTiltePay(params).pipe(
      map(res => loadTitlePaySuccess({ benefit: res })),
      catchError(msg => of(loadTitlePayFailure({ msg: msg })))
    ))
  ));  

  searchBenefit$ = createEffect(() => this.actions$.pipe(
    ofType(searchBenefit),
    mergeMap(({ params }) => this.benefitDetailsInquiryService.searchBenefitDetailsInquiry(params).pipe(
      map(res => searchBenefitSuccess({ benefit: res })),
      catchError(msg => of(searchBenefitFailure({ msg: msg })))
    ))
  ));

  countBenefit$ = createEffect(() => this.actions$.pipe(
    ofType(countBenefit),
    mergeMap(({ params }) => this.benefitDetailsInquiryService.countBenefitDetailsInquiry(params).pipe(
      map(res => countBenefitSuccess({ total: res })),
      catchError(msg => of(countBenefitFailure({ msg: msg })))
    ))
  ));

  sumBenefit$ = createEffect(() => this.actions$.pipe(
    ofType(sumBenefit),
    mergeMap(({ params }) => this.benefitDetailsInquiryService.sumBenefitDetailsInquiry(params).pipe(
      map(res => sumBenefitSuccess({ benefit: res })),
      catchError(msg => of(sumBenefitFailure({ msg: msg })))
    ))
  ));

};
