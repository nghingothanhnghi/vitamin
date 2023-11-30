import { createFeatureSelector, createSelector } from "@ngrx/store";

import { KICCCardModel } from "@app/models/shoppingmall/kicc-card.model";
import { kiccPaymentFeatureKey } from "@app/reducers/shoppingmall/kicc-payment.reducer";

export interface KICCPaymentState {
  cardResult: KICCCardModel,
}

export const getKICCPaymentState = createFeatureSelector<KICCPaymentState>(kiccPaymentFeatureKey);

export const getKICCCardResult = createSelector(
  getKICCPaymentState,
  (state: KICCPaymentState) => state.cardResult
);