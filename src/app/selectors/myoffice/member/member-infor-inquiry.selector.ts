import { createFeatureSelector, createSelector} from '@ngrx/store';
import * as memberInfoInquiryReducer from 'src/app/reducers/myoffice/member/member-infor-inquiry.reducer';
import { MemInfo } from '@models/myoffice/member/mem-info.model';
import { RankHistory } from '@models/myoffice/member/rank-history.model';
import { AffiliatedMember } from '@models/myoffice/member/affiliated-member.model';
import { OrdMonth } from '@models/myoffice/member/ord-month.model';
import { Member } from '@models/myoffice/member/member.model';
import { MemRank } from '@models/myoffice/member/mem-rank.model';
import { OrdMonthly } from '@models/myoffice/member/ord-monthly.model';

export interface MemberInfoInquiryState {
    memInfo: MemInfo;
    rankHistories: RankHistory[];
    affiliatedMember: AffiliatedMember;
    ordMonth: OrdMonth;
    members: Member[];
    count: Number;
    memRank: MemRank;
    ordMonthlys: OrdMonthly[];
    ordMonthly: OrdMonthly;
}

export const getMemInfoInquiryState = createFeatureSelector<MemberInfoInquiryState>(memberInfoInquiryReducer.memberInfoInquiryFeatureKey);

export const getMemInfo = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.memInfo
);

export const getRankHistories = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.rankHistories
);
export const getAffiliatedMember = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.affiliatedMember
);
export const getOrdMonth = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.ordMonth
);
export const getTreeInfo = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.members
);
export const countTreeInfo = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.count
);
export const getMonthlyPositionDetails = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.memRank
);
export const getOrdMonthByMembers = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.ordMonthlys
);
export const sumOrdMonthByMembers = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state.ordMonthly
);
export const clearMemState = createSelector(
    getMemInfoInquiryState,
    (state: MemberInfoInquiryState) => state
);