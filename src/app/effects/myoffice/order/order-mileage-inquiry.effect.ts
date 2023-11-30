import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderMileageInquiryService } from '@app/services/myoffice/order/order-mileage-inquiry.service';
import { countOrderMileageInquiry, countOrderMileageInquiryFailure, countOrderMileageInquirySuccess, searchOrderMileageInquiry, searchOrderMileageInquiryFailure, searchOrderMileageInquirySuccess, sumOrderMileageInquiry, sumOrderMileageInquiryFailure, sumOrderMileageInquirySuccess } from '@app/actions/myoffice/order/order-mileage-inquiry.action';

@Injectable()
export class OrderMileageInquiryEffect {
  
  constructor(
    private _actions$: Actions,
    private orderMileageInquiryService: OrderMileageInquiryService
  ) { }

  searchOrderMileageInquiry$ = createEffect(() => this._actions$.pipe(
    ofType(searchOrderMileageInquiry),
    mergeMap(({ params }) => this.orderMileageInquiryService.searchOrderMileageInquiry(params).pipe(
      map(res => searchOrderMileageInquirySuccess({ items: res })),
      catchError(msg => of(searchOrderMileageInquiryFailure({ msg: msg })))
    ))
  ));

  countOrderMileageInquiry$ = createEffect(() => this._actions$.pipe(
    ofType(countOrderMileageInquiry),
    mergeMap(({ params }) => this.orderMileageInquiryService.countOrderMileageInquiry(params).pipe(
      map(res => countOrderMileageInquirySuccess({ total: res })),
      catchError(msg => of(countOrderMileageInquiryFailure({ msg: msg })))
    ))
  ));

  sumOrderMileageInquiry$ = createEffect(() => this._actions$.pipe(
    ofType(sumOrderMileageInquiry),
    mergeMap(({ params }) => this.orderMileageInquiryService.sumOrderMileageInquiry(params).pipe(
      map(res => sumOrderMileageInquirySuccess({ item: res })),
      catchError(msg => of(sumOrderMileageInquiryFailure({ msg: msg })))
    ))
  ));
}