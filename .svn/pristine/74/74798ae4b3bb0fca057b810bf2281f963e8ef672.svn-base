import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WitholdingTaxModel } from '@app/models/myoffice/benefit/witholding-tax.module';
import { witholdingTaxSearchFeatureKey } from '@app/reducers/myoffice/benefit/witholding-tax.reducer';

export interface WitholdingTaxSearchState {
  searchItems: WitholdingTaxModel[];
  totalItems: Number;
  sumItem: WitholdingTaxModel;

  searchReportItems : WitholdingTaxModel[];
  sumReportItems : WitholdingTaxModel;
  userReportItems : WitholdingTaxModel;
}

export const getWitholdingTaxSearchState = createFeatureSelector<WitholdingTaxSearchState>(witholdingTaxSearchFeatureKey);


export const getWitholdingTaxSearchItems = createSelector(
    getWitholdingTaxSearchState,
  (state: WitholdingTaxSearchState) => state.searchItems
);

export const getWitholdingTaxTotalItems = createSelector(
    getWitholdingTaxSearchState,
  (state: WitholdingTaxSearchState) => state.totalItems
);

export const getWitholdingTaxSumItem = createSelector(
    getWitholdingTaxSearchState,
  (state: WitholdingTaxSearchState) => state.sumItem
);
// Start Report
export const detailWitholdingTaxItems = createSelector(
  getWitholdingTaxSearchState,
(state: WitholdingTaxSearchState) => state.searchReportItems
);

export const sumDetailWitholdingTaxItems = createSelector(
  getWitholdingTaxSearchState,
(state: WitholdingTaxSearchState) => state.sumReportItems
);

export const userWitholdingTaxItems = createSelector(
  getWitholdingTaxSearchState,
(state: WitholdingTaxSearchState) => state.userReportItems
);