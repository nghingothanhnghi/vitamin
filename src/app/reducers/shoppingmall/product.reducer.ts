import { createReducer, on } from "@ngrx/store";

import { OrdPdtModel } from "@app/models/shoppingmall/order-pdt.model";
import { ProductState } from "@app/selectors/shoppingmall/product.selector";
import {
  loadMainProductsSuccess,
  loadProductsSuccess,
  loadSpecialProductsSuccess,
  loadTotalProductSuccess,
  setCateCd,
  setKeySearch,
  setPdtCate
} from "@app/actions/shoppingmall/product.action";

export const productFeatureKey = "product";

export const initialState: ProductState = {
  total: 0,
  products: [] as OrdPdtModel[],
  mainProducts: [] as OrdPdtModel[],
  specialProducts: [] as OrdPdtModel[],
  cateCd: "",
  key: "",
  pdtCate: "",
}

export const productReducer = createReducer(
  initialState,
  on(loadTotalProductSuccess, (state, { total }) => ({ ...state, total: total })),
  on(loadProductsSuccess, (state, { items }) => ({ ...state, products: items })),
  on(loadMainProductsSuccess, (state, { items }) => ({ ...state, mainProducts: items })),
  on(loadSpecialProductsSuccess, (state, { items }) => ({ ...state, specialProducts: items })),
  on(setCateCd, (state, { cateCd }) => ({ ...state, cateCd: cateCd })),
  on(setKeySearch, (state, { key }) => ({ ...state, key: key })),
  on(setPdtCate, (state, { cate }) => ({ ...state, pdtCate: cate }))
);