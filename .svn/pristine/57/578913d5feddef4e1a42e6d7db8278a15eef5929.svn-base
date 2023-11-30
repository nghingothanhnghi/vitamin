import { Zip } from '@app/models/system/zip.model';
import { createAction, props } from '@ngrx/store';

// search
export const searchZipPopup = createAction(
  "[Zip API] search zip popup",
  props<{ params: any }>()
);

export const searchZipPopupSuccess = createAction(
  "[Zip API] search zip popup success",
  props<{ zipItems: Zip[] }>()
);

export const searchZipPopupFailure = createAction(
  "[Zip API] search zip popup failure",
  props<{ msg: any }>()
);

// count
export const countZipPopup = createAction(
  "[Zip API] count zip popup",
  props<{ params: any }>()
);

export const countZipPopupSuccess = createAction(
  "[Zip API] count zip popup success",
  props<{ total: Number }>()
);

export const countZipPopupFailure = createAction(
  "[Zip API] count zip popup failure",
  props<{ msg: any }>()
);