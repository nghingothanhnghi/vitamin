import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BenefitRemittanceDetailsModel } from '@app/models/myoffice/benefit/benefit-remittance-details.module';
import { benefitRemittanceDetailsSearchFeatureKey } from '@app/reducers/myoffice/benefit/benefit-remittance-details.reducer';

export interface BenefitRemittanceDetailsSearchState {
  searchItems: BenefitRemittanceDetailsModel[];
  totalItems: Number;
  sumItem: BenefitRemittanceDetailsModel;
}

export const getBenefitRemittanceDetailsSearchState = createFeatureSelector<BenefitRemittanceDetailsSearchState>(benefitRemittanceDetailsSearchFeatureKey);


export const getBenefitRemittanceDetailsSearchItems = createSelector(
    getBenefitRemittanceDetailsSearchState,
  (state: BenefitRemittanceDetailsSearchState) => state.searchItems
);

export const getBenefitRemittanceDetailsTotalItems = createSelector(
    getBenefitRemittanceDetailsSearchState,
  (state: BenefitRemittanceDetailsSearchState) => state.totalItems
);

export const getBenefitRemittanceDetailsSumItem = createSelector(
    getBenefitRemittanceDetailsSearchState,
  (state: BenefitRemittanceDetailsSearchState) => state.sumItem
);