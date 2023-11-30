import { createReducer, on } from '@ngrx/store';

import { BenefitSponsorshipDetailsModel } from '@app/models/myoffice/benefit/benefit-sponsorship-details.module';
import { countBenefitSponsorshipDetailsSuccess, searchBenefitSponsorshipDetailsSuccess, sumBenefitSponsorshipDetailsSuccess } from '@app/actions/myoffice/benefit/benefit-sponsorship-details.action';
import { BenefitSponsorshipDetailsSearchState } from '@app/selectors/myoffice/benefit/benefit-sponsorship-details.selector';

export const benefitSponsorshipDetailsSearchFeatureKey = 'benefitSponsorshipDetailsSearch';

export const initialState: BenefitSponsorshipDetailsSearchState = {
  searchItems: [] as BenefitSponsorshipDetailsModel[],
  totalItems: 0,
  sumItem: {} as BenefitSponsorshipDetailsModel,
}

export const benefitSponsorshipDetailsSearchReducer = createReducer(
  initialState,
  on(searchBenefitSponsorshipDetailsSuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
  on(countBenefitSponsorshipDetailsSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumBenefitSponsorshipDetailsSuccess, (state, { benefit }) => ({...state, sumItem: benefit}))
);