import { createAction, props } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

// search
export const searchOrder = createAction(
  "[Order API] search order",
  props<{ params: any }>()
);

export const searchOrderSuccess = createAction(
  "[Order API] search order success",
  props<{ orders: OrderMstModel[] }>()
);

export const searchOrderFailure = createAction(
  "[Order API] search order failure",
  props<{ msg: any }>()
);

// count
export const countOrder = createAction(
  "[Order API] count order",
  props<{ params: any }>()
);

export const countOrderSuccess = createAction(
  "[Order API] count order success",
  props<{ total: Number }>()
);

export const countOrderFailure = createAction(
  "[Order API] count order failure",
  props<{ msg: any }>()
);

// sum
export const sumOrder = createAction(
  "[Order API] sum order",
  props<{ params: any }>()
);

export const sumOrderSuccess = createAction(
  "[Order API] sum order success",
  props<{ order: OrderMstModel }>()
);

export const sumOrderFailure = createAction(
  "[Order API] sum order failure",
  props<{ msg: any }>()
);