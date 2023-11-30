import { ResultProc } from '@app/models/system/result-proc.model';
import { createAction, props } from '@ngrx/store';

// save order money tmp
export const saveOrderMoneyTmp = createAction(
  "[Order Register API] save order money tmp",
  props<{ params: any }>()
);

export const saveOrderMoneyTmpSuccess = createAction(
  "[Order Register API] save order money tmp success",
  props<{ result: ResultProc }>()
);

export const saveOrderMoneyTmpFailure = createAction(
  "[Order Register API] save order money tmp failure",
  props<{ msg: any }>()
);

// save order
export const saveOrder = createAction(
  "[Order Register API] save order",
  props<{ params: any }>()
);

export const saveOrderSuccess = createAction(
  "[Order Register API] save order success",
  props<{ result: ResultProc }>()
);

export const saveOrderFailure = createAction(
  "[Order Register API] save order failure",
  props<{ msg: any }>()
);

export const setResultOrdMoneyTmp = createAction(
  "[Order Register] set result order money tmp",
  props<{ params: any }>()
);

export const setResultOrdIns = createAction(
  "[Order Register] set result order insert",
  props<{ params: any }>()
);