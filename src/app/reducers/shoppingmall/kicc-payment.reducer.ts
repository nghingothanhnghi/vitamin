import { createReducer, on } from "@ngrx/store";

import { KICCPaymentState } from "@app/selectors/shoppingmall/kicc-payment.selector";
import { KICCCardModel } from "@app/models/shoppingmall/kicc-card.model";
import { payCardSuccess, setCardResult } from "@app/actions/shoppingmall/kicc-payment.action";

export const kiccPaymentFeatureKey = "kiccPayment";

export const initialState: KICCPaymentState = {
  cardResult: {} as KICCCardModel
}

export const kiccPaymentReducer = createReducer(
  initialState,
  on(payCardSuccess, (state, { cardResponse }) => ({ ...state, cardResult: cardResponse })),
  on(setCardResult, (state, { cardResult }) => ({ ...state, cardResult: cardResult }))
);