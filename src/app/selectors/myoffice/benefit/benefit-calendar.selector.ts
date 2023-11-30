import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BenefitCalendarModel } from '@app/models/myoffice/benefit/benefit-calendar.module';
import { benefitCalendarFeatureKey } from '@app/reducers/myoffice/benefit/benefit-calendar.reducer';

export interface BenefitCalendarSearchState {
  searchItems: BenefitCalendarModel[];
}

export const getBenefitCalendarSearchState = createFeatureSelector<BenefitCalendarSearchState>(benefitCalendarFeatureKey);


export const getBenefitCalendarSearchItems = createSelector(
    getBenefitCalendarSearchState,
  (state: BenefitCalendarSearchState) => state.searchItems
);
