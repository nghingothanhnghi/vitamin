import { createReducer, on } from '@ngrx/store';

import { BenefitAcountingInquirySearchState } from '@app/selectors/myoffice/benefit/benefit-accounting-inquiry.selector';
import { countBenefitAccountingInquirySuccess, searchBenefitAccountingInquirySuccess, sumBenefitAccountingInquirySuccess } from '@app/actions/myoffice/benefit/benefit-accounting-inquiry.action';
import { BenefitAccountingInquiryModel } from '@app/models/myoffice/benefit/benefit-acounting-inquiry.module';

export const benefitAccountingInquirySearchFeatureKey = 'benefitAccountingInquirySearch';

export const initialState: BenefitAcountingInquirySearchState = {
  searchItems: [] as BenefitAccountingInquiryModel[],
  totalItems: 0,
  sumItem: {} as BenefitAccountingInquiryModel,
}

export const benefitAcountingInquirySearchReducer = createReducer(
  initialState,
  on(searchBenefitAccountingInquirySuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
  on(countBenefitAccountingInquirySuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumBenefitAccountingInquirySuccess, (state, { benefit }) => ({...state, sumItem: benefit}))
);