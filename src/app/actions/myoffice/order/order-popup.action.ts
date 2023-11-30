import { OrderPopupModel } from '@app/models/myoffice/order/order-popup.model';
import { createAction, props } from '@ngrx/store';

// search
export const searchOrderPopup = createAction(
  "[Order API] search order popup",
  props<{ params: any }>()
);

export const searchOrderPopupSuccess = createAction(
  "[Order API] search order popup success",
  props<{ orderItems: OrderPopupModel[] }>()
);

export const searchOrderPopupFailure = createAction(
  "[Order API] search order popup failure",
  props<{ msg: any }>()
);

// count
export const countOrderPopup = createAction(
  "[Order API] count order popup",
  props<{ params: any }>()
);

export const countOrderPopupSuccess = createAction(
  "[Order API] count order popup success",
  props<{ total: Number }>()
);

export const countOrderPopupFailure = createAction(
  "[Order API] count order popup failure",
  props<{ msg: any }>()
);