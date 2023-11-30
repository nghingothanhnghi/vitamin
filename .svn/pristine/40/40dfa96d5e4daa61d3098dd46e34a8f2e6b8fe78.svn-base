import { createFeatureSelector, createSelector } from '@ngrx/store';

import { unsoldProductInquiryFeatureKey } from '@app/reducers/myoffice/omnitrition/omnitrition-unsold-product-inquiry.reducer';
import { ConsumerSalesRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-sales-registration.model';

export interface UnsoldProductInquiryState {
  unsoldProducts: ConsumerSalesRegistrationModel[];
  unsoldProduct:ConsumerSalesRegistrationModel,
     count: number;
}

export const getUnsoldProductInquiryState = createFeatureSelector<UnsoldProductInquiryState>(unsoldProductInquiryFeatureKey);

export const getunsoldProducts = createSelector(
  getUnsoldProductInquiryState,
(state: UnsoldProductInquiryState) => state.unsoldProducts
);

export const getUnsoldProduct = createSelector(
  getUnsoldProductInquiryState,
  (state: UnsoldProductInquiryState) => state.unsoldProduct
);

export const getCountConsumerR = createSelector(
  getUnsoldProductInquiryState,
  (state: UnsoldProductInquiryState) => state.count
);

