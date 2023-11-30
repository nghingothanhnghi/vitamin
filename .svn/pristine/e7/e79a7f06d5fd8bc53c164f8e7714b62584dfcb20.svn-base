import { createFeatureSelector, createSelector} from '@ngrx/store';
import * as memberSearchReducer from 'src/app/reducers/myoffice/member/member-search.reducer';
import { Member } from '@models/myoffice/member/member.model';

export interface MemberSearchState {
    members: Member[];
    count: Number;
}

export const getMemberSearchState = createFeatureSelector<MemberSearchState>(memberSearchReducer.memberSearchFeatureKey);

export const getMember = createSelector(
    getMemberSearchState,
    (state: MemberSearchState) => state.members
);
export const countMember = createSelector(
    getMemberSearchState,
    (state: MemberSearchState) => state.count
);
