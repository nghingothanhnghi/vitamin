import { createAction, props } from '@ngrx/store';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

// search
export const loadDelis = createAction(
  "[Deli popup API] load delis",
  props<{ userid: string, page: number, len: number }>()
);

export const loadDelisSuceess = createAction(
  "[Deli popup API] load delis success",
  props<{ delis: OrderMstModel[] }>()
);


export const loadDelisFailure = createAction(
  "[Deli popup API] load delis failure",
  props<{ msg: any }>()
);

// count
export const countDelis = createAction(
  "[Deli popup API] count delis",
  props<{ userid: string, page: number, len: number }>()
);

export const countDelisSuceess = createAction(
  "[Deli popup API] count delis success",
  props<{ total: number }>()
);


export const countDelisFailure = createAction(
  "[Deli popup API] count delis failure",
  props<{ msg: any }>()
);