import { CenterInfoModel } from '@app/models/shoppingmall/center-info.model';
import { createAction, props } from '@ngrx/store';

export const loadCenterInfo = createAction(
  "[Center Info API] load center info",
  props<{ cntCd: string }>(),
);

export const loadCenterInfoSuccess = createAction(
  "[Center Info API] load center info success",
  props<{ center: CenterInfoModel }>(),
);

export const loadCenterInfoFailure = createAction(
  "[Center Info API] load center info failure",
  props<{ msg: any }>(),
);
