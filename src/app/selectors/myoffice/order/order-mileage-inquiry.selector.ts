import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMileageInquiryModel } from '@app/models/myoffice/order/order-mileage-inquiry.model';
import { orderMileageInquiryFeatureKey } from '@app/reducers/myoffice/order/order-mileage-inquiry.reducer';

export interface OrderMileageInquiryState {
  searchItems: OrderMileageInquiryModel[];
  totalItems: Number;
  sumItem: OrderMileageInquiryModel;
}

export const getOrderMileageInquiryState = createFeatureSelector<OrderMileageInquiryState>(orderMileageInquiryFeatureKey);

export const getOrderMileageInquirySearchItems = createSelector(
  getOrderMileageInquiryState,
  (state: OrderMileageInquiryState) => state.searchItems
);

export const getOrderMileageInquiryTotalItem = createSelector(
  getOrderMileageInquiryState,
  (state: OrderMileageInquiryState) => state.totalItems
);

export const getOrderMileageInquirySumItem = createSelector(
  getOrderMileageInquiryState,
  (state: OrderMileageInquiryState) => state.sumItem
);