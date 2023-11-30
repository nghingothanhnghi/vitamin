import { createFeatureSelector, createSelector } from "@ngrx/store";

import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";
import { OrderProductReportModel } from "@app/models/myoffice/report/order-product.model";
import { orderReportFeatureKey } from "@app/reducers/myoffice/report/order-report.reducer";

export interface OrderReportState {
  orderPdts: OrderProductReportModel[];
  orderMst: OrderMstModel;
  orderInfos: OrderMstModel[];
}

export const getOrderReportState = createFeatureSelector<OrderReportState>(orderReportFeatureKey);

export const getOrderProductsReport = createSelector(
  getOrderReportState, 
  (state: OrderReportState) => state.orderPdts
);

export const getOrderMstReport = createSelector(
  getOrderReportState, 
  (state: OrderReportState) => state.orderMst
);

export const getOrderInfosReport = createSelector(
  getOrderReportState, 
  (state: OrderReportState) => state.orderInfos
);