import { createReducer, on } from "@ngrx/store";

import { OrderPopupModel } from "@app/models/myoffice/order/order-popup.model";
import { OrderPopupState } from "@app/selectors/myoffice/order/order-popup.selector";
import { countOrderPopupSuccess, searchOrderPopupSuccess } from "@app/actions/myoffice/order/order-popup.action";

export const orderPopupFeatureKey = 'orderPopup';

export const initialState: OrderPopupState = {
  items: [] as OrderPopupModel[],
  total: 0,
}

export const orderPopupReducer = createReducer(
  initialState,
  on(searchOrderPopupSuccess, (state, { orderItems }) => ({...state, items: orderItems})),
  on(countOrderPopupSuccess, (state, { total }) => ({...state, total: total})),
);