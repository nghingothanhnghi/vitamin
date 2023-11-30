import { createAction, props } from '@ngrx/store';

import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';

// search
export const searchOrderProduct = createAction(
  "[Order API] search order product",
  props<{ params: any }>()
);

export const searchOrderProductSuccess = createAction(
  "[Order API] search order product succcess",
  props<{ ordPdts: OrderPdtModel[] }>()
);

export const searchOrderProductFailure = createAction(
  "[Order API] search order product failure",
  props<{ msg: any }>()
);

// count
export const countOrderProduct = createAction(
  "[Order API] count order product",
  props<{ params: any }>()
);

export const countOrderProductSuccess = createAction(
  "[Order API] count order product succcess",
  props<{ total: Number }>()
);

export const countOrderProductFailure = createAction(
  "[Order API] count order product failure",
  props<{ msg: any }>()
);

// sum
export const sumOrderProduct = createAction(
  "[Order API] sum order product",
  props<{ params: any }>()
);

export const sumOrderProductSuccess = createAction(
  "[Order API] sum order product succcess",
  props<{ ordPdt: OrderPdtModel }>()
);

export const sumOrderProductFailure = createAction(
  "[Order API] sum order product failure",
  props<{ msg: any }>()
);