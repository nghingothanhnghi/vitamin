import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BenefitCalendarService } from '@app/services/myoffice/benefit/benefit-calendar.service';
import { searchBenefitCalendar, searchBenefitCalendarFailure, searchBenefitCalendarSuccess } from '@app/actions/myoffice/benefit/benefit-calendar.action';


@Injectable()
export class BenefitCalendarEffect {

  constructor(
    private actions$: Actions,
    private benefitCalendarService: BenefitCalendarService
  ) { }

  searchBenefitCalendar$ = createEffect(() => this.actions$.pipe(
    ofType(searchBenefitCalendar),
    mergeMap(({ params }) => this.benefitCalendarService.searchBenefitCalendar(params).pipe(
      map(res => searchBenefitCalendarSuccess({ benefit: res })),
      catchError(msg => of(searchBenefitCalendarFailure({ msg: msg })))
    ))
  ));

};
