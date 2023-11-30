import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMoneyModel } from '@app/models/myoffice/order/order-money.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { orderDetailInquiryFeatureKey } from '@app/reducers/myoffice/order/order-detail-inquiry.reducer';

export interface OrderDetailInquiryState {
  orderMsts: OrderMstModel[];
  orderMoneys: OrderMoneyModel[];
  orderPdts: OrderPdtModel[];
  sumOrderPdt: OrderPdtModel;
  orderDelis: OrderMstModel[];
}

export const getOrderDetailInquiryState = createFeatureSelector<OrderDetailInquiryState>(orderDetailInquiryFeatureKey);

export const getOrderInfo = createSelector(
  getOrderDetailInquiryState,
  (state: OrderDetailInquiryState) => state.orderMsts
);

export const getOrderPayInfo = createSelector(
  getOrderDetailInquiryState,
  (state: OrderDetailInquiryState) => state.orderMoneys
);

export const getOrderProductInfo = createSelector(
  getOrderDetailInquiryState,
  (state: OrderDetailInquiryState) => state.orderPdts
);

export const sumOrderProductInfo = createSelector(
  getOrderDetailInquiryState,
  (state: OrderDetailInquiryState) => state.sumOrderPdt
);

export const getOrderDelis = createSelector(
  getOrderDetailInquiryState,
  (state: OrderDetailInquiryState) => state.orderDelis
);