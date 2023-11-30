import { createReducer, on } from '@ngrx/store';

import { BenefitCalendarSearchState } from '@app/selectors/myoffice/benefit/benefit-calendar.selector';
import { BenefitCalendarModel } from '@app/models/myoffice/benefit/benefit-calendar.module';
import { searchBenefitCalendarSuccess } from '@app/actions/myoffice/benefit/benefit-calendar.action';

export const benefitCalendarFeatureKey = 'benefitCalendarSearch';

export const initialState: BenefitCalendarSearchState = {
  searchItems: [] as BenefitCalendarModel[],

}

export const benefitCalendarSearchReducer = createReducer(
  initialState,
  on(searchBenefitCalendarSuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
);