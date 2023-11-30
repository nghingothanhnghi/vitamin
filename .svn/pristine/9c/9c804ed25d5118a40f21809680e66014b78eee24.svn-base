import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CenterModel } from "@app/models/system/center.model";
import { centerFeatureKey } from '@app/reducers/system/center.reducer';

export interface CenterState {
  centers: CenterModel[];
}

export const getCenterState = createFeatureSelector<CenterState>(centerFeatureKey);

export const getCenters = createSelector(
  getCenterState,
  (state: CenterState) => state.centers
);
