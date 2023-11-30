import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Member } from '@app/models/myoffice/member/member.model';
import { memberPopupFeatureKey } from '@app/reducers/myoffice/member/member-popup.reducer';

export interface MemberPopupState {
  items: Member[];
  total: Number;
}

export const getMemberPopupState = createFeatureSelector<MemberPopupState>(memberPopupFeatureKey);

export const getMemberPopupItems = createSelector(
  getMemberPopupState,
  (state: MemberPopupState) => state.items
);

export const countMemberPopupItems = createSelector(
  getMemberPopupState,
  (state: MemberPopupState) => state.total
);