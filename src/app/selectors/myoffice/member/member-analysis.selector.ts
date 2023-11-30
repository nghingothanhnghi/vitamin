import { createFeatureSelector, createSelector} from '@ngrx/store';
import {memberAnalysisFeatureKey} from 'src/app/reducers/myoffice/member/member-analysis.reducer';
import { AnalysisMember } from '@models/myoffice/member/analysis-member.model'
import { AnalysisMemberMonth } from '@models/myoffice/member/analysis-member-month.model'
import { AnalysisAge } from '@models/myoffice/member/analysis-age.model'



export interface MemberAnalysisState {
    analysisMembers: AnalysisMember[];
    analysisMemberMonths: AnalysisMemberMonth[];
    analysisAges: AnalysisAge[];
    memberRanks: AnalysisMember[]
}

export const getMemberAnalysisState = createFeatureSelector<MemberAnalysisState>(memberAnalysisFeatureKey);

export const chartMemberGender = createSelector(
    getMemberAnalysisState,
    (state: MemberAnalysisState) => state.analysisMembers
);
export const chartMemberMonth = createSelector(
    getMemberAnalysisState,
    (state: MemberAnalysisState) => state.analysisMemberMonths
);
export const chartMemberAge = createSelector(
    getMemberAnalysisState,
    (state: MemberAnalysisState) => state.analysisAges
);
export const chartMemberRank = createSelector(
    getMemberAnalysisState,
    (state: MemberAnalysisState) => state.memberRanks
);


