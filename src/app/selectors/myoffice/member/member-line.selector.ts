import { createFeatureSelector, createSelector} from '@ngrx/store';
import {memberLineFeatureKey} from 'src/app/reducers/myoffice/member/member-line.reducer';
import { Member } from '@models/myoffice/member/member.model'


export interface MemberLineState {
    topLineMembers: Member;
    lineMembers: Member[];
    total: Number;
}

export const getMemberLineState = createFeatureSelector<MemberLineState>(memberLineFeatureKey);

export const findTopLineMember = createSelector(
    getMemberLineState,
    (state: MemberLineState) => state.topLineMembers
);
export const findLine = createSelector(
    getMemberLineState,
    (state: MemberLineState) => state.lineMembers
);
export const countLine = createSelector(
    getMemberLineState,
    (state: MemberLineState) => state.total
);


