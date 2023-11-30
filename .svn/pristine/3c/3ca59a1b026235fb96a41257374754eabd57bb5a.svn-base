import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderInfoService } from '@app/services/myoffice/order/order-info.service';
import {
  loadDeliOrdFailure,
  loadDeliOrdSuccess,
  loadOrderInfo, 
  loadOrderInfoFailure, 
  loadOrderInfoSuccess, 
  loadOrderPay, 
  loadOrderPayFailure, 
  loadOrderPaySuccess, 
  loadOrderProduct, 
  loadOrderProductFailure, 
  loadOrderProductSuccess, 
  loadSumOrderProduct,
  loadSumOrderProductFailure,
  loadSumOrderProductSuccess
} from '@app/actions/myoffice/order/order-detail-inquiry.action';

@Injectable()
export class OrderDetailInquiryEffect {

  constructor(
    private _actions$: Actions,
    private orderInfoService: OrderInfoService
  ) { }

  loadOrderInfo$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderInfo),
    mergeMap(({ params }) => this.orderInfoService.getOrderInfo(params).pipe(
      map(res => loadOrderInfoSuccess({ items: res })),
      catchError(msg => of(loadOrderInfoFailure({ msg: msg })))
    ))
  ));

  loadOrderPay$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderPay),
    mergeMap(({ params }) => this.orderInfoService.getInfoPay(params).pipe(
      map(res => loadOrderPaySuccess({ items: res })),
      catchError(msg => of(loadOrderPayFailure({ msg: msg })))
    ))
  ));

  loadOrderProduct$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderProduct),
    mergeMap(({ orderNo }) => this.orderInfoService.getInfoPdt(orderNo).pipe(
      map(res => loadOrderProductSuccess({ items: res })),
      catchError(msg => of(loadOrderProductFailure({ msg: msg })))
    ))
  ));

  loadSumOrderProduct$ = createEffect(() => this._actions$.pipe(
    ofType(loadSumOrderProduct),
    mergeMap(({ orderNo }) => this.orderInfoService.getSumInfoPdt(orderNo).pipe(
      map(res => loadSumOrderProductSuccess({ item: res })),
      catchError(msg => of(loadSumOrderProductFailure({ msg: msg })))
    ))
  ));

  loadDeliOrd$ = createEffect(() => this._actions$.pipe(
    ofType(loadSumOrderProduct),
    mergeMap(({ orderNo }) => this.orderInfoService.getDeliOrd(orderNo).pipe(
      map(res => loadDeliOrdSuccess({ items: res })),
      catchError(msg => of(loadDeliOrdFailure({ msg: msg })))
    ))
  ));
}