import { createReducer, on } from "@ngrx/store";

import { CheckoutState } from "@app/selectors/shoppingmall/checkout.selector";
import { ResultProc } from "@app/models/system/result-proc.model";
import { saveOrderMoneyTmpSuccess, saveOrderSuccess, setResultOrdIns, setResultOrdMoneyTmp } from "@app/actions/shoppingmall/checkout.action";

export const checkoutFeatureKey = "checkout";

export const initialState: CheckoutState = {
  resultOrdMoneyTmp: {} as ResultProc,
  resultOrdIns: {} as ResultProc,
}

export const checkoutReducer = createReducer(
  initialState,
  on(saveOrderMoneyTmpSuccess, (state, { result }) => ({ ...state, resultOrdMoneyTmp: result })),
  on(saveOrderSuccess, (state, { result }) => ({ ...state, resultOrdIns: result })),
  on(setResultOrdMoneyTmp, (state, { params }) => ({ ...state, resultOrdMoneyTmp: params })),
  on(setResultOrdIns, (state, { params }) => ({ ...state, resultOrdIns: params }))
);