import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { CartService } from '@app/services/shoppingmall/cart.service';
import { 
  addToCart, 
  addToCartFailure, 
  addToCartSuccess, 
  cancelOrder, 
  cancelOrderFailure, 
  cancelOrderSuccess, 
  loadCartInfo, 
  loadCartInfoFailure, 
  loadCartInfoSuccess, 
  loadCartItems, 
  loadCartItemsFailure, 
  loadCartItemsSuccess, 
  removeCartItem, 
  removeCartItemFailure, 
  removeCartItemSuccess 
} from '@app/actions/shoppingmall/cart.action';

@Injectable()
export class CartEffect {

  constructor(
    private _actions$: Actions,
    private cartSerivce: CartService
  ) { }

 loadCartItems$ = createEffect(() => this._actions$.pipe(
    ofType(loadCartItems),
    mergeMap(({ userid }) => this.cartSerivce.loadCartItems(userid).pipe(
      map(res => loadCartItemsSuccess({ items: res })),
      catchError(res => of(loadCartItemsFailure({ msg: res })))
    ))
  ));

  loadCartInfo$ = createEffect(() => this._actions$.pipe(
    ofType(loadCartInfo),
    mergeMap(({ userid, ctrCd }) => this.cartSerivce.loadCartInfo(userid, ctrCd).pipe(
      map(res => loadCartInfoSuccess({ info: res })),
    ))
  ));

  addToCart$ = createEffect(() => this._actions$.pipe(
    ofType(addToCart),
    mergeMap(({ params }) => this.cartSerivce.addToCart(params).pipe(
      map(res => addToCartSuccess({ result: res })),
      catchError(res => of(addToCartFailure({ msg: res })))
    ))
  ));

  removeCartItem$ = createEffect(() => this._actions$.pipe(
    ofType(removeCartItem),
    mergeMap(({ userid, pdtCd, ordNoTmp }) => this.cartSerivce.removeCartItem(userid, pdtCd, ordNoTmp).pipe(
      map(res => removeCartItemSuccess({ result: res })),
      catchError(res => of(removeCartItemFailure({ msg: res })))
    ))
  ));

  cancelOrder$ = createEffect(() => this._actions$.pipe(
    ofType(cancelOrder),
    mergeMap(({ userid, ordNoTmp }) => this.cartSerivce.cancelOrder(userid, ordNoTmp).pipe(
      map(res => cancelOrderSuccess({ result: res })),
      catchError(res => of(cancelOrderFailure({ msg: res })))
    ))
  ));
}