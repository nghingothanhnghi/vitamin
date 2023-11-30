import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { countFaq, countFaqFailure, countFaqSuccess, loadCodes, loadCodesSuccess, searchFaq, searchFaqFailure, searchFaqSuccess } from '@app/actions/myoffice/notice/faq.action';
import { FaqService } from '@app/services/myoffice/notice/faq.service';

@Injectable()
export class FaqEffect {

  constructor(
    private actions$: Actions,
    private faqService: FaqService
  ) { }

  searchFaq$ = createEffect(() => this.actions$.pipe(
    ofType(searchFaq),
    mergeMap(({ params }) => this.faqService.search(params).pipe(
      map(res => searchFaqSuccess({ faq: res })),
      catchError(msg => of(searchFaqFailure({ msg: msg })))
    ))
  ));

  countFaq$ = createEffect(() => this.actions$.pipe(
    ofType(countFaq),
    mergeMap(({ params }) => this.faqService.getCount(params).pipe(
      map(res => countFaqSuccess({ total: res })),
      catchError(msg => of(countFaqFailure({ msg: msg })))
    ))
  ));

  codeTiles$ = createEffect(() => this.actions$.pipe(
    ofType(loadCodes),
    mergeMap(({ }) => this.faqService.getCodes("F").pipe(
      map(res => loadCodesSuccess({ codes: res })),
      catchError(msg => of(countFaqFailure({ msg: msg })))
    ))
  ));

};
