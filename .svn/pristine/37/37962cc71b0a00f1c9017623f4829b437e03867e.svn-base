import { createAction, props } from '@ngrx/store';

import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { ResultProc } from '@app/models/system/result-proc.model';

// cart items
export const loadCartItems = createAction(
  "[Order Register API] load card items",
  props<{ userid: string }>()
);

export const loadCartItemsSuccess = createAction(
  "[Order Register API] load card items success",
  props<{ items: OrdPdtModel[] }>()
);

export const loadCartItemsFailure = createAction(
  "[Order Register API] load card items failure",
  props<{ msg: any }>()
);

// cart info
export const loadCartInfo = createAction(
  "[Order Register API] load card info",
  props<{ userid: string, ctrCd: string }>()
);

export const loadCartInfoSuccess = createAction(
  "[Order Register API] load card info success",
  props<{ info: OrderMstModel }>()
);

export const loadCartInfoFailure = createAction(
  "[Order Register API] load card info failure",
  props<{ msg: any }>()
);

// add to cart
export const addToCart = createAction(
  "[Order Register API] add to cart",
  props<{ params: any }>()
);

export const addToCartSuccess = createAction(
  "[Order Register API] add to cart success",
  props<{ result: ResultProc }>()
);

export const addToCartFailure = createAction(
  "[Order Register API] add to cart failure",
  props<{ msg: any }>()
);

// remove cart item
export const removeCartItem = createAction(
  "[Order Register API] remove cart item",
  props<{ userid: string, pdtCd: string, ordNoTmp: number }>()
);

export const removeCartItemSuccess = createAction(
  "[Order Register API] remove cart item success",
  props<{ result: ResultProc }>()
);

export const removeCartItemFailure = createAction(
  "[Order Register API] remove cart item failure",
  props<{ msg: any }>()
);

// cancel order
export const cancelOrder = createAction(
  "[Order Register API] cancel order",
  props<{ userid: string, ordNoTmp: number }>()
);

export const cancelOrderSuccess = createAction(
  "[Order Register API] cancel order success",
  props<{ result: ResultProc }>()
);

export const cancelOrderFailure = createAction(
  "[Order Register API] cancel order failure",
  props<{ msg: any }>()
);

// set is buy now
export const setIsBuyNow = createAction(
  "[Cart] set is buy now",
  props<{ isBuyNow: boolean }>()
);

// set reload
export const setReload = createAction(
  "[Cart] set reload cart items and cart info",
  props<{ reload: boolean }>()
);

// show alert
export const setShowAlert = createAction(
  "[Cart] set show alert", 
  props<{ show: boolean }>()
)

// clear cart
export const clearCart = createAction("[Card] clear cart");