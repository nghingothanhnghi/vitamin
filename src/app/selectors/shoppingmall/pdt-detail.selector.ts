import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PdtDetailModel } from '@app/models/shoppingmall/pdt-detail.model';
import { pdtDetailFeatureKey } from '@app/reducers/shoppingmall/pdt-detail.reducer';

export interface PdtDetailState {
  info: PdtDetailModel;
  images: PdtDetailModel[];
  notify: PdtDetailModel[];
  relatedProducts: PdtDetailModel[];
  heading: string;
}

export const getPdtCateState = createFeatureSelector<PdtDetailState>(pdtDetailFeatureKey);

export const getPdtInfo = createSelector(
  getPdtCateState,
  (state: PdtDetailState) => state.info
)

export const getPdtImages = createSelector(
  getPdtCateState,
  (state: PdtDetailState) => state.images
)

export const getPdtNotify = createSelector(
  getPdtCateState,
  (state: PdtDetailState) => state.notify
)

export const getProductNameMainHeading = createSelector(
  getPdtCateState,
  (state: PdtDetailState) => state.heading
);
export const getPdtInfosByCateCd = createSelector(
  getPdtCateState,
  (state: PdtDetailState) => state.relatedProducts
);