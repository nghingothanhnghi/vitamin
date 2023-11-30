import { createFeatureSelector, createSelector} from '@ngrx/store';
import {memberBoxFeatureKey} from 'src/app/reducers/myoffice/member/member-box.reducer';
import { Member } from '@models/myoffice/member/member.model'


export interface MemberBoxState {
    members: Member[]
    memberImage: Member
}

export const getMemberBoxState = createFeatureSelector<MemberBoxState>(memberBoxFeatureKey);

export const findBox = createSelector(
    getMemberBoxState,
    (state: MemberBoxState) => state.members
);

export const getInfoMemImageItem = createSelector(
    getMemberBoxState,
    (state: MemberBoxState) => state.memberImage
);

export const clearBox = createSelector(
    getMemberBoxState,
    (state: MemberBoxState) => state
);
