import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { memberPointFeatureKey } from '@app/reducers/shoppingmall/member-point.reducer';

export interface MemberPointState {
  point: OrderMstModel,
}

export const getMemberPointState = createFeatureSelector<MemberPointState>(memberPointFeatureKey);

export const getMemberPoint = createSelector(
  getMemberPointState,
  (state: MemberPointState) => state.point
);