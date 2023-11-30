import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ResultProc } from "@app/models/system/result-proc.model";
import { checkoutFeatureKey } from "@app/reducers/shoppingmall/checkout.reducer";

export interface CheckoutState {
  resultOrdMoneyTmp: ResultProc,
  resultOrdIns: ResultProc,
}

export const getCheckoutState = createFeatureSelector<CheckoutState>(checkoutFeatureKey);

export const getResultOrdMoneyTmp = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.resultOrdMoneyTmp
);

export const getResultOrdIns = createSelector(
  getCheckoutState,
  (state: CheckoutState) => state.resultOrdIns
);