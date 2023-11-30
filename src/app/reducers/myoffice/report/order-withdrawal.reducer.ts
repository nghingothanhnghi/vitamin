import { createReducer, on } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderWithdrawalPdt } from '@app/models/myoffice/report/order-withdrawal-product.model';
import { OrderWithdrawalState } from '@app/selectors/myoffice/report/order-withdrawal.selector';
import { loadListOrderPdtWithdrawalSuccess, loadOrderMstWithdrawalSuccess, loadSumOrderPdtWithdrawalSuccess } from '@app/actions/myoffice/report/order-withrawal.action';

export const orderWithdrawalFeatureKey = "orderWithdrawal";

export const initialState: OrderWithdrawalState= {
  ordMst: {} as OrderMstModel,
  orderPdts: [] as OrderWithdrawalPdt[],
  orderPdt: {} as OrderWithdrawalPdt,
}

export const orderWithdrawalReducer = createReducer(
  initialState,
  on(loadOrderMstWithdrawalSuccess, (state, { ordMst }) => ({...state, ordMst: ordMst})),
  on(loadListOrderPdtWithdrawalSuccess, (state, { ordPdts }) => ({...state, orderPdts: ordPdts})),
  on(loadSumOrderPdtWithdrawalSuccess, (state, { ordPdt }) => ({...state, orderPdt: ordPdt}))
);