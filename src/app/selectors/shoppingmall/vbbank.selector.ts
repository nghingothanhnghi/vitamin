import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PaymentCardResult } from "@app/models/shoppingmall/payment-card-result.model";
import { vbBankStateFeatureKey } from "@app/reducers/shoppingmall/vbbank.reducer";

export interface VbBankState {
  cardResult: PaymentCardResult,
}

export const getSettlePaymentState = createFeatureSelector<VbBankState>(vbBankStateFeatureKey);

export const getSettleVBankResult = createSelector(
  getSettlePaymentState,
  (state: VbBankState) => state.cardResult
);

