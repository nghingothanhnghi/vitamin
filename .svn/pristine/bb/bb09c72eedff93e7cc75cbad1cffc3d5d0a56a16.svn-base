import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MaccoModel } from "@app/models/shoppingmall/macco.model";
import { maccoFeatureKey } from "@app/reducers/shoppingmall/macco.reducer";

export interface MaccoState {
  maccoResult: MaccoModel,
}

export const getMaccoState = createFeatureSelector<MaccoState>(maccoFeatureKey);

export const getMaccoResult = createSelector(
  getMaccoState,
  (state: MaccoState) => state.maccoResult
);