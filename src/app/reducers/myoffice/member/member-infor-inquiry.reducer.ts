import { createReducer, on } from '@ngrx/store';
import { MemInfo } from '@models/myoffice/member/mem-info.model';
import { RankHistory } from '@models/myoffice/member/rank-history.model';
import { AffiliatedMember } from '@models/myoffice/member/affiliated-member.model';
import { OrdMonth } from '@models/myoffice/member/ord-month.model';
import { Member } from '@models/myoffice/member/member.model';
import { MemRank } from '@models/myoffice/member/mem-rank.model';
import { OrdMonthly } from '@models/myoffice/member/ord-monthly.model';
import  * as memberInforInquiryAction from "@app/actions/myoffice/member/member-infor-inquiry.actions"
import * as memberInfoInquirySelector from '@selectors/myoffice/member/member-infor-inquiry.selector'

export const memberInfoInquiryFeatureKey = 'memberInfoInquiry';

export const initialMemberInfoInquiry : memberInfoInquirySelector.MemberInfoInquiryState = {
    memInfo: {} as MemInfo,
    rankHistories: [] as RankHistory[],
    affiliatedMember: {} as AffiliatedMember,
    ordMonth: {} as OrdMonth,
    members: [] as Member[],
    count: {} as Number,
    memRank: {} as MemRank,
    ordMonthlys: [] as OrdMonthly[],
    ordMonthly: {} as OrdMonthly
};


export const memInfoInquiryReducer = createReducer(
    initialMemberInfoInquiry,
    on( memberInforInquiryAction.loadMemInfoSuccess, (state, { memInfo }) => ({
        ...state,
        memInfo,
    })),
    on( memberInforInquiryAction.loadRankHistorySuccess, (state, { rankHistories }) => ({
        ...state,
        rankHistories,
    }))
    , on( memberInforInquiryAction.loadAffiliatedMemberSuccess, (state, { affiliatedMember }) => ({
        ...state,
        affiliatedMember,
    })),
    on( memberInforInquiryAction.loadTreeInfoSuccess, (state, { members }) => ({
        ...state,
        members,
    })),
    on( memberInforInquiryAction.countTreeInfoSuccess, (state, { count }) => ({
        ...state,
        count,
    })),
    on( memberInforInquiryAction.loadMonthlyPositionDetailsSuccess, (state, { memRank }) => ({
        ...state,
        memRank,
    })),
    on( memberInforInquiryAction.clearMemState, () => ({
        ...initialMemberInfoInquiry,
    })),
);