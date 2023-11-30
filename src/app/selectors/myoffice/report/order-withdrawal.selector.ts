import { createFeatureSelector, createSelector } from "@ngrx/store";

import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";
import { OrderWithdrawalPdt } from "@app/models/myoffice/report/order-withdrawal-product.model";
import { orderWithdrawalFeatureKey } from "@app/reducers/myoffice/report/order-withdrawal.reducer";

export interface OrderWithdrawalState {
  ordMst: OrderMstModel;
  orderPdts: OrderWithdrawalPdt[];
  orderPdt: OrderWithdrawalPdt;
}

export const getOrderReportState = createFeatureSelector<OrderWithdrawalState>(orderWithdrawalFeatureKey);

export const getOrderMstWithdrawal = createSelector(
  getOrderReportState,
  (state: OrderWithdrawalState) => state.ordMst
)

export const getListOrderPdtWithdrawal = createSelector(
  getOrderReportState,
  (state: OrderWithdrawalState) => state.orderPdts
)

export const getSumOrderPdtWithdrawal = createSelector(
  getOrderReportState,
  (state: OrderWithdrawalState) => state.orderPdt
)