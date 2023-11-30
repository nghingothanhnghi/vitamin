import { createReducer, on } from "@ngrx/store";

import { MemberPointState } from "@app/selectors/shoppingmall/member-point.selector";
import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";
import { loadMemberPointSuccess } from "@app/actions/shoppingmall/member-point.action";

export const memberPointFeatureKey = "memberPoint";

export const initialState: MemberPointState = {
  point: {} as OrderMstModel,
}

export const memberPointReducer = createReducer(
  initialState,
  on(loadMemberPointSuccess, (state, { orderMst }) => ({ ...state, point: orderMst }))
);