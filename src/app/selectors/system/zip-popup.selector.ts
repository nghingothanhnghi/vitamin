import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Zip } from '@app/models/system/zip.model';
import { zipPopupFeatureKey } from '@app/reducers/system/zip-popup.reducer';

export interface ZipPopupState {
  items: Zip[];
  total: Number;
}

export const getZipPopupState = createFeatureSelector<ZipPopupState>(zipPopupFeatureKey);

export const getZipPopupItems = createSelector(
  getZipPopupState,
  (state: ZipPopupState) => state.items
);

export const countZipPopupItems = createSelector(
  getZipPopupState,
  (state: ZipPopupState) => state.total
);