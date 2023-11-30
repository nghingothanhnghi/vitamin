import { createReducer, on } from '@ngrx/store';

import { OrderMileageInquiryModel } from '@app/models/myoffice/order/order-mileage-inquiry.model';
import { OrderMileageInquiryState } from '@app/selectors/myoffice/order/order-mileage-inquiry.selector';
import { countOrderMileageInquirySuccess, searchOrderMileageInquirySuccess, sumOrderMileageInquirySuccess } from '@app/actions/myoffice/order/order-mileage-inquiry.action';

export const orderMileageInquiryFeatureKey = 'orderMileageInquiry';

export const initialState: OrderMileageInquiryState = {
  searchItems: [] as OrderMileageInquiryModel[],
  totalItems: 0,
  sumItem: {} as OrderMileageInquiryModel,
}

export const orderMileageInquiryReducer = createReducer(
  initialState,
  on(searchOrderMileageInquirySuccess, (state, { items }) => ({...state, searchItems: items})),
  on(countOrderMileageInquirySuccess, (state, { total }) => ({...state, totalItems: total})),
  on(sumOrderMileageInquirySuccess, (state, { item }) => ({...state, sumItem: item})),
);