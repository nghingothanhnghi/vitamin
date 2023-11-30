import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { BenefitAccountingInquiryService } from '@app/services/myoffice/benefit/benefit-accounting-inquiry.service';
import { countBenefitAccountingInquiry, countBenefitAccountingInquiryFailure, countBenefitAccountingInquirySuccess, searchBenefitAccountingInquiry, searchBenefitAccountingInquiryFailure, searchBenefitAccountingInquirySuccess, sumBenefitAccountingInquiry, sumBenefitAccountingInquiryFailure, sumBenefitAccountingInquirySuccess } from '@app/actions/myoffice/benefit/benefit-accounting-inquiry.action';

@Injectable()
export class BenefitAccountingInquiryEffect {

  constructor(
    private actions$: Actions,
    private benefitAccountingInquiryService: BenefitAccountingInquiryService
  ) { }

  searchBenefitAccountingInquiry$ = createEffect(() => this.actions$.pipe(
    ofType(searchBenefitAccountingInquiry),
    mergeMap(({ params }) => this.benefitAccountingInquiryService.searchBenefitAccountingInquiry(params).pipe(
      map(res => searchBenefitAccountingInquirySuccess({ benefit: res })),
      catchError(msg => of(searchBenefitAccountingInquiryFailure({ msg: msg })))
    ))
  ));

  countBenefitAccountingInquiry$ = createEffect(() => this.actions$.pipe(
    ofType(countBenefitAccountingInquiry),
    mergeMap(({ params }) => this.benefitAccountingInquiryService.countBenefitAccountingInquiry(params).pipe(
      map(res => countBenefitAccountingInquirySuccess({ total: res })),
      catchError(msg => of(countBenefitAccountingInquiryFailure({ msg: msg })))
    ))
  ));

  sumBenefitAccountingInquiry$ = createEffect(() => this.actions$.pipe(
    ofType(sumBenefitAccountingInquiry),
    mergeMap(({ params }) => this.benefitAccountingInquiryService.sumBenefitAccountingInquiry(params).pipe(
      map(res => sumBenefitAccountingInquirySuccess({ benefit: res })),
      catchError(msg => of(sumBenefitAccountingInquiryFailure({ msg: msg })))
    ))
  ));

};
