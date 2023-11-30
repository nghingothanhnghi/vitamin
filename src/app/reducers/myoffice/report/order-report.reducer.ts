import { createReducer, on } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderProductReportModel } from '@app/models/myoffice/report/order-product.model';
import { OrderReportState } from '@app/selectors/myoffice/report/order-report.selector';
import { loadOrderInfoReportSuccess, loadOrderMstReportSuccess, loadOrderProductReportSuccess } from '@app/actions/myoffice/report/order-report.action';

export const orderReportFeatureKey = "orderReport";

export const initialState: OrderReportState = {
  orderPdts: [] as OrderProductReportModel[],
  orderMst: {} as OrderMstModel,
  orderInfos: [] as OrderMstModel[],
}

export const orderReportReducer = createReducer(
  initialState,
  on(loadOrderProductReportSuccess, (state, { ordPdts }) => ({...state, orderPdts: ordPdts})),
  on(loadOrderMstReportSuccess, (state, { ordMst }) => ({...state, orderMst: ordMst})),
  on(loadOrderInfoReportSuccess, (state, { items }) => ({...state, orderInfos: items}))
);