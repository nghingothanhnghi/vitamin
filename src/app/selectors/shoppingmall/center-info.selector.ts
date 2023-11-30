import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CenterInfoModel } from "@app/models/shoppingmall/center-info.model";
import { centerInfoFeatureKey } from "@app/reducers/shoppingmall/center-info.reducer";

export interface CenterInfoState {
  center: CenterInfoModel;
}

export const getCenterInfoState = createFeatureSelector<CenterInfoState>(centerInfoFeatureKey);

export const getCenterInfo = createSelector(
  getCenterInfoState,
  (state: CenterInfoState) => state.center
);