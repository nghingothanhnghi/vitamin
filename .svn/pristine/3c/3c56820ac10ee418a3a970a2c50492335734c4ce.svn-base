import { createReducer, on } from '@ngrx/store';

import { BenefitSearchState } from '@app/selectors/myoffice/benefit/benefit-details-inquiry.selector';
import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';
import { countBenefitSuccess, loadTitlePaySuccess, searchBenefitSuccess, sumBenefitSuccess } from '@app/actions/myoffice/benefit/benefit-details-inquiry.action';

export const benefitSearchFeatureKey = 'benefitSearch';

export const initialState: BenefitSearchState = {
  searchItems: [] as BenefitDetailInquiryModel[],
  titlePay: [] as BenefitDetailInquiryModel[],
  totalItems: 0,
  sumItem: {} as BenefitDetailInquiryModel,
}

export const benefitSearchReducer = createReducer(
  initialState,
  on(loadTitlePaySuccess, (state, { benefit }) => ({ ...state, titlePay: benefit })),
  on(searchBenefitSuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
  on(countBenefitSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumBenefitSuccess, (state, { benefit }) => ({...state, sumItem: benefit}))
);