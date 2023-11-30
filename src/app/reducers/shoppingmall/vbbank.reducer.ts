import { createReducer, on } from "@ngrx/store";

import { PaymentCardResult } from "@app/models/shoppingmall/payment-card-result.model";
import { VbBankState } from "@app/selectors/shoppingmall/vbbank.selector";
import { payVBankSuccess, setVBankResult } from "@app/actions/shoppingmall/vbbank.action";

export const vbBankStateFeatureKey = "VbBankState";

export const initialState: VbBankState = {
  cardResult: {} as PaymentCardResult
}

export const vbBankStateReducer = createReducer(
  initialState,
  on(payVBankSuccess, (state, { cardResponse }) => ({ ...state, cardResult: cardResponse })),
  on(setVBankResult, (state, { cardResult }) => ({ ...state, cardResult: cardResult })),
);