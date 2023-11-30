import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { productIntroFeatureKey } from '@app/reducers/homepage/product-intro.reducer';

export interface ProductIntroState {
  products: OrdPdtModel[];
}

export const getProductIntroState = createFeatureSelector<ProductIntroState>(productIntroFeatureKey);

export const getProductsIntro = createSelector(
  getProductIntroState,
  (state: ProductIntroState) => state.products
);