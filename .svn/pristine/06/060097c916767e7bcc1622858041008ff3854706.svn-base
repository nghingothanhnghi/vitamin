import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { BenefitSponsorshipDetailsService } from '@app/services/myoffice/benefit/benefit-sponsorship-details.service';
import { countBenefitSponsorshipDetails, countBenefitSponsorshipDetailsFailure, countBenefitSponsorshipDetailsSuccess, searchBenefitSponsorshipDetails, searchBenefitSponsorshipDetailsFailure, searchBenefitSponsorshipDetailsSuccess, sumBenefitSponsorshipDetails, sumBenefitSponsorshipDetailsFailure, sumBenefitSponsorshipDetailsSuccess } from '@app/actions/myoffice/benefit/benefit-sponsorship-details.action';

@Injectable()
export class BenefitSponsorshipDetailsEffect {

  constructor(
    private actions$: Actions,
    private benefitSponsorshipDetailsService: BenefitSponsorshipDetailsService
  ) { }

  searchBenefitSponsorshipDetails$ = createEffect(() => this.actions$.pipe(
    ofType(searchBenefitSponsorshipDetails),
    mergeMap(({ params }) => this.benefitSponsorshipDetailsService.searchBenefitSponsorshipDetails(params).pipe(
      map(res => searchBenefitSponsorshipDetailsSuccess({ benefit: res })),
      catchError(msg => of(searchBenefitSponsorshipDetailsFailure({ msg: msg })))
    ))
  ));

  countBenefitSponsorshipDetails$ = createEffect(() => this.actions$.pipe(
    ofType(countBenefitSponsorshipDetails),
    mergeMap(({ params }) => this.benefitSponsorshipDetailsService.countBenefitSponsorshipDetails(params).pipe(
      map(res => countBenefitSponsorshipDetailsSuccess({ total: res })),
      catchError(msg => of(countBenefitSponsorshipDetailsFailure({ msg: msg })))
    ))
  ));

  sumBenefitSponsorshipDetails$ = createEffect(() => this.actions$.pipe(
    ofType(sumBenefitSponsorshipDetails),
    mergeMap(({ params }) => this.benefitSponsorshipDetailsService.sumBenefitSponsorshipDetails(params).pipe(
      map(res => sumBenefitSponsorshipDetailsSuccess({ benefit: res })),
      catchError(msg => of(sumBenefitSponsorshipDetailsFailure({ msg: msg })))
    ))
  ));

};
