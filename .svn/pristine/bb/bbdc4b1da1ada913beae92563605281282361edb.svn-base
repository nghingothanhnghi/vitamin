import { createAction, props } from '@ngrx/store';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

export const loadMemberPoint = createAction(
  "[Order Register API] load member point",
  props<{ userid: string }>()
);

export const loadMemberPointSuccess = createAction(
  "[Order Register API] load member point success",
  props<{ orderMst: OrderMstModel }>()
);

export const loadMemberPointFailure = createAction(
  "[Order Register API] load member failure",
  props<{ msg: any }>()
);