import { createFeatureSelector, createSelector } from '@ngrx/store';

import { benefitSearchFeatureKey } from '@app/reducers/myoffice/benefit/benefit-details-inquiry.reducer';
import { BenefitAccountingInquiryModel } from '@app/models/myoffice/benefit/benefit-acounting-inquiry.module';
import { benefitAccountingInquirySearchFeatureKey } from '@app/reducers/myoffice/benefit/benefit-accounting-inquiry.reducer';

export interface BenefitAcountingInquirySearchState {
  searchItems: BenefitAccountingInquiryModel[];
  totalItems: Number;
  sumItem: BenefitAccountingInquiryModel;
}

export const getBenefitSearchState = createFeatureSelector<BenefitAcountingInquirySearchState>(benefitAccountingInquirySearchFeatureKey);


export const getBenefitAccountingSearchItems = createSelector(
    getBenefitSearchState,
  (state: BenefitAcountingInquirySearchState) => state.searchItems
);

export const getBenefitAccountingTotalItems = createSelector(
    getBenefitSearchState,
  (state: BenefitAcountingInquirySearchState) => state.totalItems
);

export const getBenefitAccontingSumItem = createSelector(
    getBenefitSearchState,
  (state: BenefitAcountingInquirySearchState) => state.sumItem
);