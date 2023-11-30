import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderReportService } from '@app/services/myoffice/report/order-report.service';
import { 
  loadOrderInfoReport, 
  loadOrderInfoReportFailure, 
  loadOrderInfoReportSuccess, 
  loadOrderMstReport, 
  loadOrderMstReportFailure, 
  loadOrderMstReportSuccess, 
  loadOrderProductReport, 
  loadOrderProductReportFailure, 
  loadOrderProductReportSuccess 
} from '@app/actions/myoffice/report/order-report.action';
import { OrderInfoService } from '@app/services/myoffice/order/order-info.service';

@Injectable()
export class OrderReportEffect {

  constructor(
    private _actions$: Actions,
    private orderReportService: OrderReportService,
    private orderInfoService: OrderInfoService
  ) { }

  loadOrderProductReport$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderProductReport),
    mergeMap(({ ordNo }) => this.orderReportService.getOrderProductByOrderNo(ordNo).pipe(
      map(res => loadOrderProductReportSuccess({ ordPdts: res })),
      catchError(res => of(loadOrderProductReportFailure({ msg: res })))
    ))
  ));

  loadOrderMstReport$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderMstReport),
    mergeMap(({ ordNo }) => this.orderReportService.getOrderMstByOrderNo(ordNo).pipe(
      map(res => loadOrderMstReportSuccess({ ordMst: res })),
      catchError(res => of(loadOrderMstReportFailure({ msg: res })))
    ))
  ));

  loadOrderInfoReport$ = createEffect(() => this._actions$.pipe(
    ofType(loadOrderInfoReport),
    mergeMap(({ params }) => this.orderInfoService.getOrderInfo(params).pipe(
      map(res => loadOrderInfoReportSuccess({ items: res })),
      catchError(res => of(loadOrderInfoReportFailure({ msg: res })))
    ))
  ));
}