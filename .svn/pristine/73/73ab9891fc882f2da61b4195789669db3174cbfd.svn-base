import { createAction, props } from '@ngrx/store';

import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';

// count product
export const loadTotalProduct = createAction(
  "[Product API] load total product",
  props<{ params: any }>()
);

export const loadTotalProductSuccess = createAction(
  "[Product API] load total product success",
  props<{ total: number }>()
);

export const loadTotalProductFailure = createAction(
  "[Product API] load total product failure",
  props<{ msg: any }>()
);

// load product
export const loadProducts = createAction(
  "[Product API] load products",
  props<{ params: any }>()
);

export const loadProductsSuccess = createAction(
  "[Product API] load products success",
  props<{ items: OrdPdtModel[] }>()
);

export const loadProductsFailure = createAction(
  "[Product API] load products failure",
  props<{ msg: any }>()
);

// load main product
export const loadMainProducts = createAction(
  "[Product API] load main products",
  props<{ params: any }>()
);

export const loadMainProductsSuccess = createAction(
  "[Product API] load main products success",
  props<{ items: OrdPdtModel[] }>()
);

export const loadMainProductsFailure = createAction(
  "[Product API] load main products failure",
  props<{ msg: any }>()
);

// load special product
export const loadSpecialProducts = createAction(
  "[Product API] load special products",
  props<{ params: any }>()
);

export const loadSpecialProductsSuccess = createAction(
  "[Product API] load special products success",
  props<{ items: OrdPdtModel[] }>()
);

export const loadSpecialProductsFailure = createAction(
  "[Product API] load special products failure",
  props<{ msg: any }>()
);

// set cate cd
export const setCateCd = createAction(
  "[Product List] set cate cd",
  props<{ cateCd: string }>()
)

export const setKeySearch = createAction(
  "[Product List] set key search",
  props<{ key: string }>()
);

export const setPdtCate = createAction(
  "[Product List] set pdt cate",
  props<{ cate: string }>()
);