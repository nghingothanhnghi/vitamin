import { createReducer, on } from "@ngrx/store";

import { PdtCateModel } from "@app/models/shoppingmall/pdt-cate.model";
import { PdtCateState } from "@app/selectors/shoppingmall/pdt-cate.selector";
import { loadPdtCateSuccess } from "@app/actions/shoppingmall/pdt-cate.action";

export const pdtCateFeatureKey = "pdtCate";

export const initialState: PdtCateState = {
  pdtCates: [] as PdtCateModel[],
}

export const pdtCateReducer = createReducer(
  initialState,
  on(loadPdtCateSuccess, (state, { items }) => ({ ...state, pdtCates: items }))
)