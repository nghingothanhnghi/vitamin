import { createReducer, on } from '@ngrx/store';
import { Member } from '@models/myoffice/member/member.model'

import  * as memberLineAction from "@app/actions/myoffice/member/member-line.action"
import * as memberLineSelector from '@selectors/myoffice/member/member-line.selector'

export const memberLineFeatureKey = 'memberLine';

export const initialMemberLine : memberLineSelector.MemberLineState = {
    topLineMembers: {} as Member,
    lineMembers: [] as Member[],
    total: {} as Number,
};


export const memLineReducer = createReducer(
    initialMemberLine,
    on( memberLineAction.findTopLineMemberSuccess, (state, { topLineMembers }) => ({
        ...state,
        topLineMembers,
    })),
    on( memberLineAction.findLineSuccess, (state, { lineMembers }) => ({
        ...state,
        lineMembers,
    })),
    on( memberLineAction.countLineSuccess, (state, { total }) => ({
        ...state,
        total,
    })),
);