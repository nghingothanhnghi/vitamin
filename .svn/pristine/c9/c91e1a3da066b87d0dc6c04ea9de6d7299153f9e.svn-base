import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { inquiryPerformanceSearchFeatureKey } from '@app/reducers/myoffice/order/inquiry-performance-search.reducer';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';

export interface InquiryPerformanceSearchState {
  searchItemsA: OrderMstModel[];
  sumItemA: OrderPdtModel;
  searchItemsB: OrderMstModel[];
  sumItemB: OrderPdtModel;
}

export const getInquiryPerformanceSearchState = createFeatureSelector<InquiryPerformanceSearchState>(inquiryPerformanceSearchFeatureKey);

export const getInquiryPerformanceSearchItemsA = createSelector(
  getInquiryPerformanceSearchState,
  (state: InquiryPerformanceSearchState) => state.searchItemsA
);


export const getInquiryPerformanceSumItemA = createSelector(
  getInquiryPerformanceSearchState,
  (state: InquiryPerformanceSearchState) => state.sumItemA
);

export const getInquiryPerformanceSearchItemsB = createSelector(
  getInquiryPerformanceSearchState,
  (state: InquiryPerformanceSearchState) => state.searchItemsB
);


export const getInquiryPerformanceSumItemB = createSelector(
  getInquiryPerformanceSearchState,
  (state: InquiryPerformanceSearchState) => state.sumItemB
);