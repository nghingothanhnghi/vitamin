import { createReducer, on } from '@ngrx/store';
import { Member } from '@models/myoffice/member/member.model';
import  * as memberSearchAction from "@app/actions/myoffice/member/member-search.action"
import * as memberSearchSelector from '@selectors/myoffice/member/member-search.selector'

export const memberSearchFeatureKey = 'memberSearch';

export const initialmemberSearch : memberSearchSelector.MemberSearchState = {
    members: [] as Member[],
    count: {} as Number,
};


export const memSearchReducer = createReducer(
    initialmemberSearch,
    on( memberSearchAction.searchMemberSuccess, (state, { members }) => ({
        ...state,
        members,
    })),
    on( memberSearchAction.countMemberSuccess, (state, { count }) => ({
        ...state,
        count,
    })),
);