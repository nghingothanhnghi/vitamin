import { createReducer, on } from '@ngrx/store';

import { OrderMoneyModel } from '@app/models/myoffice/order/order-money.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { OrderDetailInquiryState } from '@app/selectors/myoffice/order/order-detail-inquiry.selector';
import { loadDeliOrdSuccess, loadOrderInfoSuccess, loadOrderPaySuccess, loadOrderProductSuccess, loadSumOrderProductSuccess } from '@app/actions/myoffice/order/order-detail-inquiry.action';

export const orderDetailInquiryFeatureKey = "orderDetailInquiry";

export const initialState: OrderDetailInquiryState = {
  orderMsts: [] as OrderMstModel[],
  orderMoneys: [] as OrderMoneyModel[],
  orderPdts: [] as OrderPdtModel[],
  sumOrderPdt: {} as OrderPdtModel,
  orderDelis: [] as OrderMstModel[],
}

export const orderDetailInquiryReducer = createReducer(
  initialState,
  on(loadOrderInfoSuccess, (state, { items }) => ({...state, orderMsts: items})),
  on(loadOrderPaySuccess, (state, { items }) => ({...state, orderMoneys: items})),
  on(loadOrderProductSuccess, (state, { items }) => ({...state, orderPdts: items})),
  on(loadSumOrderProductSuccess, (state, { item }) => ({...state, sumOrderPdt: item})),
  on(loadDeliOrdSuccess, (state, { items }) => ({...state, orderDelis: items }))
);