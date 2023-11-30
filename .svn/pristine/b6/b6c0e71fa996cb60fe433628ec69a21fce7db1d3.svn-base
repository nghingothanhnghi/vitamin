import { createReducer, on } from '@ngrx/store';

import { BenefitAnalysisSearchState } from '@app/selectors/myoffice/benefit/benefit-analysis.selector';
import { BenefitAnalysisModel } from '@app/models/myoffice/benefit/benefit-analysis.module';
import { getChart1Success, getChart3Success, searchBenefitAnalysisSuccess, sumBenefitAnalysisSuccess } from '@app/actions/myoffice/benefit/benefit-analysis.action';

export const benefitAnalysisSearchFeatureKey = 'benefitAnalysisSearch';

export const initialState: BenefitAnalysisSearchState = {
    searchItems: [] as BenefitAnalysisModel[],
    sumItem: {} as BenefitAnalysisModel,
    chart1: [] as BenefitAnalysisModel[],
    chart3: [] as BenefitAnalysisModel[],
}

export const benefitAnalysisSearchReducer = createReducer(
  initialState,
  on(searchBenefitAnalysisSuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
  on(sumBenefitAnalysisSuccess, (state, { benefit }) => ({...state, sumItem: benefit})),
  on(getChart1Success, (state, { benefit }) => ({ ...state, chart1: benefit })),
  on(getChart3Success, (state, { benefit }) => ({ ...state, chart3: benefit })),
);