import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { deliPopupFeatureKey } from '@app/reducers/shoppingmall/deli-popup.reducer';

export interface DeliPopupState {
  delis: OrderMstModel[],
  total: number,
}

export const getDeliPopupState = createFeatureSelector<DeliPopupState>(deliPopupFeatureKey);

export const getListDeli = createSelector(
  getDeliPopupState,
  (state: DeliPopupState) => state.delis
);

export const getTotalDeli = createSelector(
  getDeliPopupState,
  (state: DeliPopupState) => state.total
);