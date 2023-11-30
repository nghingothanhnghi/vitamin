import { createReducer, on } from '@ngrx/store';
import { AnalysisMember } from '@models/myoffice/member/analysis-member.model'
import { AnalysisMemberMonth } from '@models/myoffice/member/analysis-member-month.model'
import { AnalysisAge } from '@models/myoffice/member/analysis-age.model'


import  * as memberAnalysisAction from "@app/actions/myoffice/member/affiliate-member-analysis.action"
import * as memberAnalysisSelector from '@selectors/myoffice/member/member-analysis.selector'

export const memberAnalysisFeatureKey = 'memberAnalysis';

export const initialMemberAnalysis : memberAnalysisSelector.MemberAnalysisState = {
    analysisMembers: [] as AnalysisMember[],
    analysisMemberMonths: [] as AnalysisMemberMonth[],
    analysisAges: [] as AnalysisAge[],
    memberRanks: [] as AnalysisMember[]
};


export const memAnalysisReducer = createReducer(
    initialMemberAnalysis,
    on( memberAnalysisAction.chartMemberGenderSuccess, (state, { analysisMembers }) => ({
        ...state,
        analysisMembers,
    })),
    on( memberAnalysisAction.chartMemberMonthSuccess, (state, { analysisMemberMonths }) => ({
        ...state,
        analysisMemberMonths,
    })),
    on( memberAnalysisAction.chartMemberAgeSuccess, (state, { analysisAges }) => ({
        ...state,
        analysisAges,
    })),
    on( memberAnalysisAction.chartMemberRankSuccess, (state, { memberRanks }) => ({
        ...state,
        memberRanks,
    })),
);