import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";
import { OrdPdtModel } from "@app/models/shoppingmall/order-pdt.model";
import { ResultProc } from "@app/models/system/result-proc.model";
import { cartFeatureKey } from '@app/reducers/shoppingmall/cart.reducer';

export interface CartState {
  cartItems: OrdPdtModel[];
  cartInfo: OrderMstModel;
  actionResult: ResultProc;
  isBuyNow: boolean,
  reload: boolean,
  showAlert: boolean,
}

export const getCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const getCartItems = createSelector(
  getCartState,
  (state: CartState) => state.cartItems
);

export const getCartInfo = createSelector(
  getCartState,
  (state: CartState) => state.cartInfo
);

export const getActionResult = createSelector(
  getCartState,
  (state: CartState) => state.actionResult
);

export const getIsBuyNow = createSelector(
  getCartState,
  (state: CartState) => state.isBuyNow
)

export const getReload = createSelector(
  getCartState,
  (state: CartState) => state.reload
)

export const getShowAlert = createSelector(
  getCartState,
  (state: CartState) => state.showAlert
)