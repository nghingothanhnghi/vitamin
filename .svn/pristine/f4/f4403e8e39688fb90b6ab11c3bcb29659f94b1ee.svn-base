import { createAction, props } from '@ngrx/store';

import { OrderMileageInquiryModel } from '@app/models/myoffice/order/order-mileage-inquiry.model';

// search
export const searchOrderMileageInquiry = createAction(
  "[Order API] search order mileage inquiry",
  props<{ params: any }>()
);

export const searchOrderMileageInquirySuccess = createAction(
  "[Order API] search order mileage inquiry success",
  props<{ items: OrderMileageInquiryModel[] }>()
);

export const searchOrderMileageInquiryFailure = createAction(
  "[Order API] search order mileage inquiry failure",
  props<{ msg: any }>()
);

// count
export const countOrderMileageInquiry = createAction(
  "[Order API] count order mileage inquiry",
  props<{ params: any }>()
);

export const countOrderMileageInquirySuccess = createAction(
  "[Order API] count order mileage inquiry success",
  props<{ total: Number }>()
);

export const countOrderMileageInquiryFailure = createAction(
  "[Order API] search order mileage inquiry failure",
  props<{ msg: any }>()
);

// sum
export const sumOrderMileageInquiry = createAction(
  "[Order API] sum order mileage inquiry",
  props<{ params: any }>()
);

export const sumOrderMileageInquirySuccess = createAction(
  "[Order API] sum order mileage inquiry success",
  props<{ item: OrderMileageInquiryModel }>()
);

export const sumOrderMileageInquiryFailure = createAction(
  "[Order API] sum order mileage inquiry failure",
  props<{ msg: any }>()
);