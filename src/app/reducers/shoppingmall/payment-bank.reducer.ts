import { createReducer, on } from "@ngrx/store";
import { PaymentBankState } from "@app/selectors/shoppingmall/payment-bank.selector";
import { loadPaymentBanksSuccess } from "@app/actions/shoppingmall/payment-bank.action";

export const paymentBankFeatureKey = "paymentBank";

export const initialState: PaymentBankState = {
  paymentBanks: []
}

export const paymentBankReducer = createReducer(
  initialState,
  on(loadPaymentBanksSuccess, (state, { banks }) => ({ ...state, paymentBanks: banks }))
);