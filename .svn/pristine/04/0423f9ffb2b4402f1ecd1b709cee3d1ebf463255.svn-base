import { createAction, props } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderWithdrawalPdt } from '@app/models/myoffice/report/order-withdrawal-product.model';

// order mst withdrawal
export const loadOrderMstWithdrawal = createAction(
  "[Report API] load order mst withdrawal report",
  props<{ ordNo: string }>()
);

export const loadOrderMstWithdrawalSuccess = createAction(
  "[Report API] load order mst withdrawal report success",
  props<{ ordMst: OrderMstModel }>()
);

export const loadOrderMstWithdrawalFailure = createAction(
  "[Report API] load order mst withdrawal report failure",
  props<{ msg: any }>()
);

// list order product withdrawal
export const loadListOrderPdtWithdrawal = createAction(
  "[Report API] load list order product withdrawal report",
  props<{ ordNo: string }>()
);

export const loadListOrderPdtWithdrawalSuccess = createAction(
  "[Report API] load list order product withdrawal report success",
  props<{ ordPdts: OrderWithdrawalPdt[] }>()
);

export const loadListOrderPdtWithdrawalFailure = createAction(
  "[Report API] load list order product withdrawal report failure",
  props<{ msg: any }>()
);

// sum order product withdrawal
export const loadSumOrderPdtWithdrawal = createAction(
  "[Report API] load sum order product withdrawal report",
  props<{ ordNo: string }>()
);

export const loadSumOrderPdtWithdrawalSuccess = createAction(
  "[Report API] load sum order product withdrawal report success",
  props<{ ordPdt: OrderWithdrawalPdt }>()
);

export const loadSumOrderPdtWithdrawalFailure = createAction(
  "[Report API] load sum order product withdrawal report failure",
  props<{ msg: any }>()
);