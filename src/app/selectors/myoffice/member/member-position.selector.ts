import { createFeatureSelector, createSelector} from '@ngrx/store';
import {memberPositionFeatureKey} from 'src/app/reducers/myoffice/member/member-position.reducer';
import { Rank } from '@models/system/rank.model'
import { Member } from '@models/myoffice/member/member.model'
import { AbPosInfo } from '@app/models/myoffice/member/abpos-info.model';


export interface MemberPositionState {
    ranks: Rank[];
    members: Member[];
    total: Number;
    abPosinfo: AbPosInfo;
    binaryLegsA: Member[];
    totalLegA: Number;
    binaryLegsB: Member[];
    totalLegB: Number;
}

export const getMemberPositionState = createFeatureSelector<MemberPositionState>(memberPositionFeatureKey);

export const getRankMember = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.ranks
);

export const getMemberRId = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.members
);

export const countMemberRId = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.total
);
export const abPosinfo = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.abPosinfo
);
export const binaryLegSearchA = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.binaryLegsA
);
export const binaryLegCountA = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.totalLegA
);
export const binaryLegSearchB = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.binaryLegsB
);
export const binaryLegCountB = createSelector(
    getMemberPositionState,
    (state: MemberPositionState) => state.totalLegB
);

