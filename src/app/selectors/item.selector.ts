import { createFeatureSelector, createSelector } from '@ngrx/store';
import { itemFeatureKey } from '@app/reducers/item.reducer';

export interface itemState {
  item: any;
  itemParam: any;
  checkItem : boolean
}

export const getItemState = createFeatureSelector<itemState>(itemFeatureKey);

export const getItemS = createSelector(
    getItemState,
(state: itemState) => state.item
)

export const getItemParam = createSelector(
  getItemState,
(state: itemState) => state.itemParam
)

export const checkItem$ = createSelector(
  getItemState,
(state: itemState) => state.checkItem
)