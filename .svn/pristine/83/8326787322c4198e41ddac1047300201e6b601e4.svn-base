import { createReducer, on } from "@ngrx/store";

import { Member } from "@app/models/myoffice/member/member.model";
import { MemberPopupState } from "@app/selectors/myoffice/member/member-popup.selector";
import { countMemberPopupSuccess, searchMemberPopupSuccess } from "@app/actions/myoffice/member/member-popup.action";

export const memberPopupFeatureKey = 'memberPopup';

export const initialState: MemberPopupState = {
  items: [] as Member[],
  total: 0,
}

export const memberPopupReducer = createReducer(
  initialState,
  on(searchMemberPopupSuccess, (state, { memberItems }) => ({...state, items: memberItems})),
  on(countMemberPopupSuccess, (state, { total }) => ({...state, total: total})),
);