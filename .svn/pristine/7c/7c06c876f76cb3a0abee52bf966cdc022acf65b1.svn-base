import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BenefitSponsorshipDetailsModel } from '@app/models/myoffice/benefit/benefit-sponsorship-details.module';
import { benefitSponsorshipDetailsSearchFeatureKey } from '@app/reducers/myoffice/benefit/benefit-sponsorship-details.reducer';

export interface BenefitSponsorshipDetailsSearchState {
  searchItems: BenefitSponsorshipDetailsModel[];
  totalItems: Number;
  sumItem: BenefitSponsorshipDetailsModel;
}

export const getBenefitSponsorshipDetailsSearchState = createFeatureSelector<BenefitSponsorshipDetailsSearchState>(benefitSponsorshipDetailsSearchFeatureKey);


export const getBenefitSponsorshipDetailsSearchItems = createSelector(
  getBenefitSponsorshipDetailsSearchState,
  (state: BenefitSponsorshipDetailsSearchState) => state.searchItems
);

export const getBenefitSponsorshipDetailsTotalItems = createSelector(
  getBenefitSponsorshipDetailsSearchState,
  (state: BenefitSponsorshipDetailsSearchState) => state.totalItems
);

export const getBenefitSponsorshipDetailsSumItem = createSelector(
  getBenefitSponsorshipDetailsSearchState,
  (state: BenefitSponsorshipDetailsSearchState) => state.sumItem
);