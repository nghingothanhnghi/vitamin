import {createAction, props} from '@ngrx/store';
import { AnalysisMember } from '@models/myoffice/member/analysis-member.model'
import { AnalysisMemberMonth } from '@models/myoffice/member/analysis-member-month.model'
import { AnalysisAge } from '@models/myoffice/member/analysis-age.model'




/* chartMemberGender */
export const chartMemberGender = createAction(
    '[ChartMemberGender API] Load ChartMemberGender',
    (userId: string) => ({ userId })
);

export const chartMemberGenderSuccess = createAction(
    '[ChartMemberGender API] Load ChartMemberGender Success',
    props<{ analysisMembers: AnalysisMember[] }>()
);

export const chartMemberGenderFailure = createAction(
    '[ChartMemberGender API] Load ChartMemberGender Failure',
    props<{ msg: any }>()
);



/* chartMemberMonth */
export const chartMemberMonth = createAction(
    '[ChartMemberMonth API] Load ChartMemberMonth',
    (userId: string) => ({ userId })
);

export const chartMemberMonthSuccess = createAction(
    '[ChartMemberMonth API] Load ChartMemberMonth Success',
    props<{ analysisMemberMonths: AnalysisMemberMonth[] }>()
);

export const chartMemberMonthFailure = createAction(
    '[ChartMemberMonth API] Load ChartMemberMonth Failure',
    props<{ msg: any }>()
);

/* chartMemberAge */
export const chartMemberAge = createAction(
    '[ChartMemberAge API] Load ChartMemberAge',
    (userId: string) => ({ userId })
);

export const chartMemberAgeSuccess = createAction(
    '[ChartMemberAge API] Load ChartMemberAge Success',
    props<{ analysisAges: AnalysisAge[] }>()
);

export const chartMemberAgeFailure = createAction(
    '[ChartMemberAge API] Load ChartMemberAge Failure',
    props<{ msg: any }>()
);

/* chartMemberRank */
export const chartMemberRank = createAction(
    '[ChartMemberRank API] Load ChartMemberRank',
    (userId: string) => ({ userId })
);

export const chartMemberRankSuccess = createAction(
    '[ChartMemberRank API] Load ChartMemberRank Success',
    props<{ memberRanks: AnalysisMember[] }>()
);

export const chartMemberRankFailure = createAction(
    '[ChartMemberRank API] Load ChartMemberRank Failure',
    props<{ msg: any }>()
);

