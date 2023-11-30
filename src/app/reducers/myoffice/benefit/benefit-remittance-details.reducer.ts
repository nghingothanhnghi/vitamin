import { createReducer, on } from '@ngrx/store';

import { BenefitRemittanceDetailsSearchState } from '@app/selectors/myoffice/benefit/benefit-remittance-details.selector';
import { BenefitRemittanceDetailsModel } from '@app/models/myoffice/benefit/benefit-remittance-details.module';
import { countBenefitRemittanceDetailsSuccess, searchBenefitRemittanceDetailsSuccess, sumBenefitRemittanceDetailsSuccess } from '@app/actions/myoffice/benefit/benefit-remittance-details.action';

export const benefitRemittanceDetailsSearchFeatureKey = 'benefitRemittanceDetailsSearch';

export const initialState: BenefitRemittanceDetailsSearchState = {
  searchItems: [] as BenefitRemittanceDetailsModel[],
  totalItems: 0,
  sumItem: {} as BenefitRemittanceDetailsModel,
}

export const benefitRemittanceDetailsSearchReducer = createReducer(
  initialState,
  on(searchBenefitRemittanceDetailsSuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
  on(countBenefitRemittanceDetailsSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumBenefitRemittanceDetailsSuccess, (state, { benefit }) => ({...state, sumItem: benefit}))
);