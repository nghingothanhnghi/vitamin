import { createAction, props } from '@ngrx/store';

import { CenterModel } from '@app/models/system/center.model';

export const loadCenter = createAction("[Center API] Load Center");

export const loadCenterSuccess = createAction(
  "[Center API] Load Center Success",
  props<{ centers: CenterModel[] }>()
);

export const loadCenterFailure = createAction(
  "[Center API] Load Center Failure",
  props<{ msg: any }>()
);

