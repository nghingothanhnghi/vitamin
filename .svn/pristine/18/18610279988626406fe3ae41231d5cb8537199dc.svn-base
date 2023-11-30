import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';
import { benefitSearchFeatureKey } from '@app/reducers/myoffice/benefit/benefit-details-inquiry.reducer';

export interface BenefitSearchState {
  searchItems: BenefitDetailInquiryModel[];
  titlePay : BenefitDetailInquiryModel[];
  totalItems: Number;
  sumItem: BenefitDetailInquiryModel;
}

export const getBenefitSearchState = createFeatureSelector<BenefitSearchState>(benefitSearchFeatureKey);

export const getTitlePayItems = createSelector(
  getBenefitSearchState,
(state: BenefitSearchState) => state.titlePay
);

export const getBenefitSearchItems = createSelector(
    getBenefitSearchState,
  (state: BenefitSearchState) => state.searchItems
);

export const getBenefitTotalItems = createSelector(
    getBenefitSearchState,
  (state: BenefitSearchState) => state.totalItems
);

export const getBenefitSumItem = createSelector(
    getBenefitSearchState,
  (state: BenefitSearchState) => state.sumItem
);