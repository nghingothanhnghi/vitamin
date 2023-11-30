import { createReducer, on } from "@ngrx/store";

import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";
import { OrdPdtModel } from "@app/models/shoppingmall/order-pdt.model";
import { ResultProc } from "@app/models/system/result-proc.model";
import { CartState } from "@app/selectors/shoppingmall/cart.selector";
import { addToCartSuccess, cancelOrderSuccess, clearCart, loadCartInfoSuccess, loadCartItemsSuccess, removeCartItemSuccess, setIsBuyNow, setReload, setShowAlert } from "@app/actions/shoppingmall/cart.action";

export const cartFeatureKey = "cart";

export const initialState: CartState = {
  cartItems: [] as OrdPdtModel[],
  cartInfo: {} as OrderMstModel,
  actionResult: {} as ResultProc,
  isBuyNow: false,
  reload: false,
  showAlert: true,
}

export const cartReducer = createReducer(
  initialState,
  on(loadCartItemsSuccess, (state, { items }) => ({ ...state, cartItems: items })),
  on(loadCartInfoSuccess, (state, { info }) => ({ ...state, cartInfo: info })),
  on(addToCartSuccess, (state, { result }) => ({ ...state, actionResult: result })),
  on(removeCartItemSuccess, (state, { result }) => ({ ...state, actionResult: result })),
  on(cancelOrderSuccess, (state, { result }) => ({ ...state, actionResult: result })),
  on(setIsBuyNow, (state, { isBuyNow }) => ({ ...state, isBuyNow: isBuyNow })),
  on(setReload, (state, { reload }) => ({ ...state, reload: reload })),
  on(setShowAlert, (state, { show }) => ({ ...state, showAlert: show })),
  on(clearCart, (state) => ({
    cartItems: [] as OrdPdtModel[],
    cartInfo: {} as OrderMstModel,
    actionResult: {} as ResultProc,
    isBuyNow: false,
    reload: false,
    showAlert: true,
  }))
);