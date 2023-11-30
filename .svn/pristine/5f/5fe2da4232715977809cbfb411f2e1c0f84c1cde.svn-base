import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from '@app/services/shoppingmall/product.service';
import { loadMainProducts, loadMainProductsFailure, loadMainProductsSuccess, loadProducts, loadProductsFailure, loadProductsSuccess, loadSpecialProducts, loadSpecialProductsFailure, loadSpecialProductsSuccess, loadTotalProduct, loadTotalProductFailure, loadTotalProductSuccess } from '@app/actions/shoppingmall/product.action';

@Injectable()
export class ProductEffect {

  constructor(
    private _actions$: Actions,
    private productService: ProductService
  ) { }

  loadTotalProduct$ = createEffect(() => this._actions$.pipe(
    ofType(loadTotalProduct),
    mergeMap(({ params }) => this.productService.loadTotalProduct(params).pipe(
      map(res => loadTotalProductSuccess({ total: res })),
      catchError(res => of(loadTotalProductFailure({ msg: res })))
    ))
  ));

  loadProducts$ = createEffect(() => this._actions$.pipe(
    ofType(loadProducts),
    mergeMap(({ params }) => this.productService.loadProducts(params).pipe(
      map(res => loadProductsSuccess({ items: res })),
      catchError(res => of(loadProductsFailure({ msg: res })))
    ))
  ));

  loadMainProducts$ = createEffect(() => this._actions$.pipe(
    ofType(loadMainProducts),
    mergeMap(({ params }) => this.productService.loadMainProducts(params).pipe(
      map(res => loadMainProductsSuccess({ items: res })),
      catchError(res => of(loadMainProductsFailure({ msg: res })))
    ))
  ));

  loadSpecialProducts$ = createEffect(() => this._actions$.pipe(
    ofType(loadSpecialProducts),
    mergeMap(({ params }) => this.productService.loadSpecialProducts(params).pipe(
      map(res => loadSpecialProductsSuccess({ items: res })),
      catchError(res => of(loadSpecialProductsFailure({ msg: res })))
    ))
  ));
}