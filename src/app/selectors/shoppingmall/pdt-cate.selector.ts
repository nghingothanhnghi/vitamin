import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PdtCateModel } from "@app/models/shoppingmall/pdt-cate.model";
import { pdtCateFeatureKey } from '@app/reducers/shoppingmall/pdt-cate.reducer';

export interface PdtCateState {
  pdtCates: PdtCateModel[];
}

export const getPdtCateState = createFeatureSelector<PdtCateState>(pdtCateFeatureKey);

export const getPdtCates = createSelector(
  getPdtCateState,
  (state: PdtCateState) => state.pdtCates
);
