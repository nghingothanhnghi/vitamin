import { createReducer, on } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { InquiryPerformanceSearchState } from '@app/selectors/myoffice/order/inquiry-performance-search.selector';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { searchInquiryPerformanceSuccessA, searchInquiryPerformanceSuccessB, sumInquiryPerformanceSuccessA, sumInquiryPerformanceSuccessB } from '@app/actions/myoffice/order/inquiry-performance-search.action';

export const inquiryPerformanceSearchFeatureKey = 'inquiryPerformanceSearch';

export const initialState: InquiryPerformanceSearchState = {
  searchItemsA: [] as OrderMstModel[],
  sumItemA: {} as OrderPdtModel,
  searchItemsB: [] as OrderMstModel[],
  sumItemB: {} as OrderPdtModel,
}

export const inquiryPerformanceSearchReducer = createReducer(
  initialState,
  on(searchInquiryPerformanceSuccessA, (state, { ordersA }) =>({ ...state, searchItemsA: ordersA })),
  on(sumInquiryPerformanceSuccessA, (state, { orderA }) => ({...state, sumItemA: orderA})),

  on(searchInquiryPerformanceSuccessB, (state, { ordersB }) =>({ ...state, searchItemsB: ordersB })),
  on(sumInquiryPerformanceSuccessB, (state, { orderB }) => ({...state, sumItemB: orderB}))
);