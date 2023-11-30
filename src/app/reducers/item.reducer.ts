import { createReducer, on } from "@ngrx/store";

import { itemState } from "@app/selectors/item.selector";
import { checkItem, setItem, setParamItem } from "@app/actions/item.action";

export const itemFeatureKey = 'itemKey';

export const initialState: itemState = {
    item: {} as any,
    itemParam : {} as any,
    checkItem : false as boolean
}

export const itemReduercer = createReducer(
  initialState,

  on(setItem, (state, { item }) =>({
    ...state,
    item: item
  })),

  on(setParamItem, (state, { itemParam }) =>({
    ...state,
    itemParam: itemParam
  })),
  on(checkItem, (state, { checkItem }) =>({
    ...state,
    checkItem: checkItem
  }))
);