import { createAction, props } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { OrderMoneyModel } from '@app/models/myoffice/order/order-money.model';

// order info
export const loadOrderInfo = createAction(
  "[Order API] load order info",
  props<{ params: any }>()
);

export const loadOrderInfoSuccess = createAction(
  "[Order API] load order info success",
  props<{ items: OrderMstModel[] }>()
);

export const loadOrderInfoFailure = createAction(
  "[Order API] load order info failure",
  props<{ msg: any }>()
);

// order pay
export const loadOrderPay = createAction(
  "[Order API] load order pay",
  props<{ params: any }>()
);

export const loadOrderPaySuccess = createAction(
  "[Order API] load order pay success",
  props<{ items: OrderMoneyModel[] }>()
);

export const loadOrderPayFailure = createAction(
  "[Order API] load order pay failure",
  props<{ msg: any }>()
);

// order product
export const loadOrderProduct = createAction(
  "[Order API] load order product",
  props<{ orderNo: string }>()
);

export const loadOrderProductSuccess = createAction(
  "[Order API] load order product success",
  props<{ items: OrderPdtModel[] }>()
);

export const loadOrderProductFailure = createAction(
  "[Order API] load order product failure",
  props<{ msg: any }>()
);

// sum order product
export const loadSumOrderProduct = createAction(
  "[Order API] sum order product info",
  props<{ orderNo: string }>()
);

export const loadSumOrderProductSuccess = createAction(
  "[Order API] sum order product info success",
  props<{ item: OrderPdtModel }>()
);

export const loadSumOrderProductFailure = createAction(
  "[Order API] sum order product info failure",
  props<{ msg: any }>()
);

// load deli ord
export const loadDeliOrd = createAction(
  "[Order API] load deli ord",
  props<{ orderNo: string }>()
);

export const loadDeliOrdSuccess = createAction(
  "[Order API] load deli ord success",
  props<{ items: OrderMstModel[] }>()
);

export const loadDeliOrdFailure = createAction(
  "[Order API] load deli ord failure",
  props<{ msg: any }>()
);