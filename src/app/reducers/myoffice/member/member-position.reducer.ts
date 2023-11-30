import { createReducer, on } from '@ngrx/store';
import { Rank } from '@models/system/rank.model'
import { Member } from '@models/myoffice/member/member.model'

import  * as memberPositionAction from "@app/actions/myoffice/member/member-inquiry-position.action"
import * as memberPositionSelector from '@selectors/myoffice/member/member-position.selector'
import { AbPosInfo } from '@app/models/myoffice/member/abpos-info.model';

export const memberPositionFeatureKey = 'memberPosition';

export const initialMemberPosition : memberPositionSelector.MemberPositionState = {
    ranks: [] as Rank[],
    members: [] as Member[],
    total: {} as Number,
    abPosinfo: {} as AbPosInfo,
    binaryLegsA:  [] as Member[],
    totalLegA: {} as Number,
    binaryLegsB:  [] as Member[],
    totalLegB: {} as Number
};


export const memPositionReducer = createReducer(
    initialMemberPosition,
    on( memberPositionAction.getRankMemberSuccess, (state, { ranks }) => ({
        ...state,
        ranks,
    })),
    on( memberPositionAction.getMemberRIdSuccess, (state, { members }) => ({
        ...state,
        members,
    })),
    on( memberPositionAction.countMemberRIdSuccess, (state, { total }) => ({
        ...state,
        total,
    })),
    on( memberPositionAction.loadAbPosInfoSuccess, (state, { abPosinfo }) => ({
        ...state,
        abPosinfo,
    })),
    on( memberPositionAction.binaryLegsInfoASuccess, (state, { binaryLegsA }) => ({
        ...state,
        binaryLegsA,
    })),
    on( memberPositionAction.binaryLegCountASuccess, (state, { totalLegA }) => ({
        ...state,
        totalLegA,
    })),
    on( memberPositionAction.binaryLegsInfoBSuccess, (state, { binaryLegsB }) => ({
        ...state,
        binaryLegsB,
    })),
    on( memberPositionAction.binaryLegCountBSuccess, (state, { totalLegB }) => ({
        ...state,
        totalLegB,
    })),
);