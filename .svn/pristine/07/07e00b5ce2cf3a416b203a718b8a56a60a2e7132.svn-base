import { createFeatureSelector, createSelector } from '@ngrx/store';

import { orderSearchFeatureKey } from '@app/reducers/myoffice/order/order-search.reducer';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

export interface OrderSearchState {
  searchItems: OrderMstModel[];
  totalItems: Number;
  sumItem: OrderMstModel;
}

export const getOrderSearchState = createFeatureSelector<OrderSearchState>(orderSearchFeatureKey);

export const getOrderSearchItems = createSelector(
  getOrderSearchState,
  (state: OrderSearchState) => state.searchItems
);

export const getOrderTotalItems = createSelector(
  getOrderSearchState,
  (state: OrderSearchState) => state.totalItems
);

export const getOrderSumItem = createSelector(
  getOrderSearchState,
  (state: OrderSearchState) => state.sumItem
);