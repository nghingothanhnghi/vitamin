import { createFeatureSelector, createSelector } from '@ngrx/store';

import { consSalesRatioInquiryFeatureKey } from '@app/reducers/myoffice/omnitrition/omnitrition-consumer-sales-ratio-Inquiry.reducer';

import { ConsumerSalesRatioInquiryModel } from '@app/models/myoffice/omnitrition/consumer-sales-ratio-inquiry.model';

export interface ConsSalesRatioInquiryState {
  consSalesRatios:  ConsumerSalesRatioInquiryModel[];
  consSalesRatio:ConsumerSalesRatioInquiryModel,
  count: number;
}

export const getConsumerSalesRatioIState = createFeatureSelector<ConsSalesRatioInquiryState>(consSalesRatioInquiryFeatureKey);

export const getSalesRatioInquiryItems = createSelector(
  getConsumerSalesRatioIState,
(state: ConsSalesRatioInquiryState) => state.consSalesRatios
);

export const getSalesRatioInquiry = createSelector(
  getConsumerSalesRatioIState,
  (state: ConsSalesRatioInquiryState) => state.consSalesRatio
);

export const getCountSalesRatio = createSelector(
  getConsumerSalesRatioIState,
  (state: ConsSalesRatioInquiryState) => state.count
);

