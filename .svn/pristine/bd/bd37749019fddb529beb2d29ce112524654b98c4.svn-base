import { createReducer, on } from "@ngrx/store";

import { Zip } from '@app/models/system/zip.model';
import { ZipPopupState } from "@app/selectors/system/zip-popup.selector";
import { countZipPopupSuccess, searchZipPopupSuccess } from "@app/actions/system/zip-popup.action";

export const zipPopupFeatureKey = 'zipPopup';

export const initialState: ZipPopupState = {
  items: [] as Zip[],
  total: 0,
}

export const zipPopupReducer = createReducer(
  initialState,
  on(searchZipPopupSuccess, (state, { zipItems }) => ({...state, items: zipItems})),
  on(countZipPopupSuccess, (state, { total }) => ({...state, total: total})),
);