import { createAction, props } from '@ngrx/store';

import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';

// search
export const searchOrderMonthly = createAction(
  "[Order API] search order monthly",
  props<{ params: any }>()
);

export const searchOrderMonthlySuccess = createAction(
  "[Order API] search order monthly success",
  props<{ orderItems: OrderMonthlyModel[] }>()
);

export const searchOrderMonthlyFailure = createAction(
  "[Order API] search order monthly failure",
  props<{ msg: any }>()
);

// count
export const countOrderMonthly = createAction(
  "[Order API] count order monthly",
  props<{ params: any }>()
);

export const countOrderMonthlySuccess = createAction(
  "[Order API] count order monthly success",
  props<{ total: Number }>()
);

export const countOrderMonthlyFailure = createAction(
  "[Order API] count order monthly failure",
  props<{ msg: any }>()
);

// sum
export const sumOrderMonthly = createAction(
  "[Order API] sum order monthly",
  props<{ params: any }>()
);

export const sumOrderMonthlySuccess = createAction(
  "[Order API] sum order monthly success",
  props<{ orderSum: OrderMonthlyModel }>()
);

export const sumOrderMonthlyFailure = createAction(
  "[Order API] sum order monthly failure",
  props<{ msg: any }>()
);