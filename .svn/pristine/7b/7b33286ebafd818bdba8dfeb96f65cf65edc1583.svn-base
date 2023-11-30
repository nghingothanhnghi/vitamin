import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { productFeatureKey } from '@app/reducers/shoppingmall/product.reducer';

export interface ProductState {
  total: number;
  products: OrdPdtModel[];
  mainProducts: OrdPdtModel[];
  specialProducts: OrdPdtModel[];
  cateCd: string;
  key: string;
  pdtCate: string;
}

export const getProductState = createFeatureSelector<ProductState>(productFeatureKey);

export const getTotalProduct = createSelector(
  getProductState,
  (state: ProductState) => state.total
);

export const getProducts = createSelector(
  getProductState,
  (state: ProductState) => state.products
);

export const getMainProducts = createSelector(
  getProductState,
  (state: ProductState) => state.mainProducts
);

export const getSpecialProducts = createSelector(
  getProductState,
  (state: ProductState) => state.specialProducts
);

export const getCateCd = createSelector(
  getProductState,
  (state: ProductState) => state.cateCd
);

export const getKeySearch = createSelector(
  getProductState,
  (state: ProductState) => state.key
);

export const getPdtCate = createSelector(
  getProductState,
  (state: ProductState) => state.pdtCate
);