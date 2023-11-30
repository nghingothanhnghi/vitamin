import { MaccoModel } from '@app/models/shoppingmall/macco.model';
import { createAction, props } from '@ngrx/store';

export const callMacco = createAction(
  "[MACCO API] call macco",
  props<{ kind: string, ordNo: string, userid: string }>()
);

export const callMaccoSuccess = createAction(
  "[MACCO API] call macco success",
  props<{ payload: MaccoModel }>()
);

export const callMaccoFailure = createAction(
  "[MACCO API] call macco failure",
  props<{ msg: any }>()
);

export const setMaccoResult = createAction(
  "[MACCO Reuslt] set macco result",
  props<{ item: MaccoModel }>()
);