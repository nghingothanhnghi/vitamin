import { callMaccoSuccess, setMaccoResult } from "@app/actions/shoppingmall/macco.action";
import { MaccoModel } from "@app/models/shoppingmall/macco.model";
import { MaccoState } from "@app/selectors/shoppingmall/macco.selector";
import { createReducer, on } from "@ngrx/store";

export const maccoFeatureKey = "macco";

export const initialState: MaccoState = {
  maccoResult: {} as MaccoModel
}

export const maccoReducer = createReducer(
  initialState,
  on(callMaccoSuccess, (state, { payload }) => ({ ...state, maccoResult: payload })),
  on(setMaccoResult, (state, { item }) => ({ ...state, maccoResult: item }))
);