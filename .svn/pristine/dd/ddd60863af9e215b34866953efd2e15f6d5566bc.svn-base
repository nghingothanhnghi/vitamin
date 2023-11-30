import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BenefitAnalysisModel } from '@app/models/myoffice/benefit/benefit-analysis.module';
import { benefitAnalysisSearchFeatureKey } from '@app/reducers/myoffice/benefit/benefi-analysis.reducer';

export interface BenefitAnalysisSearchState {
  searchItems: BenefitAnalysisModel[];
  sumItem: BenefitAnalysisModel;
  chart1: BenefitAnalysisModel[];
  chart3: BenefitAnalysisModel[];
}

export const getBenefitAnalysisSearchState = createFeatureSelector<BenefitAnalysisSearchState>(benefitAnalysisSearchFeatureKey);


export const getBenefitAnalysisSearchItems = createSelector(
    getBenefitAnalysisSearchState,
  (state: BenefitAnalysisSearchState) => state.searchItems
);

export const getBenefitAnalysisSumItem = createSelector(
    getBenefitAnalysisSearchState,
  (state: BenefitAnalysisSearchState) => state.sumItem
);

export const getChart1Benefit = createSelector(
    getBenefitAnalysisSearchState,
  (state: BenefitAnalysisSearchState) => state.chart1
);

export const getChart3Benefit = createSelector(
    getBenefitAnalysisSearchState,
  (state: BenefitAnalysisSearchState) => state.chart3
);