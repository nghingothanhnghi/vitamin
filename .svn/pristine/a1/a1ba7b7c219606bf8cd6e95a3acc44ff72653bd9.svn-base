import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderPopupModel } from '@app/models/myoffice/order/order-popup.model';
import { orderPopupFeatureKey } from '@app/reducers/myoffice/order/order-popup.reducer';

export interface OrderPopupState {
  items: OrderPopupModel[];
  total: Number;
}

export const getOrderPopupState = createFeatureSelector<OrderPopupState>(orderPopupFeatureKey);

export const getOrderPopupItems = createSelector(
  getOrderPopupState,
  (state: OrderPopupState) => state.items
);

export const countOrderPopupItems = createSelector(
  getOrderPopupState,
  (state: OrderPopupState) => state.total
);