import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InquiryPerformanceSearchService } from '@app/services/myoffice/order/inquiry-performance.service';
import { searchInquiryPerformanceA, searchInquiryPerformanceB, searchInquiryPerformanceFailureA, searchInquiryPerformanceFailureB, searchInquiryPerformanceSuccessA, searchInquiryPerformanceSuccessB, sumInquiryPerformanceA, sumInquiryPerformanceB, sumInquiryPerformanceFailureA, sumInquiryPerformanceFailureB, sumInquiryPerformanceSuccessA, sumInquiryPerformanceSuccessB } from '@app/actions/myoffice/order/inquiry-performance-search.action';

@Injectable()
export class InquiryPerformanceSearchEffect {

  constructor(
    private _actions$: Actions,
    private inquiryPerSearchService: InquiryPerformanceSearchService
  ) { }

  searchInquiryPerformanceA$ = createEffect(() => this._actions$.pipe(
    ofType(searchInquiryPerformanceA),
    mergeMap(({ params }) => this.inquiryPerSearchService.searchInquiryPer(params).pipe(
      map(res => searchInquiryPerformanceSuccessA({ ordersA: res })),
      catchError(msg => of(searchInquiryPerformanceFailureA({ msg: msg })))
    ))
  ));

  sumInquiryPerA$ = createEffect(() => this._actions$.pipe(
    ofType(sumInquiryPerformanceA),
    mergeMap(({ params }) => this.inquiryPerSearchService.sumInquiryPer(params).pipe(
      map(res => sumInquiryPerformanceSuccessA({ orderA: res })),
      catchError(msg => of(sumInquiryPerformanceFailureA({ msg: msg })))
    ))
  ));

  searchInquiryPerformanceB$ = createEffect(() => this._actions$.pipe(
    ofType(searchInquiryPerformanceB),
    mergeMap(({ params }) => this.inquiryPerSearchService.searchInquiryPer(params).pipe(
      map(res => searchInquiryPerformanceSuccessB({ ordersB: res })),
      catchError(msg => of(searchInquiryPerformanceFailureB({ msg: msg })))
    ))
  ));

  sumInquiryPerB$ = createEffect(() => this._actions$.pipe(
    ofType(sumInquiryPerformanceB),
    mergeMap(({ params }) => this.inquiryPerSearchService.sumInquiryPer(params).pipe(
      map(res => sumInquiryPerformanceSuccessB({ orderB: res })),
      catchError(msg => of(sumInquiryPerformanceFailureB({ msg: msg })))
    ))
  ));
}