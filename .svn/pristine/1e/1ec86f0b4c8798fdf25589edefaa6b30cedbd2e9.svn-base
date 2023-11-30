import { createReducer, on } from "@ngrx/store";

import { DeliPopupState } from "@app/selectors/shoppingmall/deli-popup.selector";
import { countDelisSuceess, loadDelisSuceess } from "@app/actions/shoppingmall/deli-popup.action";

export const deliPopupFeatureKey = "deliPopup";

export const initialState: DeliPopupState = {
  delis: [],
  total: 0,
}

export const deliPopupReducer = createReducer(
  initialState,
  on(loadDelisSuceess, (state, { delis }) => ({ ...state, delis: delis })),
  on(countDelisSuceess, (state, { total }) => ({ ...state, total: total }))
);