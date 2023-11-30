import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';
import { monthlyOrderCountFeatureKey } from '@app/reducers/myoffice/order/monthly-order-count.reducer';

export interface MonthlyOrderCountState {
  searchItems: OrderMonthlyModel[];
  totalItem: Number;
  sumItem: OrderMonthlyModel;
}

export const getMonthlyOrderCountState = createFeatureSelector<MonthlyOrderCountState>(monthlyOrderCountFeatureKey);

export const getMonthlyOrderSearchItems = createSelector(
  getMonthlyOrderCountState,
  (state: MonthlyOrderCountState) => state.searchItems
);

export const getMonthlyOrderTotalItem = createSelector(
  getMonthlyOrderCountState,
  (state: MonthlyOrderCountState) => state.totalItem
);

export const getMonthlyOrderSumItem = createSelector(
  getMonthlyOrderCountState,
  (state: MonthlyOrderCountState) => state.sumItem
);