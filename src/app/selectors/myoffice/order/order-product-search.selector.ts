import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { orderProductSearchFeatureKey } from '@app/reducers/myoffice/order/order-product-search.reducer';

export interface OrderPdtState {
  searchItems: OrderPdtModel[];
  totalItems: Number;
  sumItem: OrderPdtModel;
}

export const getOrderProductSearchState = createFeatureSelector<OrderPdtState>(orderProductSearchFeatureKey);

export const getOrderProductSearchItems = createSelector(
  getOrderProductSearchState,
  (state: OrderPdtState) => state.searchItems
);

export const getOrderProductTotalItems = createSelector(
  getOrderProductSearchState,
  (state: OrderPdtState) => state.totalItems
);

export const getOrderProductSumItem = createSelector(
  getOrderProductSearchState,
  (state: OrderPdtState) => state.sumItem
);