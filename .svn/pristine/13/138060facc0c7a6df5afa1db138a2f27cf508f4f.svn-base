import { createAction, props } from '@ngrx/store';
import { OrderProductReportModel } from '@app/models/myoffice/report/order-product.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

// order product report
export const loadOrderProductReport = createAction(
  "[Report API] load order product report",
  props<{ ordNo: string }>()
);

export const loadOrderProductReportSuccess = createAction(
  "[Report API] load order product report success",
  props<{ ordPdts: OrderProductReportModel[] }>()
);

export const loadOrderProductReportFailure = createAction(
  "[Report API] load order product report failure",
  props<{ msg: any }>()
);

// order mst report
export const loadOrderMstReport = createAction(
  "[Report API] load order mst report",
  props<{ ordNo: string }>()
);

export const loadOrderMstReportSuccess = createAction(
  "[Report API] load order mst report success",
  props<{ ordMst: OrderMstModel }>()
);

export const loadOrderMstReportFailure = createAction(
  "[Report API] load order mst report failure",
  props<{ msg: any }>()
);

// order info
export const loadOrderInfoReport = createAction(
  "[Order API] load order info report",
  props<{ params: any }>()
);

export const loadOrderInfoReportSuccess = createAction(
  "[Order API] load order info report success",
  props<{ items: OrderMstModel[] }>()
);

export const loadOrderInfoReportFailure = createAction(
  "[Order API] load order info report failure",
  props<{ msg: any }>()
);